import TopSection from "./TopSection";
import FoodBodySection from "./FoodBodySection";

function Food() {
  return (
    <div className="flex flex-col h-full w-full p-[10px]">
      <TopSection />
      <div className="flex-1 mt-[10px] overflow-y-auto scrollNone">
        <FoodBodySection />
      </div>
    </div>
  );
}

export default Food;
