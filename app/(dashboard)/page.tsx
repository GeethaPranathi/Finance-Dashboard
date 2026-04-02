import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { InsightsSection } from "@/components/insights-section";

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <DataGrid />
      <DataCharts />
      <InsightsSection />
    </div>
  );
};

export default DashboardPage;
