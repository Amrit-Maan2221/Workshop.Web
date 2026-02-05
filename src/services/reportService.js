// services/ReportService.js
import apiClient from './apiClient';

class ReportService {
  /**
   * Generates dummy data following strict POCO key naming:
   * [prefix][FieldName]
   */
  static getDummyData(page, pageSize) {
    const start = (page - 1) * pageSize;
    
    return Array.from({ length: pageSize }, (_, i) => ({
      idRecord: start + i + 1,
      vcName: `Workshop Item ${start + i + 1}`,
      vcCategory: i % 2 === 0 ? "Maintenance" : "Repair",
      intQuantity: Math.floor(Math.random() * 50) + 1,
      dtCreatedAt: new Date().toISOString(),
      datScheduleDate: "2026-02-04",
      vcStatus: "Active"
    }));
  }

  /**
   * Fetches report data from API or returns dummy POCO array
   */
  static async fetchReportData(report, { page, pageSize, query, sort, filters }) {
    try {
      // Logic for real API call (Currently bypassed for dummy data)
      /*
      const response = await apiClient.get(report, {
        params: {
          pageNumber: page,
          pageSize,
          searchT: query,
          sortBy: sort?.column,
          sortOrder: sort?.direction,
          filters: filters ? JSON.stringify(filters) : null,
        },
      });
      return response?.data?.items ?? response?.data?.Items ?? [];
      */

      // Simulated network delay
      await new Promise(resolve => setTimeout(resolve, 400));

      // Return the array of POCO objects
      return this.getDummyData(page, pageSize);

    } catch (error) {
      console.error("ReportService Error:", error);
      throw error;
    }
  }
}

export default ReportService;