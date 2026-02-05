import React, { useState, useEffect } from "react";
import { Filter, Trash2, X, ListPlus, FolderPlus, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { formatColumnHeader } from "@/lib/helpers";
import { useIsMobile } from "@/hooks/use-mobile";

// --- Constants & Helpers ---

const COLUMN_TYPES = {
  vc: "string", nvc: "string", id: "number", int: "number",
  flt: "number", dec: "number", dt: "date", dat: "date", bit: "boolean",
};

const OPERATORS_BY_TYPE = {
  string: [
    { label: "Contains", value: "contains" },
    { label: "Equals", value: "eq" },
    { label: "Not Equals", value: "neq" },
  ],
  number: [
    { label: "=", value: "eq" },
    { label: "≠", value: "neq" }, // Added Not Equal
    { label: ">", value: "gt" },
    { label: "≥", value: "gte" }, // Added Greater Than or Equal
    { label: "<", value: "lt" },
    { label: "≤", value: "lte" }, // Added Less Than or Equal
    { label: "Between", value: "between" },
  ],
  date: [
    { label: "On", value: "eq" },
    { label: "Between", value: "between" },
    { label: "Before", value: "lt" },
    { label: "After", value: "gt" },
  ],
  boolean: [{ label: "Is", value: "eq" }],
};

const getColumnType = (colName) => {
  if (!colName) return "string";
  const prefix = colName.match(/^[a-z]+/)?.[0];
  return COLUMN_TYPES[prefix] || "string";
};

// --- Sub-Components ---

const ShadcnDatePicker = ({ value, onChange, placeholder }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "h-10 md:h-8 w-full justify-start text-left font-normal text-xs px-2 bg-background",
          !value && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-3.5 w-3.5" />
        {value ? format(new Date(value), "PPP") : <span>{placeholder}</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={value ? new Date(value) : undefined}
        onSelect={(date) => onChange(date?.toISOString())}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

// --- Main Component ---

export function QueryBuilder({ columns, onApply }) {
  const isMobile = useIsMobile();
  const [query, setQuery] = useState({
    id: "root",
    type: "group",
    combinator: "AND",
    rules: [{ id: Date.now(), type: "rule", column: "", operator: "eq", value: "", value2: "" }],
  });

  // --- Logic Helpers ---
  const updateNode = (node, targetId, updater) => {
    if (node.id === targetId) return updater(node);
    if (node.type === "group") {
      return { ...node, rules: node.rules.map((r) => updateNode(r, targetId, updater)) };
    }
    return node;
  };

  const removeNode = (node, targetId) => {
    if (node.type === "group") {
      return {
        ...node,
        rules: node.rules.filter((r) => r.id !== targetId).map((r) => removeNode(r, targetId)),
      };
    }
    return node;
  };

  const handleAdd = (groupId, type) => {
    setQuery(prev => updateNode(prev, groupId, g => ({
      ...g,
      rules: [...g.rules, type === 'rule' 
        ? { id: Date.now(), type: "rule", column: "", operator: "eq", value: "", value2: "" }
        : { id: Date.now(), type: "group", combinator: "AND", rules: [{ id: Date.now() + 1, type: "rule", column: "", operator: "eq", value: "", value2: "" }] }
      ]
    })));
  };

  const FilterGroup = ({ group, isRoot = false }) => (
  <div className={cn("relative space-y-4", !isRoot && "pl-4 ml-1 border-l-2 border-muted/50 py-1")}>
    <div className="flex items-center justify-between">
      <Tabs
        value={group.combinator}
        onValueChange={(v) => setQuery((prev) => updateNode(prev, group.id, (g) => ({ ...g, combinator: v })))}
        className="w-[100px]"
      >
        <TabsList className="h-7 w-full p-0.5">
          <TabsTrigger value="AND" className="text-[10px] flex-1">AND</TabsTrigger>
          <TabsTrigger value="OR" className="text-[10px] flex-1">OR</TabsTrigger>
        </TabsList>
      </Tabs>

      {!isRoot && (
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => setQuery((prev) => removeNode(prev, group.id))}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>

    <div className="space-y-2">
      {group.rules.map((rule) => {
        const type = getColumnType(rule.column);
        return rule.type === "group" ? (
          <div key={rule.id} className="bg-muted/20 rounded-lg p-3 border border-border/40 shadow-sm">
            <FilterGroup group={rule} />
          </div>
        ) : (
          <div key={rule.id} className="group flex flex-col md:flex-row gap-2 items-end md:items-center p-2 rounded-md hover:bg-muted/10 transition-colors border md:border-none border-border/50">
            {/* Selectors: Now Row-wise on desktop */}
            <div className="flex flex-row gap-2 w-full md:w-auto">
              <Select 
                value={rule.column} 
                onValueChange={(v) => setQuery(prev => updateNode(prev, rule.id, r => ({ ...r, column: v, value: "", value2: "" })))}
              >
                <SelectTrigger className="h-8 text-xs bg-background w-full md:w-[130px]">
                  <SelectValue placeholder="Column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map(c => <SelectItem key={c} value={c}>{formatColumnHeader(c)}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select 
                value={rule.operator} 
                onValueChange={(v) => setQuery(prev => updateNode(prev, rule.id, r => ({ ...r, operator: v })))}
              >
                <SelectTrigger className="h-8 text-xs bg-background w-full md:w-[110px]">
                  <SelectValue placeholder="Operator" />
                </SelectTrigger>
                <SelectContent>
                  {OPERATORS_BY_TYPE[type].map(op => <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Value Column: Flex-1 takes remaining space, but stacks 'Between' logic vertically if needed */}
            <div className="w-full md:flex-1 min-w-[150px]">
              {rule.operator === "between" ? (
                <div className="flex flex-col gap-2">
                  {type === 'date' ? (
                    <>
                      <ShadcnDatePicker value={rule.value} onChange={v => setQuery(p => updateNode(p, rule.id, r => ({...r, value: v})))} placeholder="From" />
                      <ShadcnDatePicker value={rule.value2} onChange={v => setQuery(p => updateNode(p, rule.id, r => ({...r, value2: v})))} placeholder="To" />
                    </>
                  ) : (
                    <>
                      <Input type="number" placeholder="Min" className="h-8 text-xs" value={rule.value} onChange={e => setQuery(p => updateNode(p, rule.id, r => ({...r, value: e.target.value})))} />
                      <Input type="number" placeholder="Max" className="h-8 text-xs" value={rule.value2} onChange={e => setQuery(p => updateNode(p, rule.id, r => ({...r, value2: e.target.value})))} />
                    </>
                  )}
                </div>
              ) : (
                type === 'date' ? (
                  <ShadcnDatePicker value={rule.value} onChange={v => setQuery(p => updateNode(p, rule.id, r => ({...r, value: v})))} placeholder="Select date" />
                ) : (
                  <Input placeholder="Value..." className="h-8 text-xs" value={rule.value} onChange={e => setQuery(p => updateNode(p, rule.id, r => ({...r, value: e.target.value})))} />
                )
              )}
            </div>

            {/* Actions: Trash icon aligned horizontally on desktop */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity" 
              onClick={() => setQuery(p => removeNode(p, rule.id))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>

    <div className="flex gap-2 pt-2">
      <Button variant="outline" size="sm" onClick={() => handleAdd(group.id, 'rule')} className="h-7 px-3 text-[10px] border-dashed">
        <ListPlus className="h-3.5 w-3.5 mr-1" /> Add Rule
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleAdd(group.id, 'group')} className="h-7 px-3 text-[10px] border-dashed">
        <FolderPlus className="h-3.5 w-3.5 mr-1" /> Add Group
      </Button>
    </div>
  </div>
);

  const Content = () => (
    <>
      <div className="p-4 overflow-y-auto overflow-x-hidden max-h-[60vh] md:max-h-[500px]">
        <FilterGroup group={query} isRoot={true} />
      </div>
      <div className="flex justify-between items-center p-4 md:p-3 bg-muted/30 border-t border-border mt-auto">
        <Button variant="ghost" size="sm" className="text-xs" onClick={() => setQuery({ id: "root", type: "group", combinator: "AND", rules: [{ id: Date.now(), type: "rule", column: "", operator: "eq", value: "", value2: "" }] })}>Reset</Button>
        <Button size="sm" className="px-6" onClick={() => onApply(query)}>Apply</Button>
      </div>
    </>
  );

  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filters</Button></DrawerTrigger>
      <DrawerContent className="px-1">
        <DrawerHeader className="text-left"><DrawerTitle>Advanced Filters</DrawerTitle></DrawerHeader>
        <Content />
      </DrawerContent>
    </Drawer>
  ) : (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline" size="sm">
        <Filter className="h-3.5 w-3.5 mr-2" /> Filters</Button>
    </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0 shadow-xl" align="start">
        <Content />
      </PopoverContent>
    </Popover>
  );
}