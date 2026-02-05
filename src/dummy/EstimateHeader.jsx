import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Car, Gauge, Mail } from "lucide-react";
import { GenericInfiniteDropdown } from "./GenericInfiniteDropdown";

export default function EstimateHeader() {
  const [vehicleData, setVehicleData] = useState({
    unit: "",
    make: "",
    model: "",
    year: "",
    vin: "",
    customer: "",
    email: "",
    odometer: ""
  });

  // This handles when a row is clicked in the popover
  const handleSelectUnit = (unit) => {
    setVehicleData(prev => ({ 
      ...prev, 
      ...unit, 
      odometer: "" // Clear odometer for the new selection
    }));
  };

  // Generic change handler for manual typing
  const handleChange = (field, value) => {
    setVehicleData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="max-w-md space-y-2">
        <Label className="text-xs font-semibold uppercase text-muted-foreground">
          Select Vehicle Unit
        </Label>
        <GenericInfiniteDropdown
          dropdownName="units"
          title="Unit Fleet"
          placeholder="Search units..."
          onSelect={handleSelectUnit} // FIXED: matched the function name
          onSearchChange={(val) => handleChange("unit", val)} // Updates state as user types
          value={vehicleData.unit} 
          searchKey="unit" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Vehicle Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2 text-primary">
            <Car className="h-4 w-4" />
            <h2 className="text-sm font-bold uppercase tracking-tight">Vehicle Specifications</h2>
          </div>
          
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 space-y-1.5">
              <Label>VIN / Serial</Label>
              <Input 
                className="font-mono"
                value={vehicleData.vin} 
                onChange={(e) => handleChange("vin", e.target.value)}
              />
            </div>
            
            <div className="col-span-4 space-y-1.5">
              <Label>Make</Label>
              <Input value={vehicleData.make} onChange={(e) => handleChange("make", e.target.value)} />
            </div>
            <div className="col-span-5 space-y-1.5">
              <Label>Model</Label>
              <Input value={vehicleData.model} onChange={(e) => handleChange("model", e.target.value)} />
            </div>
            <div className="col-span-3 space-y-1.5">
              <Label>Year</Label>
              <Input value={vehicleData.year} onChange={(e) => handleChange("year", e.target.value)} />
            </div>

            <div className="col-span-12 space-y-1.5 pt-2">
              <Label>Odometer Reading (KM/MI)</Label>
              <div className="relative">
                <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="number"
                  className="pl-10"
                  value={vehicleData.odometer}
                  onChange={(e) => handleChange("odometer", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2 text-primary">
            <User className="h-4 w-4" />
            <h2 className="text-sm font-bold uppercase tracking-tight">Customer Information</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Customer Name</Label>
              <Input value={vehicleData.customer} onChange={(e) => handleChange("customer", e.target.value)} />
            </div>

            <div className="space-y-1.5">
              <Label>Contact Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="email"
                  className="pl-10"
                  value={vehicleData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
               <div className="space-y-1.5">
                 <Label>Reference (PO#)</Label>
                 <Input placeholder="Optional" />
               </div>
               <div className="space-y-1.5">
                 <Label>Fleet ID</Label>
                 <Input disabled className="bg-muted/50" value={vehicleData.unit} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}