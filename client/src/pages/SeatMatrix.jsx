import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useMovie from "../store/Movie";

function SeatMatrix() {
  const { scheduleid } = useParams();
  const { seatMatrix, getSeatMatrix } = useMovie();

  useEffect(() => {
    if (scheduleid) {
      getSeatMatrix(scheduleid);
    }
  }, [getSeatMatrix, scheduleid]);

  useEffect(() => {
    console.log(seatMatrix);
  }, [seatMatrix]);

  return <div>{scheduleid}</div>;
}

export default SeatMatrix;
