import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '@/components/common/DataTable';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTopbar } from "@/providers/TopbarContext";

export default function EstimatePage() {
  const { setActions } = useTopbar();

  useEffect(() => {
    // The button is now a Link to the /estimates/create route defined in your routerConfig
    const actions = (
      <Button asChild size="sm" className="gap-2 h-8 shadow-sm">
        <Link to="estimates/create">
          <Plus className="h-4 w-4" />
          Create Estimate
        </Link>
      </Button>
    );

    setActions(actions);
    return () => setActions(null);
  }, [setActions]);

  return (
    <DataTable report="estimates" />
  );
}