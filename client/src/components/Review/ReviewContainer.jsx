import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import ReviewCard from "./ReviewCard";
import useMovie from "@/store/Movie";

export function ReviewContainer() {
  const { getReviews, reviews } = useMovie();
  React.useEffect(() => {
    getReviews();
  }, []);
  return reviews.length > 0 ? (
    <Carousel className="w-full mt-[10px]">
      <CarouselContent className="w-[500px] ">
        {reviews.map((item, index) => {
          return (
            <CarouselItem key={index} className="">
              <div className=" border">
                <ReviewCard item={item} />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ) : (
    <div className="">
      <p className="text-[85%] font-[500] text-center">
        *Write the first review
      </p>
    </div>
  );
}
