import React, { useEffect, useState } from "react";
import Seat from "./Seat";

function Row({ row, gaps }) {
  return (
    <div className="flex items-center">
      <p className="uppercase w-[20px] font-[500] text-[12px] absolute left-[10px]">
        {row.row}
      </p>
      <div className="flex gap-[5px]">
        {row.seats.map((item, index) => {
          const gapCount = gaps.filter((gapIndex) => gapIndex === index).length;
          if (gapCount > 0) {
            const gapElements = Array.from(
              { length: gapCount },
              (_, gapIndex) => (
                <div
                  className="h-[20px] w-[20px] bg-transparent"
                  key={`gap-${index}-${gapIndex}`}
                ></div>
              )
            );

            return (
              <React.Fragment key={index}>
                {gapElements}
                <Seat seat={item} />
              </React.Fragment>
            );
          }
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
          return <Row key={index} row={item} gaps={category.gaps} />;
        })}
      </div>
    </div>
  );
}

export default CategoryCard;
