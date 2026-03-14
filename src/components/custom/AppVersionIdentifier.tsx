interface AppVersionIdentifierProps {
  children?: React.ReactNode;
}

export function AppVersionIdentifier({ children }: AppVersionIdentifierProps) {
  return (
    <>
      {children}

      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 text-[12px] text-muted-foreground/70 pointer-events-none select-none">
        Website under development • Might break • Demo purpose only •
        preview-0.0.1 • © sharpnr LLP
      </div>
    </>
  );
}
