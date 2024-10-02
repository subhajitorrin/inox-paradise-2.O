import { MdOutlineStarPurple500 } from "react-icons/md";

export default function ReviewCard({
  reviewerName = "John Doe",
  rating = 8,
  description = "This movie was fantastic! The plot kept me engaged throughout, and the acting was superb. I highly recommend it to anyone who enjoys a good thriller.",
  date = "2023-05-15"
}) {
  return (
    <div className="p-[20px] flex flex-col gap-[5px]">
      <div className="flex justify-between items-center ">
        <h2 className="text-[100%] font-bold text-gray-800">{reviewerName}</h2>
        {date && (
          <span className="text-sm text-gray-500 font-[500]">{date}</span>
        )}
      </div>
      <div className="flex items-center font-[500]  text-[85%]">
        <MdOutlineStarPurple500 className="text-[18px] text-[#F84464] relative top-[1px]" />
        <span className="ml-2 text-gray-600 flex items-center gap-[5px]">
          {rating}/10
        </span>
      </div>
      <p className="text-gray-600 text-[85%] leading-relaxed">{description}</p>
    </div>
  );
}
