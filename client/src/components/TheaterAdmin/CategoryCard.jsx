import React, { useEffect } from "react";

function CategoryCard({ category }) {
  useEffect(() => {
    console.log(category);
  }, [category]);
  return (
    <div className="h-full w-full relative">
      <div className="flex justify-center w-full absolute bottom-[5px]">
        <p className="border-x border-t px-[2rem] py-[2px] rounded-[5px]">
          Screen here
        </p>
      </div>
    </div>
  );
}

export default CategoryCard;
