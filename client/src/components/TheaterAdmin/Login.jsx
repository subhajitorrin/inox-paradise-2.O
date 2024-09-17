import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useTheaterAdmin from "../../store/TheaterAdmin";

function Login() {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpid, setOtpid] = useState("");
  const { sendOtpForTheaterRegistration } = useTheaterAdmin();

  async function handleSendOtp() {
    if (!email || !password) {
      toast.warn("Fill all the fields!");
      return;
    }
    try {
      setIsLoading(true);
      const otpid = await sendOtpForTheaterRegistration(email, password);
      setOtpid(otpid);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#111111]">
      <div className="h-[550px] w-[450px] text-white bg-[#2b2b2b] border border-black rounded-[10px] p-[2rem] flex flex-col justify-between py-[3rem] select-none">
        <p className="text-[30px] font-bold text-center uppercase">
          Theater Admin Login
        </p>
        <div className="flex flex-col gap-[1rem]">
          <div className="">
            <p className="text-[15px] mb-[7px] font-[500]">Email</p>
            <input
              className="bg-[#424242] w-full border border-[#00000057] outline-none rounded-[6px] h-[50px] px-[20px]"
              type="text"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              value={email}
              placeholder="Enter admin email"
            />
          </div>
          <div className="">
            <p className="text-[15px] mb-[7px] font-[500]">Password</p>
            <input
              className="bg-[#424242] w-full border border-[#00000057] outline-none rounded-[6px] h-[50px] px-[20px]"
              type="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              value={password}
              placeholder="Enter admin password"
            />
          </div>
        </div>
        <div className="">
          <button
            onClick={handleSendOtp}
            className="w-full bg-[#dd3c3c] py-[8px] text-white font-[500] rounded-[5px]"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
