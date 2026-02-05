import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function WorkOrderItems({ problems, setProblems }) {
  
  const updateProblem = (pIdx, field, value) => {
    const newProblems = [...problems];
    newProblems[pIdx][field] = value;
    
    // Frictionless: Add new Problem row if typing in last description
    if (field === "description" && pIdx === problems.length - 1 && value !== "") {
      newProblems.push({ 
        id: Date.now(), description: "", laborHrs: "", laborCharges: "", parts: [] 
      });
    }
    setProblems(newProblems);
  };

  const addPartToProblem = (pIdx) => {
    const newProblems = [...problems];
    newProblems[pIdx].parts.push({ 
      id: Date.now(), partNo: "", name: "", qty: 1, price: "" 
    });
    setProblems(newProblems);
  };

  const updatePart = (pIdx, partIdx, field, value) => {
    const newProblems = [...problems];
    newProblems[pIdx].parts[partIdx][field] = value;
    
    // Frictionless: Add new Part row if typing in last Part No
    if (field === "partNo" && partIdx === newProblems[pIdx].parts.length - 1 && value !== "") {
      newProblems[pIdx].parts.push({ 
        id: Date.now(), partNo: "", name: "", qty: 1, price: "" 
      });
    }
    setProblems(newProblems);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-[10px] font-black uppercase text-primary tracking-widest">Work Order Details</h3>
      
      {problems.map((prob, pIdx) => (
        <div key={prob.id} className="group border rounded-sm bg-card overflow-hidden transition-all hover:border-primary/30">
          {/* PARENT ROW: PROBLEM & LABOR */}
          <div className="grid grid-cols-12 items-center bg-muted/20">
            <div className="col-span-6 border-r">
              <Input 
                variant="ghost" 
                placeholder="I. Customer Problem / Diagnosis..." 
                className="h-12 border-none font-medium placeholder:text-muted-foreground/50"
                value={prob.description}
                onChange={(e) => updateProblem(pIdx, "description", e.target.value)}
              />
            </div>
            <div className="col-span-2 border-r">
              <div className="flex flex-col px-3">
                <span className="text-[8px] uppercase font-bold text-muted-foreground">Hrs</span>
                <Input 
                  type="number" 
                  variant="ghost" 
                  className="h-7 border-none p-0 font-mono"
                  value={prob.laborHrs}
                  onChange={(e) => updateProblem(pIdx, "laborHrs", e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-3 border-r">
              <div className="flex flex-col px-3">
                <span className="text-[8px] uppercase font-bold text-muted-foreground">Labor Charges</span>
                <Input 
                  variant="ghost" 
                  className="h-7 border-none p-0 font-mono"
                  placeholder="0.00"
                  value={prob.laborCharges}
                  onChange={(e) => updateProblem(pIdx, "laborCharges", e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-1 flex justify-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-destructive opacity-0 group-hover:opacity-100"
                onClick={() => setProblems(problems.filter(p => p.id !== prob.id))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* NESTED SECTION: PARTS */}
          <div className="px-6 py-4 bg-background/50 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-3 w-3 text-muted-foreground" />
              <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-tighter">Required Parts</span>
            </div>

            {prob.parts.length === 0 ? (
               <Button 
                 variant="ghost" 
                 size="sm" 
                 className="h-7 text-[10px] border border-dashed"
                 onClick={() => addPartToProblem(pIdx)}
               >
                 <Plus className="h-3 w-3 mr-1" /> Add First Part
               </Button>
            ) : (
              <div className="space-y-1">
                {/* HEADERS */}
                <div className="grid grid-cols-12 gap-2 px-2 text-[8px] uppercase font-black text-muted-foreground/60">
                  <div className="col-span-3">Part No.</div>
                  <div className="col-span-4">Part Name</div>
                  <div className="col-span-1 text-center">Qty</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-right pr-8">Amount</div>
                </div>
                
                {/* PART ROWS */}
                {prob.parts.map((part, partIdx) => (
                  <div key={part.id} className="grid grid-cols-12 gap-2 items-center group/part">
                    <div className="col-span-3">
                      <Input 
                        className="h-8 text-xs font-mono bg-muted/10" 
                        placeholder="PN..." 
                        value={part.partNo}
                        onChange={(e) => updatePart(pIdx, partIdx, "partNo", e.target.value)}
                      />
                    </div>
                    <div className="col-span-4">
                      <Input 
                        className="h-8 text-xs bg-muted/10" 
                        placeholder="Description" 
                        value={part.name}
                        onChange={(e) => updatePart(pIdx, partIdx, "name", e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input 
                        type="number" 
                        className="h-8 text-xs text-center bg-muted/10" 
                        value={part.qty}
                        onChange={(e) => updatePart(pIdx, partIdx, "qty", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input 
                        className="h-8 text-xs text-right font-mono bg-muted/10" 
                        placeholder="0.00" 
                        value={part.price}
                        onChange={(e) => updatePart(pIdx, partIdx, "price", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2 font-mono text-xs pr-2">
                      ${((parseFloat(part.price) || 0) * (parseInt(part.qty) || 0)).toFixed(2)}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-destructive opacity-0 group-hover/part:opacity-100"
                        onClick={() => {
                          const newProbs = [...problems];
                          newProbs[pIdx].parts.splice(partIdx, 1);
                          setProblems(newProbs);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}