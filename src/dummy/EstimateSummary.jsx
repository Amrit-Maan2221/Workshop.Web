import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Paperclip } from "lucide-react";

export default function EstimateSummary({ totals }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Internal Notes</Label>
          <textarea 
            className="w-full min-h-[100px] text-sm p-4 bg-muted/10 border rounded-sm outline-none focus:ring-1 focus:ring-primary/30 transition-all resize-none" 
            placeholder="Technical notes for the shop..." 
          />
        </div>
        <Button variant="outline" className="h-9 text-[10px] font-bold uppercase tracking-widest border-dashed px-6">
          <Paperclip className="h-3.5 w-3.5 mr-2" /> Attach Media / Photos
        </Button>
      </div>

      <div className="bg-muted/20 p-8 border rounded-sm">
        <div className="max-w-xs ml-auto space-y-3">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Labor Subtotal</span>
            <span className="font-mono font-medium text-foreground">${totals.labor.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Parts Subtotal</span>
            <span className="font-mono font-medium text-foreground">${totals.partsTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-[10px] uppercase font-bold text-muted-foreground/50">
            <span>Sales Tax (13%)</span>
            <span className="font-mono">${totals.tax.toFixed(2)}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-end">
            <span className="text-[10px] uppercase font-black text-primary mb-1 tracking-tighter">Total Estimate</span>
            <div className="text-4xl font-black tracking-tighter text-primary">
              ${totals.total.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}