import { X, Bell, AlertTriangle, CheckCircle2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const notifications = [
  { id: 1, type: 'alert', title: 'Low Stock', description: 'Brake Fluid is below 10%', time: '5m ago', icon: AlertTriangle, color: 'text-destructive' },
  { id: 2, type: 'workorder', title: 'New Work Order', description: 'WO-2024-0456 assigned to you', time: '1h ago', icon: Bell, color: 'text-primary' },
  { id: 3, type: 'status', title: 'Completed', description: 'Engine diagnostic for Toyota Camry finished', time: '3h ago', icon: CheckCircle2, color: 'text-emerald-500' },
  { id: 4, type: 'inventory', title: 'Parts Arrived', description: 'Oil filters for Sarah Smith have arrived', time: 'Yesterday', icon: Package, color: 'text-blue-500' },
];

export default function NotificationSidebar({ onClose, showClose = true }) {
  return (
    <div className="h-full flex flex-col bg-card overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between bg-muted/20 h-16">
        <div>
          <h3 className="font-semibold text-sm">Notifications</h3>
          <p className="text-[10px] text-muted-foreground">Recent Workshop Activity</p>
        </div>
        {showClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {notifications.map((n) => (
            <div key={n.id} className="p-4 border-b hover:bg-muted/30 transition-colors cursor-pointer group">
              <div className="flex gap-3">
                <div className={`mt-1 p-2 rounded-full bg-muted/50 ${n.color}`}>
                  <n.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium leading-none">{n.title}</p>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {n.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t text-center">
        <Button variant="link" className="text-xs text-muted-foreground">
          Clear all notifications
        </Button>
      </div>
    </div>
  );
}