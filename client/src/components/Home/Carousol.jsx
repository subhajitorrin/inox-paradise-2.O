import React, { useEffect, useRef, useState } from "react";
import { useMobile } from "../../store/ScreenWidth";

function Carousol() {
  const sliderRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carousolList, setCarousolList] = useState([
    "https://res.cloudinary.com/orrin/image/upload/v1723224616/5_ivc7si.jpg",
    "https://res.cloudinary.com/orrin/image/upload/v1723224616/1_na4rzn.jpg",
    "https://res.cloudinary.com/orrin/image/upload/v1723224616/2_stxhj5.jpg",
    "https://res.cloudinary.com/orrin/image/upload/v1723224616/3_ley4h8.jpg",
    "https://res.cloudinary.com/orrin/image/upload/v1723224616/4_oagr6s.jpg",
    "https://res.cloudinary.com/orrin/image/upload/v1723224616/6_nudwvi.jpg",
    "https://res.cloudinary.com/orrin/image/upload/v1723224616/5_ivc7si.jpg",
    "https://res.cloudinary.com/orrin/image/upload/v1723224616/1_na4rzn.jpg"
  ]);
  const { isMobile } = useMobile();

  useEffect(() => {
    sliderRefs.current.forEach((item, index) => {
      item.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? carousolList.length - 3 : prevSlide - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === carousolList.length - 3 ? 0 : prevSlide + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === carousolList.length - 3 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [carousolList.length]);

  return (
    <div className="w-full overflow-x-hidden relative">
      <div className="h-full w-full absolute flex justify-center items-end pb-[2rem]">
        <div className="flex gap-[5px] z-[10]">
          {carousolList.map((item, index) => {
            if (index > 0 && index < carousolList.length - 1) {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor:
                      currentSlide === index - 1 ? "white" : "grey"
                  }}
                  className="h-[7px] w-[7px] rounded-[100%]"
                ></div>
              );
            }
          })}
        </div>
      </div>
      <div
        className={`${
          isMobile ? "left-[-91%] h-[250px]" : "left-[-71.5%] h-[300px]"
        }  my-[1rem] flex relative`}
      >
        {carousolList.map((item, index) => {
          return (
            <div
              ref={(el) => (sliderRefs.current[index] = el)}
              className={`${
                isMobile ? "min-w-[94%]" : "min-w-[81%]"
              }  px-[10px] transition-all ease-linear duration-300  rounded-[5px] overflow-hidden`}
              key={index}
            >
              <div
                className="h-full w-full object-cover rounded-[10px]"
                style={{
                  background: `url("${item}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "cover",
                  backgroundRepeat: "no-repeat"
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousol;
