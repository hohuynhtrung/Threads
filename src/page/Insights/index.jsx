import InsightOverview from "@/page/Insights/components/InsightOverview";
import InsightSidebar from "@/page/Insights/components/InsightSidebar";

function Insights() {
  return (
    <div className="w-full flex ml-37.5">
      <div className="w-[40%]">
        <InsightSidebar />
      </div>
      <div className="w-[60%]">
        <InsightOverview />
      </div>
    </div>
  );
}

export default Insights;
