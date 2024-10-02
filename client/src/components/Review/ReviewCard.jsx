import { MdOutlineStarPurple500 } from "react-icons/md";

export default function ReviewCard({ item }) {
  return (
    <div className="p-[20px] flex flex-col gap-[5px]">
      <div className="flex justify-between items-center ">
        <h2 className="text-[100%] font-bold text-gray-800">{item.name}</h2>
        <span className="text-sm text-gray-500 font-[500]">
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </span>
      </div>
      <div className="flex items-center font-[500]  text-[85%]">
        <MdOutlineStarPurple500 className="text-[18px] text-[#F84464] relative top-[1px]" />
        <span className="ml-2 text-gray-600 flex items-center gap-[5px]">
          {item.rating}/10
        </span>
      </div>
      <p className="text-gray-600 text-[85%] leading-relaxed">{item.comment}</p>
    </div>
  );
}
