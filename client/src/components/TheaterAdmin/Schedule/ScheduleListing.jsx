import React from "react";
import FilterRow from "./FilterRow";
import useTheaterAdmin from "../../../store/TheaterAdmin";
import ScheduleCard from "./ScheduleCard";
import { BeatLoader } from "react-spinners";
import Loader from "./Loader";

function ScheduleListing() {
  const { filteredSchedules, isLoading } = useTheaterAdmin();

  return (
    <div className="h-full w-full py-[5px] px-[10px]">
      <FilterRow />
      <div className="overflow-y-auto w-full scrollNone h-[95%] flex flex-col">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader/>
          </div>
        ) : (
          filteredSchedules &&
          filteredSchedules.map((item, index) => (
            <ScheduleCard schedule={item} key={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default ScheduleListing;
