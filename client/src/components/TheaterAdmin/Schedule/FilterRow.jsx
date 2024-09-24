import React, { useState, useEffect } from "react";
import useTheaterAdmin from "../../../store/TheaterAdmin";

const timing = ["Sort by start time", "Sort by end time"];

function FilterRow() {
  const { getFilteredSchedules } = useTheaterAdmin();
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [sort, setSort] = useState(timing[0].toLocaleLowerCase());

  useEffect(() => {
    if (date && sort) {
      getFilteredSchedules({ date, sort });
    }
  }, [date, sort]);

  return (
    <div className="w-full h-[40px] flex justify-between items-center">
      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-[10px] py-[2px] bg-transparent rounded-[5px] outline-none"
        />
      </div>
      <div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 bg-transparent rounded-lg outline-none"
        >
          {timing.map((item, index) => {
            return (
              <option
                className="bg-[#302f2f] px-[10px]"
                key={index}
                value={item.toLowerCase()}
              >
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default FilterRow;
