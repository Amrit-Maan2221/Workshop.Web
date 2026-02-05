import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, PlusCircle, Loader2, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DropdownService } from "@/services/Dropdown.service";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { cn } from "@/lib/utils";

export function GenericInfiniteDropdown({
  dropdownName,
  title,
  placeholder,
  onSelect,
  value,
  searchKey = "unit",
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchInputRef = useRef(null);
  const scrollRef = useRef(null);

  const { pageNumber, sentinelRef, resetPagination } = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    rootMargin: "120px",
    initialPage: 1,
    rootRef: scrollRef,
  });

  //------------------------------------------------
  // FETCH
  //------------------------------------------------

  const fetchData = useCallback(
    async (pageNum, queryStr, isNewSearch = false) => {
      try {
        setLoading(true);

        const result = await DropdownService.getDropdownData(dropdownName, {
          page: pageNum,
          limit: 20,
          query: queryStr,
        });

        setData((prev) =>
          isNewSearch ? result.items : [...prev, ...result.items]
        );

        setHasMore(result.hasMore);
      } catch (error) {
        console.error("Pagination Error:", error);
      } finally {
        setLoading(false);
      }
    },
    [dropdownName]
  );

  //------------------------------------------------
  // SEARCH (debounced)
  //------------------------------------------------

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      resetPagination();
      fetchData(1, search, true);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, open, fetchData, resetPagination]);

  //------------------------------------------------
  // PAGINATION
  //------------------------------------------------

  useEffect(() => {
    if (!open) return;
    if (pageNumber === 1) return;
    if (!hasMore) return;

    fetchData(pageNumber, search);
  }, [pageNumber, open, hasMore, fetchData, search]);

  //------------------------------------------------
  // LOAD WHEN OPEN
  //------------------------------------------------

  useEffect(() => {
    if (!open) return;

    if (!data.length) {
      resetPagination();
      fetchData(1, "", true);
    }

    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
  }, [open, data.length, fetchData, resetPagination]);

  //------------------------------------------------
  // RESET WHEN CLOSED
  //------------------------------------------------

  useEffect(() => {
    if (!open) {
      setHighlightedIndex(-1);
      setSearch("");
    }
  }, [open]);

  //------------------------------------------------
  // HIGHLIGHT DEFAULT
  //------------------------------------------------

  useEffect(() => {
    setHighlightedIndex(data.length ? 0 : -1);
  }, [data]);


  //------------------------------------------------
  // AUTO SCROLL
  //------------------------------------------------

  useEffect(() => {
    if (highlightedIndex < 0) return;

    const el = document.getElementById(
      `dropdown-row-${highlightedIndex}`
    );

    el?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  
  //------------------------------------------------
  // KEYBOARD NAVIGATION
  //------------------------------------------------

  const handleListKeyDown = (e) => {
    if (!data.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < data.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;

      case "Enter":
        e.preventDefault();
        const item = data[highlightedIndex];
        if (item) {
          onSelect(item);
          setOpen(false);
        }
        break;

      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        break;

      default:
        break;
    }
  };

  //------------------------------------------------

  const columns =
    data.length > 0
      ? Object.keys(data[0]).filter(
          (k) => k !== "id" && typeof data[0][k] !== "object"
        )
      : [];

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
          onKeyDown={(e) => {
            if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
              e.preventDefault();
              setOpen(true);
            }

            if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value || placeholder}
          </span>

          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[650px] p-0" align="start">
        {/* HEADER */}
        <div className="p-3 border-b space-y-3 bg-muted/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-muted-foreground">
              {title}
            </span>

            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <PlusCircle className="h-3.5 w-3.5 mr-1" />
              Add New
            </Button>
          </div>

          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              ref={searchInputRef}
              placeholder="Filter list..."
              className="pl-9 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  scrollRef.current?.focus();
                }

                if (e.key === "Escape") {
                  e.stopPropagation();
                  setOpen(false);
                }
              }}
            />
          </div>
        </div>

        {/* LIST */}
        <div
          ref={scrollRef}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          className="max-h-[350px] overflow-auto outline-none"
        >
          <table className="w-full text-sm">
            <thead className="bg-muted sticky top-0 z-10 border-b">
              <tr>
                <th className="w-10 p-3"></th>

                {columns.map((col) => (
                  <th
                    key={col}
                    className="p-3 text-left text-[10px] uppercase font-bold text-muted-foreground"
                  >
                    {col.replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {data.map((item, idx) => {
                const isSelected = item[searchKey] === value;
                const isHighlighted = idx === highlightedIndex;

                return (
                  <tr
                    id={`dropdown-row-${idx}`}
                    key={`${item.id}-${idx}`}
                    className={cn(
                      "cursor-pointer transition-colors",
                      isHighlighted && "bg-accent",
                      isSelected && "bg-primary/10"
                    )}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onClick={() => {
                      onSelect(item);
                      setOpen(false);
                    }}
                  >
                    <td className="p-1 text-center">
                      {isSelected && (
                        <Check className="h-3 w-3 text-primary mx-auto" />
                      )}
                    </td>

                    {columns.map((col) => (
                      <td
                        key={col}
                        className={cn(
                          "p-2 whitespace-nowrap",
                          isSelected && "font-semibold text-primary"
                        )}
                      >
                        {item[col]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* SENTINEL */}
          <div
            ref={sentinelRef}
            className="h-14 flex items-center justify-center"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}

            {!hasMore && data.length > 0 && (
              <span className="text-xs text-muted-foreground uppercase font-semibold">
                End of list
              </span>
            )}

            {!loading && data.length === 0 && (
              <span className="text-sm text-muted-foreground">
                No records found
              </span>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
