import React, { useEffect } from "react";
import Seat from "./Seat";

function Row({ row }) {
  return (
    <div className="flex items-center">
      <p className="uppercase w-[20px] font-[500] text-[12px] absolute left-[10px]">
        {row.row}
      </p>
      <div className="flex gap-[5px]">
        {row.seats.map((item, index) => {
          return <Seat key={index} seat={item} />;
        })}
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  return (
    <div className="h-full w-full relative p-[5px]">
      <div className="flex items-center flex-col">
        <p className="text-center text-[12px] font-[500] mb-[2px]">
          {category.name} ₹{category.price}
        </p>
        {category.layout.map((item, index) => {
          console.log(item);
          return <Row key={index} row={item} />;
        })}
      </div>
    </div>
  );
}

export default CategoryCard;
