import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, MessageSquare, Search } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useTopbar } from "@/providers/TopbarContext";

export default function Topbar({ activePanel, onToggleChat, onToggleNotifications }) {
  const pageTitle = usePageTitle();
  const { actions } = useTopbar();

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4">
      {/* LEFT: Sidebar Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4 hidden md:block" />
        <div className="hidden md:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-muted-foreground hover:text-foreground">
                  Workshop
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-foreground">
                  {pageTitle}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* RIGHT: Actions, Search, & Global Notifications */}
      <div className="flex items-center gap-3">
        {/* Contextual Actions (Buttons passed from the Page) */}
        <div className="flex items-center gap-2 pr-2 border-r">
          {actions}
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <Button
              variant={activePanel === 'chat' ? "secondary" : "ghost"}
              size="icon"
              onClick={onToggleChat}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>

            <Button
              variant={activePanel === 'notifications' ? "secondary" : "ghost"}
              size="icon"
              onClick={onToggleNotifications}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}