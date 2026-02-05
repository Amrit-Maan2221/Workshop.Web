import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, MessageSquare } from "lucide-react";
import { Link, useMatches } from "react-router-dom"; // Use useMatches
import { Button } from "@/components/ui/button";
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
import React from "react";

export default function Topbar({ activePanel, onToggleChat, onToggleNotifications }) {
  const { actions } = useTopbar();
  const matches = useMatches();

  // Filter matches to only those that have a handle and a title
  const breadcrumbs = matches
    .filter((match) => Boolean(match.handle?.title))
    .map((match) => ({
      title: match.handle.title,
      path: match.pathname,
    }));

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4">
      {/* LEFT: Sidebar Toggle & Dynamic Breadcrumbs */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4 hidden md:block" />
        <div className="hidden md:block">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                
                return (
                  <React.Fragment key={crumb.path}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="font-semibold text-foreground">
                          {crumb.title}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link 
                            to={crumb.path} 
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {crumb.title}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* RIGHT: Actions & Global Notifications */}
      <div className="flex items-center gap-3">
        {actions && (
          <div className="flex items-center gap-2 pr-2 border-r">
            {actions}
          </div>
        )}

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
    </header>
  );
}