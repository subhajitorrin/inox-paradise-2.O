import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

function ViewSeatMatrix({ screen }) {
  return (
    <div className="h-full w-full">
      {screen.category.map((item, index) => {
        return <CategoryCard category={item} key={index} />;
      })}
    </div>
  );
}

export default ViewSeatMatrix;
