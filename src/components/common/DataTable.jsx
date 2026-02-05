import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Loader2, ChevronDown, ArrowUp, ArrowDown, ArrowUpDown, Settings2 } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { QueryBuilder } from "./QueryBuilder";
import { DataTableSearch } from "./DataTableSearch";
import { formatColumnHeader } from "@/lib/helpers";
import ContentGridSkeleton from "./ContentGridSkeleton";
import ReportService from "@/services/reportService";

function DataTable({ report }) {
  const [data, setData] = useState([]);
  const [allColumns, setAllColumns] = useState([]); 
  const [visibleColumns, setVisibleColumns] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ column: null, direction: null });
  const [filters, setFilters] = useState(null);

  const pageSize = 20;

  // Check if this is the very first load
  const isInitialLoading = isLoading && data.length === 0;

  const displayColumns = useMemo(() => {
    return allColumns.filter(col => visibleColumns.includes(col));
  }, [allColumns, visibleColumns]);

  const {
    pageNumber,
    scrollRef,
    sentinelRef,
    loadMore,
    resetPagination
  } = useInfiniteScroll({ hasMore, isLoading, dataLength: data.length });

  const fetchData = useCallback(async (page, isInitial = false, query = "", sort = { column: null, direction: null }, currentFilters = null) => {
    if (!report) return;
    setIsLoading(true);
    setError(null);

    try {
      const newItems = await ReportService.fetchReportData(report, {
        page,
        pageSize,
        query,
        sort,
        filters: currentFilters
      });

      if (isInitial) {
        if (newItems.length > 0) {
          const keys = Object.keys(newItems[0]);
          setAllColumns(keys);
          if (visibleColumns.length === 0) setVisibleColumns(keys);
        }
        setData(newItems);
      } else {
        setData((prev) => [...prev, ...newItems]);
      }

      setHasMore(newItems.length === pageSize);
    } catch (err) {
      setError("Failed to extract data.");
    } finally {
      setIsLoading(false);
    }
  }, [report, visibleColumns.length]);

  // 1. Consolidated Effect for Search and Sort (Resetting)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log("Resetting & Fetching - Search/Sort/report change");
      resetPagination(); // Reset page back to 1
      fetchData(pageNumber, true, searchQuery, sortConfig, filters);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, sortConfig, report, resetPagination, fetchData, filters]);

  useEffect(() => {
    if (pageNumber > 1) {
      console.log("Loading More - Page:", pageNumber);
      fetchData(pageNumber, false, searchQuery, sortConfig, filters);
    }
  }, [pageNumber, fetchData]);

  const handleSort = (column) => {
    let newDirection = "asc";
    if (sortConfig.column === column) {
      if (sortConfig.direction === "asc") newDirection = "desc";
      else if (sortConfig.direction === "desc") newDirection = null;
    }
    
    const newSort = { column: newDirection ? column : null, direction: newDirection };
    setSortConfig(newSort); 
  };

  const toggleColumn = (column) => {
    setVisibleColumns(prev => 
      prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
    );
  };

  const getSortIcon = (column) => {
    if (sortConfig.column !== column) return <ArrowUpDown className="ml-2 h-3 w-3 opacity-30" />;
    return sortConfig.direction === "asc" 
      ? <ArrowUp className="ml-2 h-3 w-3 text-primary" /> 
      : <ArrowDown className="ml-2 h-3 w-3 text-primary" />;
  };

  if (isInitialLoading) {
    return <ContentGridSkeleton />;
  }

  return (
    <div className="flex flex-col space-y-2 h-[calc(100vh-120px)] min-h-[400px] animate-in fade-in duration-500">
      <div className="flex flex-none items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <DataTableSearch value={searchQuery} onChange={setSearchQuery} />
          <QueryBuilder columns={allColumns} onApply={(q) => setFilters(q)} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-none">
              <Settings2 className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {allColumns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col}
                className="capitalize"
                checked={visibleColumns.includes(col)}
                onCheckedChange={() => toggleColumn(col)}
              >
                {formatColumnHeader(col)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 border rounded-none overflow-hidden flex flex-col"> 
        <div ref={scrollRef} className="relative flex-1 overflow-auto">
          <Table className="rounded-none border-collapse">
            <TableHeader className="sticky top-0 z-30 bg-background shadow-sm">
              <TableRow className="rounded-none hover:bg-transparent">
                {displayColumns.map((col) => (
                  <TableHead 
                    key={col} 
                    onClick={() => handleSort(col)}
                    className="bg-background outline outline-1 outline-muted rounded-none cursor-pointer hover:bg-muted/50 transition-colors select-none"
                  >
                    <div className="flex items-center">
                      {formatColumnHeader(col)}
                      {getSortIcon(col)}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={row?.logEventId ?? idx} className="rounded-none">
                  {displayColumns.map((col) => (
                    <TableCell key={col} className="whitespace-nowrap">
                      {row[col]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* Empty State */}
              {data.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={displayColumns.length || 1} className="h-32 text-center text-muted-foreground uppercase tracking-widest text-xs">
                    No records found
                  </TableCell>
                </TableRow>
              )}

              {/* Infinite Scroll Loader (Bottom only) */}
              <TableRow className="hover:bg-transparent border-b-0">
                <TableCell colSpan={displayColumns.length || 1} className="p-0 border-b-0">
                  <div ref={sentinelRef} className="h-px w-full" />
                  <div className="flex flex-col items-center justify-center py-6">
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        <Loader2 className="h-3 w-3 animate-spin" /> Processing...
                      </div>
                    ) : hasMore ? (
                      <Button variant="ghost" onClick={loadMore} size="sm" className="text-xs h-8 rounded-none">
                        <ChevronDown className="h-4 w-4 mr-1" /> Load More
                      </Button>
                    ) : !isLoading && !hasMore && data.length > 0 && (
                      <div className="text-xs tracking-widest text-muted-foreground uppercase opacity-50">
                        End of Data Stream
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DataTable;