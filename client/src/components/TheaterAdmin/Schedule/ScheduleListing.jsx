import React from "react";
import FilterRow from "./FilterRow";
import useTheaterAdmin from "../../../store/TheaterAdmin";
import ScheduleCard from "./ScheduleCard"; // Import the ScheduleCard component

function ScheduleListing() {
  const { filteredSchedules } = useTheaterAdmin();

  return (
    <div className="h-full w-full py-[5px] px-[10px]">
      <FilterRow />
      <div className="overflow-y-auto scrollNone h-[95%]">
        {filteredSchedules &&
          filteredSchedules.map((item, index) => (
            <ScheduleCard schedule={item} key={index} />
          ))}
      </div>
    </div>
  );
}

export default ScheduleListing;
