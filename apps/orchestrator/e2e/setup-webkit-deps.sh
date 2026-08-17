#!/usr/bin/env bash
#
# Vendor the system libraries Playwright's WebKit build needs on Arch Linux.
#
# WHY THIS EXISTS
# ---------------
# Playwright ships a WebKit build (an Ubuntu binary) linked against specific
# shared-library sonames that Arch's rolling repos no longer provide:
#
#     libicu*.so.74      Arch ships icu 78  -> ABI-versioned symbols (_74) differ
#     libxml2.so.2       Arch ships .so.16
#     libjxl.so.0.8      Arch ships 0.11
#     libflite*.so.1     not installed (and Arch's flite lacks several voices)
#     libbacktrace.so.0  not installed
#
# `playwright install-deps` only supports Debian/Ubuntu, and `pacman -S` can
# only give the *current* versions, so neither fixes the mismatch. Instead we
# fetch the exact ABI-correct libraries, cache them in a project-local
# directory, and drop them into each WebKit bundle's `sys/lib` folder.
#
# Why sys/lib and not LD_LIBRARY_PATH from playwright.config.ts: the headless
# (WPE) and headed (GTK) MiniBrowser launchers are wrapper scripts that *hard
# overwrite* LD_LIBRARY_PATH to "<bundle>/lib:<bundle>/sys/lib" before exec'ing
# the real binary, so any LD_LIBRARY_PATH we export is discarded. sys/lib is
# exactly where the bundle already keeps its vendored system libs (libjxl,
# libbacktrace, ...), so that is where the rest belong too.
#
# NOTE: a `playwright install webkit` re-download wipes the bundle; just re-run
# this script afterwards (it is idempotent).
#
# Sources:
#   - Arch Linux Archive: icu 74 (webkit) + icu 76 (needed by the vendored
#     libxml2), libxml2 2.13 (still soname .so.2), libjxl 0.8, libbacktrace.
#   - Ubuntu libflite1 .deb: Arch's flite omits the cmu_us_awb/kal/rms,
#     time_awb and grapheme voices that webkit links, so take the full set
#     from the distro Playwright actually builds against.
#
# Re-running is cheap and idempotent. Safe: nothing is installed system-wide.

set -euo pipefail

DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.webkit-libs/lib"
ARCHIVE="https://archive.archlinux.org/packages"
UBUNTU="http://archive.ubuntu.com/ubuntu/pool"

ARCH_PACKAGES=(
  "i/icu/icu-74.2-2-x86_64.pkg.tar.zst"
  "i/icu/icu-76.1-1-x86_64.pkg.tar.zst"
  "l/libxml2/libxml2-2.13.8-1-x86_64.pkg.tar.zst"
  "l/libjxl/libjxl-0.8.2-2-x86_64.pkg.tar.zst"
  "l/libbacktrace/libbacktrace-1.0.git1-1-x86_64.pkg.tar.zst"
)
UBUNTU_DEBS=(
  "universe/f/flite/libflite1_2.2-3_amd64.deb"
)

mkdir -p "$DEST"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

vendor_libs() {
  # Copy every *.so* found under $1 (one level deep) into the flat vendor dir.
  find "$1" -maxdepth 1 -name '*.so*' -exec cp -P {} "$DEST/" \;
}

for pkg in "${ARCH_PACKAGES[@]}"; do
  file="$(basename "$pkg")"
  echo "→ $file"
  curl -fsSL "$ARCHIVE/$pkg" -o "$tmp/$file"
  bsdtar -xf "$tmp/$file" -C "$tmp" usr/lib
  vendor_libs "$tmp/usr/lib"
  rm -rf "$tmp/usr"
done

for deb in "${UBUNTU_DEBS[@]}"; do
  file="$(basename "$deb")"
  echo "→ $file"
  curl -fsSL "$UBUNTU/$deb" -o "$tmp/$file"
  # .deb is an ar archive; pull the inner data tarball, then its libs.
  bsdtar -xOf "$tmp/$file" 'data.tar.*' | bsdtar -xf - -C "$tmp"
  vendor_libs "$tmp/usr/lib/x86_64-linux-gnu"
  rm -rf "$tmp/usr"
done

count=$(find "$DEST" -name '*.so*' | wc -l)
echo
echo "Vendored $count shared objects into $DEST"

# Install them into every WebKit bundle's sys/lib (headless WPE + headed GTK).
shopt -s nullglob
bundles=("$HOME/.cache/ms-playwright"/webkit-*)
if [ ${#bundles[@]} -eq 0 ]; then
  echo "WARNING: no WebKit bundle found under ~/.cache/ms-playwright."
  echo "         Run 'npx playwright install webkit' first, then re-run this script."
  exit 0
fi

for bundle in "${bundles[@]}"; do
  for variant in minibrowser-wpe minibrowser-gtk; do
    target="$bundle/$variant/sys/lib"
    [ -d "$target" ] || continue
    cp -P "$DEST"/*.so* "$target/"
    echo "  installed into $target"
  done
done

echo "Done. WebKit is ready to run."
