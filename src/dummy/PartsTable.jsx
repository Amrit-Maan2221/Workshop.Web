import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function PartsTable({ parts, setParts }) {
  
  const handlePartChange = (index, field, value) => {
    const newParts = [...parts];
    newParts[index][field] = value;
    setParts(newParts);

    // Auto-add new row logic: if user starts typing in the 'Part No' of the last row
    if (index === parts.length - 1 && value.trim() !== "" && field === "partNo") {
      setParts([
        ...newParts,
        { id: Date.now(), partNo: "", name: "", qty: 1, price: "" }
      ]);
    }
  };

  const removeRow = (id) => {
    // Prevent removing the very last row if it's the only one left
    if (parts.length > 1) {
      setParts(parts.filter((p) => p.id !== id));
    }
  };

  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-black uppercase text-primary tracking-tighter">
        II. Parts & Inventory
      </h3>
      <div className="border rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 border-b">
            <tr className="text-[10px] uppercase text-muted-foreground">
              <th className="px-4 py-2.5 text-left w-48 font-bold">Part No.</th>
              <th className="px-4 py-2.5 text-left font-bold">Description</th>
              <th className="px-4 py-2.5 text-center w-20 font-bold">Qty</th>
              <th className="px-4 py-2.5 text-right w-36 font-bold">Price</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {parts.map((part, idx) => (
              <tr key={part.id} className="group hover:bg-muted/5">
                {/* Part Number Column */}
                <td className="p-0">
                  <Input
                    variant="ghost"
                    className="border-none focus-visible:ring-0 h-11 rounded-none font-mono text-xs pl-4"
                    placeholder="SKU-..."
                    value={part.partNo}
                    onChange={(e) => handlePartChange(idx, "partNo", e.target.value)}
                  />
                </td>

                {/* Description Column */}
                <td className="p-0 border-x">
                  <Input
                    variant="ghost"
                    className="border-none focus-visible:ring-0 h-11 rounded-none"
                    placeholder="Part name..."
                    value={part.name}
                    onChange={(e) => handlePartChange(idx, "name", e.target.value)}
                  />
                </td>

                {/* Quantity Column */}
                <td className="p-0 border-r">
                  <Input
                    variant="ghost"
                    className="border-none focus-visible:ring-0 text-center h-11 rounded-none"
                    type="number"
                    value={part.qty}
                    onChange={(e) => handlePartChange(idx, "qty", e.target.value)}
                  />
                </td>

                {/* Price Column */}
                <td className="p-0">
                  <Input
                    variant="ghost"
                    className="border-none focus-visible:ring-0 text-right h-11 rounded-none font-mono pr-4"
                    placeholder="0.00"
                    value={part.price}
                    onChange={(e) => handlePartChange(idx, "price", e.target.value)}
                  />
                </td>

                {/* Action Column */}
                <td className="p-0 text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeRow(part.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}