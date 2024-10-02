import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Mail } from "lucide-react";

function TheaterCard1({ item }) {
  return (
    <Card className="w-full max-w-full bg-[#2f2d2d] text-white border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-300">{item.address}</p>
        <div className="flex items-center">
          <p className="text-xs text-gray-400">{item.city}</p>
        </div>
        <div className="flex items-center text-xs text-[#d0d0d0]">
          <Mail className="w-3 h-3 mr-1 " />
          {item.email}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-black hover:bg-[#c7c7c7] bg-[#ffffff] transition-colors"
          //   onClick={item.onUpdate}
        >
          Update
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="bg-red-900 hover:bg-red-800 transition-colors"
          //   onClick={item.onDelete}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TheaterCard1;
