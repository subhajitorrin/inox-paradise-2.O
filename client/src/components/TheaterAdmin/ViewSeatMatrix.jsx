import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import SeatLoader from "./SeatLoader";

function ViewSeatMatrix({ screen, isLoading }) {
  return (
    // Use parentheses instead of curly braces
    <>
      {isLoading ? (
        <SeatLoader />
      ) : (
        <div className="relative w-full h-full pb-[3rem]">
          <div>
            {screen.category.map((item, index) => {
              return <CategoryCard category={item} key={index} />;
            })}
          </div>
          <div className="flex justify-center w-full absolute bottom-[5px]">
            <p className="border-x border-t px-[2rem] py-[2px] rounded-[5px] text-[10px]">
              Screen here
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewSeatMatrix;
