import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import EstimateHeader from "./EstimateHeader";
import EstimateWorkItems from "./WorkOrderItems";
import EstimateSummary from "./EstimateSummary";

export default function CreateEstimateForm() {
  // Nested State: Each problem owns its own array of parts
  const [problems, setProblems] = useState([
    { 
      id: Date.now(), 
      description: "", 
      laborHrs: "", 
      laborCharges: "", 
      parts: [] 
    }
  ]);

  const totals = useMemo(() => {
    let labor = 0;
    let partsTotal = 0;

    problems.forEach(p => {
      labor += parseFloat(p.laborCharges) || 0;
      p.parts?.forEach(part => {
        partsTotal += (parseFloat(part.price) || 0) * (parseInt(part.qty) || 0);
      });
    });

    const subtotal = labor + partsTotal;
    const tax = subtotal * 0.13;
    return { labor, partsTotal, tax, total: subtotal + tax };
  }, [problems]);

  return (
    <div className="h-full w-full flex flex-col bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-12 py-2 custom-scrollbar">
        <div className="mx-auto w-full space-y-12">
          
          <EstimateHeader />

          <Separator className="bg-muted" />

          <EstimateWorkItems
            problems={problems} 
            setProblems={setProblems} 
          />
          
          <Separator className="bg-muted" />
          
          <EstimateSummary totals={totals} />
        </div>
      </div>

      {/* DOCKED FOOTER */}
      <div className="flex-none bg-card border-t p-4 px-8 flex justify-end items-center gap-4">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground font-bold uppercase text-[10px]">
          <Link to="/estimates">Cancel</Link>
        </Button>
        <Button size="sm" className="px-10 h-10 font-black uppercase text-[11px] tracking-widest shadow-lg shadow-primary/20">
          Save
        </Button>
      </div>
    </div>
  );
}