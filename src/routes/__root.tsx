import { ChatProvider } from "@/hooks/useChatStore";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Root() {
  return (
    <ChatProvider>
      <style>{`
        :root {
          --cables-bg: #0c0e14;
          --cables-sidebar: #0f1117;
          --cables-surface: #161a23;
          --cables-border: #1e2330;
          --cables-accent: #4f8ef7;
          color-scheme: dark;
        }
        * { box-sizing: border-box; }
        body {
          background: var(--cables-bg);
          font-family: 'Geist', 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 999px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #52525b; }
      `}</style>
      <Outlet />
    </ChatProvider>
  );
}
