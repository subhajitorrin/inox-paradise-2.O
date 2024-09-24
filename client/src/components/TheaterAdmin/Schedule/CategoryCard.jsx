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
          // Calculate gaps before the current seat
          const gapCount = gaps.filter((gapIndex) => gapIndex === index).length;

          // Create gap elements
          const gapElements = Array.from(
            { length: gapCount },
            (_, gapIndex) => (
              <div
                className="h-[20px] border border-[#ff005100] w-[20px] bg-transparent"
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
        })}

        {/* Handle gaps after the last seat */}
        {gaps.includes(row.seats.length) &&
          Array.from({
            length: gaps.filter((gapIndex) => gapIndex === row.seats.length)
              .length
          }).map((_, gapIndex) => (
            <div
              className="h-[20px] border border-[#ff005100] w-[20px] bg-transparent"
              key={`gap-end-${gapIndex}`}
            ></div>
          ))}
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
        <div className="flex flex-col gap-[2px]">
          {category.layout.map((item, index) => {
            return <Row key={index} row={item} gaps={category.gaps} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
