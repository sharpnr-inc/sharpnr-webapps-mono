import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Outlet } from '@tanstack/react-router';
import Header from '@/components/shared/Header';
import SidebarMain from '@/components/Sidebar/Sidebar';

export const Route = createFileRoute("/dashboard/_layout")({
  component: () => {
    // Sidebar closed by default on mobile, open on desktop
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
      <div className="flex flex-col h-screen overflow-hidden">
        {/* HEADER */}
        <Header onToggleSidebar={toggleSidebar} />
        
        {/* FLEX BODY: Sidebar + Outlet */}
        <div className="flex flex-1 overflow-hidden">
          {/* SIDEBAR - Responsive with overlay on mobile */}
          {sidebarOpen && (
            <>
              {/* Overlay for mobile */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                onClick={toggleSidebar}
              />
              
              {/* Sidebar */}
              <div className="fixed lg:relative w-64 lg:w-72 h-full z-30 lg:z-auto">
                <SidebarMain />
              </div>
            </>
          )}
          
          {/* OUTLET / MAIN CONTENT */}
          <div className="flex-1 overflow-auto mt-[4rem]">
            <Outlet />
          </div>
        </div>
      </div>
    );
  },
});