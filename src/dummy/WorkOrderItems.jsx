import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Package } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EstimateWorkItems({ problems, setProblems }) {
  
  // Helper to calculate total parts cost for a specific problem
  const calculatePartCharges = (parts = []) => {
    return parts.reduce((sum, part) => {
      return sum + (parseFloat(part.price) || 0) * (parseInt(part.qty) || 0);
    }, 0).toFixed(2);
  };

  const updateProblem = (pIdx, field, value) => {
    const newProblems = [...problems];
    newProblems[pIdx][field] = value;
    
    // Frictionless: New problem row if typing in the first field (Description)
    if (field === "description" && pIdx === problems.length - 1 && value.trim() !== "") {
      newProblems.push({ 
        id: Date.now(), 
        description: "", 
        task: "",
        laborHrs: "", 
        laborCharges: "", 
        parts: [] 
      });
    }
    setProblems(newProblems);
  };

  const addPartRow = (pIdx) => {
    const newProblems = [...problems];
    newProblems[pIdx].parts = [
      ...(newProblems[pIdx].parts || []),
      { id: Date.now(), partNo: "", name: "", qty: 1, price: "" }
    ];
    setProblems(newProblems);
  };

  const updatePart = (pIdx, partIdx, field, value) => {
    const newProblems = [...problems];
    newProblems[pIdx].parts[partIdx][field] = value;
    
    // Frictionless: New part row
    if (field === "partNo" && partIdx === newProblems[pIdx].parts.length - 1 && value.trim() !== "") {
      newProblems[pIdx].parts.push({ id: Date.now() + 1, partNo: "", name: "", qty: 1, price: "" });
    }
    setProblems(newProblems);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-[10px] font-black uppercase text-primary tracking-widest">Work Order Details</h3>
      
      {problems.map((prob, pIdx) => (
        <div key={prob.id} className="group border rounded-sm bg-card overflow-hidden hover:border-primary/30 transition-all shadow-sm">
          
          {/* UPPER LEVEL: PROBLEM, TASK, LABOR, AND AUTO-PART CHARGES */}
          <div className="grid grid-cols-12 items-center bg-muted/20 border-b">
            {/* 1. Description/Diagnosis */}
            <div className="col-span-3 border-r h-full">
              <div className="px-3 pt-2">
                <span className="text-[8px] uppercase font-black text-muted-foreground/70 block">Description/Diagnosis</span>
                <Input 
                  variant="ghost" 
                  placeholder="Issue details..." 
                  className="h-8 p-0 border-none font-medium focus-visible:ring-0"
                  value={prob.description}
                  onChange={(e) => updateProblem(pIdx, "description", e.target.value)}
                />
              </div>
            </div>

            {/* 2. Task Dropdown */}
            <div className="col-span-2 border-r h-full px-3 pt-2">
              <span className="text-[8px] uppercase font-black text-muted-foreground/70 block mb-1">Task</span>
              <Select 
                value={prob.task} 
                onValueChange={(val) => updateProblem(pIdx, "task", val)}
              >
                <SelectTrigger className="h-7 border-none bg-transparent p-0 shadow-none focus:ring-0 text-xs">
                  <SelectValue placeholder="Select Task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="repair">Repair</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 3. Labor Hours */}
            <div className="col-span-1 border-r h-full px-3 pt-2">
              <span className="text-[8px] uppercase font-black text-muted-foreground/70 block">Hours</span>
              <Input 
                variant="ghost" 
                className="h-8 p-0 border-none font-mono focus-visible:ring-0 text-center" 
                value={prob.laborHrs} 
                onChange={(e) => updateProblem(pIdx, "laborHrs", e.target.value)} 
              />
            </div>

            {/* 4. Labor Charges */}
            <div className="col-span-2 border-r h-full px-3 pt-2">
              <span className="text-[8px] uppercase font-black text-muted-foreground/70 block">Labor Charges</span>
              <Input 
                variant="ghost" 
                className="h-8 p-0 border-none font-mono focus-visible:ring-0" 
                placeholder="0.00"
                value={prob.laborCharges} 
                onChange={(e) => updateProblem(pIdx, "laborCharges", e.target.value)} 
              />
            </div>

            {/* 5. Part Charges (Auto Calculated) */}
            <div className="col-span-3 border-r h-full px-3 pt-2 bg-primary/5">
              <span className="text-[8px] uppercase font-black text-primary/70 block">Part Charges (Auto)</span>
              <div className="h-8 flex items-center font-mono text-sm font-bold text-primary">
                ${calculatePartCharges(prob.parts)}
              </div>
            </div>

            {/* Delete Button */}
            <div className="col-span-1 flex justify-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity" 
                onClick={() => setProblems(problems.filter(p => p.id !== prob.id))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* NESTED PARTS SUB-GRID */}
          <div className="px-6 py-4 bg-background/50">
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-3 w-3 text-muted-foreground" />
              <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-tighter">Internal Parts Grid</span>
            </div>

            {(!prob.parts || prob.parts.length === 0) ? (
              <Button variant="ghost" size="sm" className="h-8 text-[10px] border border-dashed" onClick={() => addPartRow(pIdx)}>
                <Plus className="h-3 w-3 mr-1" /> Add Parts
              </Button>
            ) : (
              <div className="space-y-1">
                <div className="grid grid-cols-12 gap-2 px-2 text-[8px] uppercase font-black text-muted-foreground/40">
                  <div className="col-span-3">Part No.</div>
                  <div className="col-span-4">Part Name</div>
                  <div className="col-span-1 text-center">Qty</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-right pr-8">Total</div>
                </div>

                {prob.parts.map((part, partIdx) => (
                  <div key={part.id} className="grid grid-cols-12 gap-2 items-center group/part">
                    <div className="col-span-3">
                      <Input className="h-8 text-xs font-mono bg-muted/5" placeholder="SKU..." value={part.partNo} onChange={(e) => updatePart(pIdx, partIdx, "partNo", e.target.value)} />
                    </div>
                    <div className="col-span-4">
                      <Input className="h-8 text-xs bg-muted/5" placeholder="Name..." value={part.name} onChange={(e) => updatePart(pIdx, partIdx, "name", e.target.value)} />
                    </div>
                    <div className="col-span-1">
                      <Input className="h-8 text-xs text-center bg-muted/5" type="number" value={part.qty} onChange={(e) => updatePart(pIdx, partIdx, "qty", e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <Input className="h-8 text-xs text-right font-mono bg-muted/5" placeholder="0.00" value={part.price} onChange={(e) => updatePart(pIdx, partIdx, "price", e.target.value)} />
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2 font-mono text-xs pr-2">
                      ${((parseFloat(part.price) || 0) * (parseInt(part.qty) || 0)).toFixed(2)}
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive opacity-0 group-hover/part:opacity-100" onClick={() => {
                        const newProbs = [...problems];
                        newProbs[pIdx].parts.splice(partIdx, 1);
                        setProblems(newProbs);
                      }}>
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