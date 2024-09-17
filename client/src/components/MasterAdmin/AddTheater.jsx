import React, { useEffect, useState } from "react";
import useMasterAdmin from "../../store/MasterAdmin";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import TheaterCard from "./TheaterCard";

function AddTheater() {
  const [theaterName, setTheaterName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setcity] = useState("");
  const [password, setPassword] = useState("");
  const [address, setaddress] = useState("");
  const [otp, setOtp] = useState("");
  const [toggleOtpVerify, setToggleOtpVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpId, setOtpId] = useState("");

  const {
    sendOtpForTheaterRegistration,
    addTheater,
    getAllTheaters,
    theaters
  } = useMasterAdmin();

  useEffect(() => {
    getAllTheaters();
  }, []);

  async function handleAddNewTheater(e) {
    e.preventDefault();
    if (otpId === "" || otp.trim() === "") {
      toast.warn("Fill OTP!");
      return;
    }
    try {
      setIsLoading(true);
      const res = await addTheater(
        email,
        password,
        address,
        city,
        theaterName,
        otpId,
        otp.trim()
      );
      toast.success("Theater added successfully");
      setToggleOtpVerify(false);
      setOtpId("");
      setOtp("");
      setEmail("");
      setPassword("");
      setTheaterName("");
      setaddress("");
      setcity("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendOtp(e) {
    e.preventDefault();
    if (!theaterName || !email || !password || !address || !city) {
      toast.warn("Fill all the fields!");
      return;
    }
    try {
      setIsLoading(true);
      const res = await sendOtpForTheaterRegistration(email, theaterName);
      setToggleOtpVerify(true);
      setOtpId(res);
      toast.success("Otp send successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-full flex">
      <div className="h-full border-r border-[#ffffff27] p-[20px] ">
        <form
          onSubmit={handleAddNewTheater}
          className="w-[350px] gap-[20px] py-[1.5rem] p-[20px] rounded-[10px] bg-[#353333] flex justify-center items-center flex-col"
        >
          <h2 className="text-[20px] font-[500] text-center mb-[.5rem]">
            Add new theater
          </h2>
          <div className="flex gap-[10px] text-[14px] items-center justify-between w-full ">
            <label htmlFor="theatername" className=" font-[500]">
              Theater name
            </label>
            <input
              onChange={(e) => {
                setTheaterName(e.target.value);
              }}
              value={theaterName}
              style={{
                color: toggleOtpVerify ? "#ffffff7e" : "white",
                pointerEvents: toggleOtpVerify ? "none" : "auto"
              }}
              type="text"
              placeholder="Theater name"
              id="theatername"
              required
              className="bg-[#2a2828] w-[200px] py-[5px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
            />
          </div>
          <div className="flex gap-[10px] text-[14px] items-center justify-between w-full ">
            <label htmlFor="theatercity" className=" font-[500]">
              City
            </label>
            <input
              onChange={(e) => {
                setcity(e.target.value);
              }}
              value={city}
              style={{
                color: toggleOtpVerify ? "#ffffff7e" : "white",
                pointerEvents: toggleOtpVerify ? "none" : "auto"
              }}
              type="text"
              placeholder="City"
              id="theatercity"
              required
              className="bg-[#2a2828] w-[200px] py-[5px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
            />
          </div>
          <div className="flex text-[14px] gap-[10px] items-center justify-between w-full">
            <label htmlFor="theateraddress" className=" font-[500]">
              Address
            </label>
            <textarea
              onChange={(e) => {
                setaddress(e.target.value);
              }}
              value={address}
              style={{
                color: toggleOtpVerify ? "#ffffff7e" : "white",
                pointerEvents: toggleOtpVerify ? "none" : "auto"
              }}
              type="text"
              placeholder="Theater address"
              id="theateraddress"
              required
              rows={3}
              className="bg-[#2a2828] resize-none w-[200px] py-[5px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
            />
          </div>
          <div className="flex gap-[10px] text-[14px] items-center justify-between w-full">
            <label htmlFor="adminemail" className=" font-[500]">
              Admin email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              style={{
                color: toggleOtpVerify ? "#ffffff7e" : "white",
                pointerEvents: toggleOtpVerify ? "none" : "auto"
              }}
              type="email"
              placeholder="Admin email"
              id="adminemail"
              required
              className="bg-[#2a2828] py-[5px] w-[200px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
            />
          </div>

          <div className="flex text-[14px] gap-[10px] items-center justify-between w-full">
            <label htmlFor="adminpassword" className="font-[500]">
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              style={{
                color: toggleOtpVerify ? "#ffffff7e" : "white",
                pointerEvents: toggleOtpVerify ? "none" : "auto"
              }}
              type="password"
              placeholder="Admin password"
              id="adminpassword"
              required
              className="bg-[#2a2828] py-[5px] w-[200px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
            />
          </div>
          {toggleOtpVerify && (
            <div className="w-full mt-[1.5rem] ">
              <p className="text-center mb-[10px]">
                Enter otp send to{" "}
                <span className="text-[#ffffff9e]">{email}</span>
              </p>
              <div className=" flex text-[14px] gap-[10px] items-center justify-between w-full">
                <label htmlFor="verifyotp" className="font-[500]">
                  Verify OTP
                </label>
                <input
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  value={otp}
                  type="text"
                  placeholder="Enter otp send to email"
                  id="verifyotp"
                  required
                  className="bg-[#2a2828] py-[5px] w-[200px] px-[20px] outline-none rounded-[5px] border-[#ffffff44]"
                />
              </div>
            </div>
          )}

          {toggleOtpVerify && (
            <p
              onClick={handleSendOtp}
              className="cursor-pointer text-[14px] my-[-10px] text-end w-full"
            >
              Resend otp
            </p>
          )}

          {toggleOtpVerify ? (
            <button
              type="submit"
              style={{ pointerEvents: isLoading ? "none" : "auto" }}
              className="font-[500] w-full bg-[#879601] rounded-[5px] py-[5px]"
            >
              {isLoading ? (
                <BeatLoader color="#ffffff" size={5} />
              ) : (
                "Verify & Add theater"
              )}
            </button>
          ) : (
            <button
              onClick={handleSendOtp}
              style={{ pointerEvents: isLoading ? "none" : "auto" }}
              className="font-[500] w-full bg-[green] rounded-[5px] py-[5px]"
            >
              {isLoading ? (
                <BeatLoader color="#ffffff" size={5} />
              ) : (
                "Add Theater"
              )}
            </button>
          )}
        </form>
      </div>
      <div className="h-full w-full">
        <div className="scrollNone flex flex-wrap gap-[20px] justify-center overflow-y-auto max-h-full p-[1rem]">
          {theaters.map((item, index) => {
            return <TheaterCard key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default AddTheater;
