import { Suspense } from "react";
import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { InsightsSection } from "@/components/insights-section";

const DashboardPage = () => {
  return (
    <Suspense fallback={null}>
      <div className="space-y-8">
        <DataGrid />
        <DataCharts />
        <InsightsSection />
      </div>
    </Suspense>
  );
};

export default DashboardPage;
