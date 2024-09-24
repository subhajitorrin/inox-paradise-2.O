import React from "react";
import CategoryCard from "./CategoryCard";

function SeatMatrix({ screen, isLoading }) {
  return (
    <>
      {isLoading ? (
        // <SeatLoader />
        <></>
      ) : (
        <div className="relative w-full h-full pb-[3rem]">
          <div>
            {screen.category.map((item, index) => {
              return <CategoryCard category={item} key={index} />;
            })}
          </div>
          <div className="flex justify-center w-full absolute bottom-[5px]">
            <p className="border-x border-t px-[20%] py-[2px] rounded-[5px] text-[10px]">
              Screen here
            </p>
          </div>
          <p className="text-end w-full absolute bottom-[10px] right-[10px] text-[80%] font-[500]">
            {screen.screenName}
          </p>
        </div>
      )}
    </>
  );
}

export default SeatMatrix;
