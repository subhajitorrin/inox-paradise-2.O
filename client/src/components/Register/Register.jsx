import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "@/store/User";

function Register() {
  const { setIsLogin } = useUser();
  const [registerStep, setRegisterStep] = useState("email"); // State for controlling steps
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = (event) => {
    event.preventDefault();
    toast.success("OTP sent");
    setOtpSent(true);
    setRegisterStep("otp"); // Set to 'otp' step when OTP is sent
  };

  const handleVerifyOTP = (event) => {
    event.preventDefault();
    console.log("OTP verified");
    setRegisterStep("name"); // Set to 'name' step when OTP is verified
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Registration form submitted");
  };

  return (
    <div className="bg-[#00000049] flex items-center justify-center z-[100] fixed w-full h-screen transition-all ease-linear duration-200 backdrop-filter backdrop-blur-[5px]">
      <Card className="w-[400px] mx-auto">
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
                  <Label htmlFor="registerEmail">Email</Label>
                  <Input
                    id="registerEmail"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerPassword">Password</Label>
                  <Input
                    id="registerPassword"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send OTP
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
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter the OTP sent to your email"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Verify OTP
                </Button>
              </form>
            </TabsContent>
            {/* Name Input Step */}
            <TabsContent value="name">
              {" "}
              {/* Final step for entering name */}
              <h2 className="text-lg font-semibold mb-4">Enter Your Name</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Register
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
