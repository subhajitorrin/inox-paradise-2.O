import { LuArmchair } from "react-icons/lu";
import { BarLoader} from "react-spinners";
import { IoMdHammer } from "react-icons/io";

function SeatLoader() {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-[5px]">
      <div className="relative flex">
        <div className="flex gap-[5px]">
          <LuArmchair className="text-[30px] chair" />
          <LuArmchair className="text-[30px] chair" />
          <LuArmchair className="text-[30px] chair" />
        </div>
        <IoMdHammer className="hammer absolute text-[30px] rotate-[0] top-[-15px] left-[100px]" />
      </div>
      <BarLoader  color="#ffffff" height={1}/>
      <div className="font-[500] text-[.9rem] flex items-center gap-[5px]">
        <p>*Building SeatMatrix</p>
      </div>
    </div>
  );
}

export default SeatLoader;
