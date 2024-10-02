import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

export function WriteReview({ toggle, setToggle }) {
  return (
    <Dialog open={toggle} onOpenChange={setToggle}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your thoughts on the movie. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex-col flex ">
            <Label htmlFor="star-rating" className=" mb-[10px]">
              Star Rating (1-10)
            </Label>
            <Input
              type="number"
              id="star-rating"
              min="1"
              max="10"
              className=""
              placeholder="Enter rating"
            />
          </div>
          <Textarea placeholder="Write your review here..." className />
        </div>
        <DialogFooter>
          <Button type="submit">Add Review</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
