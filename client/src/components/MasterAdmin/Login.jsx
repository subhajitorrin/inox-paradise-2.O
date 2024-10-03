import { useState } from "react";
import useMasterAdmin from "../../store/MasterAdmin";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { BeatLoader } from "react-spinners";

function Login() {
  const loginMasterAdmin = useMasterAdmin((state) => state.loginMasterAdmin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await loginMasterAdmin(email, password);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#111111] ">
      {/* <Card className="w-full max-w-md mx-auto ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Master Admin Login
          </CardTitle>
          <CardDescription className="text-center ">
            Enter your credentials to access the movie ticket booking admin
            panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled={isLoading}
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className=""
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  disabled={isLoading}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? <BeatLoader color="#ffffff" size={5} /> : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button disabled={isLoading} variant="link" className="text-sm">
            Forgot Password?
          </Button>
        </CardFooter>
      </Card> */}
      <Card className="w-full max-w-md mx-auto bg-[#2B2B2B] text-white border border-transparent">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Master Admin Login
          </CardTitle>
          <CardDescription className="text-center text-[#cacaca]">
            Enter your credentials to access the movie ticket booking admin
            panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <input
                className="bg-[#424242] w-full border border-[#00000057] outline-none rounded-[6px] h-[50px] px-[20px]"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
                placeholder="Enter admin email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <input
                  className="bg-[#424242] w-full border border-[#00000057] outline-none rounded-[6px] h-[50px] px-[20px]"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  disabled={isLoading}
                  placeholder="Enter admin email"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#DD3C3C] hover:bg-[#c03535] "
            >
              {isLoading ? <BeatLoader color="#ffffff" size={5} /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
