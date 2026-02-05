// Dropdown.service.js
const GENERATED_UNITS = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  unit: `U-${100 + i}`,
  make: i % 2 === 0 ? "Freightliner" : "Kenworth",
  model: i % 2 === 0 ? "Cascadia" : "T680",
  customer: `Logistics Co ${i + 1}`,
  vin: `1FVAC${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
}));

export const DropdownService = {
  getDropdownData: async (dropdownName, { page = 1, limit = 20, query = "" }) => {
    await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate lag

    let source = dropdownName === "units" ? GENERATED_UNITS : [];

    const filtered = source.filter((item) =>
      Object.values(item).some((v) => 
        v.toString().toLowerCase().includes(query.toLowerCase())
      )
    );

    const startIndex = (page - 1) * limit;
    return {
      items: filtered.slice(startIndex, startIndex + limit),
      hasMore: startIndex + limit < filtered.length,
      totalCount: filtered.length
    };
  },
};