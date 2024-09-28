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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useUser } from "@/store/User";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

function Login() {
  const { setIsLogin, login } = useUser();
  const [loginMethod, setLoginMethod] = useState("email");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loginMethod === "email") {
      if (!email || !password) {
        toast.warn("Fill all the fields");
        return;
      }
      try {
        setIsLoading(true);
        await login(email, password);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    } else {
      //
    }
  };

  const handleSendOTP = (event) => {
    event.preventDefault();
    console.log("OTP sent");
    setOtpSent(true);
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
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={loginMethod}
            onValueChange={setLoginMethod}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="otp">OTP</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <h2 className="text-lg font-semibold mb-4">Login with Email</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login with Password
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="otp">
              <h2 className="text-lg font-semibold mb-4">Login with OTP</h2>
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otpEmail">Email</Label>
                    <Input
                      id="otpEmail"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send OTP
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <Button variant="link" className="text-sm">
            Forgot password?
          </Button>
          <div className="text-sm text-center flex gap-[10px] items-center">
            Don&apos;t have an account?{" "}
            <div
              onClick={() => setIsLogin(false)}
              className="font-medium text-primary hover:underline cursor-pointer"
            >
              Register here
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
