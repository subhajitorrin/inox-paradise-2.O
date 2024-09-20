import React from "react";
import { IoIosArrowBack } from "react-icons/io";

function UpdatePage({ setIsUpdatePage }) {
  return (
    <div className="h-full w-full">
      <IoIosArrowBack
        onClick={() => {
          sessionStorage.removeItem("isUpdatePage");
          setIsUpdatePage(false);
        }}
        className="text-[20px] cursor-pointer"
      />
    </div>
  );
}

export default UpdatePage;
