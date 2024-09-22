import { useEffect } from "react";

function ViewSeatMatrix({ screen }) {
  useEffect(() => {
    console.log(screen);
  }, [screen]);

  return <div className="h-full w-full"></div>;
}

export default ViewSeatMatrix;
