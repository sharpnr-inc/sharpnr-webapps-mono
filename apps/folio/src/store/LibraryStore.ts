import { create } from "zustand";
import { files as seedFiles, type FileKind, type FolioFile } from "@/folio/data/library";

/**
 * The library as the session sees it: the seeded files plus anything created
 * during this session, and which of them are starred.
 *
 * Creating a file adds it to the front of the list rather than opening an
 * editor, so "New document" still visibly does something while the editors are
 * unbuilt. Session-only until the content API exists.
 */

interface LibraryState {
  files: FolioFile[];
  starredIds: string[];

  toggleStar: (fileId: string) => void;
  createFile: (kind: FileKind, name: string, workspace: string, author: string) => FolioFile;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  files: seedFiles,
  starredIds: ["f_002", "f_003", "f_005"],

  toggleStar: (fileId) =>
    set((state) => ({
      starredIds: state.starredIds.includes(fileId)
        ? state.starredIds.filter((id) => id !== fileId)
        : [...state.starredIds, fileId],
    })),

  createFile: (kind, name, workspace, author) => {
    const initials = author
      .split(" ")
      .map((part) => part[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const file: FolioFile = {
      id: `f_new_${get().files.length + 1}`,
      name,
      kind,
      workspace,
      owner: author,
      editedBy: author,
      editedAt: new Date().toISOString().slice(0, 10),
      edited: "Just now",
      size: "0 KB",
      shared: false,
      collaborators: [initials || "ME"],
      comments: 0,
    };

    set((state) => ({ files: [file, ...state.files] }));
    return file;
  },
}));
