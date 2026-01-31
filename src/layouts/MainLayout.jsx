import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/AppSidebar";
import { TopbarProvider } from "../providers/TopbarContext";
import { Suspense, useState } from "react";
import ChatSidebar from "../components/common/ChatSidebar";
import NotificationSidebar from "../components/common/NotificationSidebar"; // New component
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ContentGridSkeleton from "@/components/common/ContentGridSkeleton";
import Topbar from "@/components/common/Topbar";

export default function MainLayout() {
  const [activePanel, setActivePanel] = useState(null); // 'chat' | 'notifications' | null

  const closePanel = () => setActivePanel(null);
  const togglePanel = (panel) => setActivePanel(activePanel === panel ? null : panel);

  return (
    <SidebarProvider>
      <TopbarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-background">
          <AppSidebar />

          <div className="flex flex-1 flex-col min-w-0">
            <Topbar
              activePanel={activePanel} 
              onToggleChat={() => togglePanel('chat')} 
              onToggleNotifications={() => togglePanel('notifications')} 
            />

            <div className="flex flex-1 overflow-hidden relative">
              <main className="flex-1 overflow-y-auto p-2 md:p-4">
                <div className="h-full">
                  <Suspense fallback={<ContentGridSkeleton />}>
                    <Outlet />
                  </Suspense>
                </div>
              </main>

              {/* DESKTOP VIEW (Side-by-side) */}
              <aside className="hidden xl:flex border-l bg-card animate-in slide-in-from-right duration-300">
                {activePanel === 'chat' && <ChatSidebar onClose={closePanel} />}
                {activePanel === 'notifications' && <NotificationSidebar onClose={closePanel} />}
              </aside>

              {/* MOBILE VIEW (Overlay) */}
              <Sheet open={activePanel !== null && window.innerWidth < 1280} onOpenChange={closePanel}>
                <SheetContent side="right" className="p-0 w-[320px] sm:w-[400px]">
                  {activePanel === 'chat' && <ChatSidebar onClose={closePanel} showClose={false} />}
                  {activePanel === 'notifications' && <NotificationSidebar onClose={closePanel} showClose={false} />}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </TopbarProvider>
    </SidebarProvider>
  );
}