import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DataTableSearch({ value, onChange }) {
  return (
    <div className="flex w-full max-w-[256px] items-stretch overflow-hidden rounded-md border border-input bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring">
      {/* Icon Prefix Box */}
      <div className="flex items-center justify-center border-r bg-muted/30 px-2.5">
        <Search className="h-4 w-4 text-muted-foreground/80" />
      </div>
      
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 border-0 bg-transparent text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}