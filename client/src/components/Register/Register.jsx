import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs"; // Ensure TabsContent is imported
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useUser } from "@/store/User";
import { RxCross2 } from "react-icons/rx";
import { BeatLoader } from "react-spinners";

function Register() {
  const { setIsLogin, sendOtp, veirfyOtp } = useUser();
  const [registerStep, setRegisterStep] = useState("email"); // State for controlling steps
  const [otpSent, setOtpSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputedOtp, setInputedOtp] = useState("");
  const [otpId, setOtpId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (event) => {
    event.preventDefault();
    if (!email || !password || !name) {
      toast.warn("Fill all the fields");
      return;
    }
    try {
      setIsLoading(true);
      const data = await sendOtp(email, password, name);
      setOtpId(data.otpId);
      setOtpSent(true);
      setRegisterStep("otp");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    if (!inputedOtp.trim()) {
      toast.warn("Fill OTP");
      return;
    }
    try {
      if (!otpId || !email || !password || !name) throw new Error("Resend OTP");
      setIsLoading(true);
      await veirfyOtp(email, password, otpId, inputedOtp,name);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#00000049] flex items-center justify-center z-[100] fixed w-full h-screen transition-all ease-linear duration-200 backdrop-filter backdrop-blur-[5px]">
      <Card className="w-[400px] mx-auto relative">
        <span
          onClick={() => setIsLogin(null)}
          className="text-[20px] absolute top-[15px] right-[15px] cursor-pointer"
        >
          <RxCross2 />
        </span>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={registerStep} className="w-full">
            {" "}
            {/* Controlled Tabs using registerStep */}
            {/* Email and Password Step */}
            <TabsContent value="email">
              {" "}
              {/* First step for email and password */}
              <h2 className="text-lg font-semibold mb-4">
                Register with Email
              </h2>
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerEmail">Email</Label>
                  <Input
                    id="registerEmail"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerPassword">Password</Label>
                  <Input
                    id="registerPassword"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading === true ? (
                    <BeatLoader color="#ffffff" size={5} />
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </form>
            </TabsContent>
            {/* OTP Step */}
            <TabsContent value="otp">
              {" "}
              {/* Second step for OTP verification */}
              <h2 className="text-lg font-semibold mb-4">Verify OTP</h2>
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter the OTP sent to your email"
                    required
                    value={inputedOtp}
                    onChange={(e) => setInputedOtp(e.target.value)}
                  />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading === true ? (
                    <BeatLoader color="#ffffff" size={5} />
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <div className="text-sm text-center flex gap-[10px] items-center">
            Already have an account?
            <div
              onClick={() => setIsLogin(true)}
              className="font-medium text-primary hover:underline cursor-pointer"
            >
              Login here
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
