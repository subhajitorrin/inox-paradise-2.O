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
import useUser from "@/store/User";
import useMovie from "@/store/Movie";
import { useState } from "react";
import { toast } from "react-toastify";

export function WriteReview({ toggle, setToggle, movieid }) {
  const [star, setstar] = useState("");
  const [text, settext] = useState("");
  const { addReview } = useUser();
  const { getReviews } = useMovie();
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddReview() {
    if (star == "" || text == "") {
      toast.error("Fill all the fields");
      return;
    }
    try {
      setIsLoading(true);
      await addReview(star, text, movieid);
      await getReviews(movieid);
      setstar("");
      settext("");
      setToggle(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
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
              disabled={isLoading}
              value={star}
              onChange={(e) => {
                if (
                  (e.target.value <= 10 && e.target.value >= 1) ||
                  e.target.value == ""
                ) {
                  setstar(e.target.value);
                }
              }}
              type="number"
              id="star-rating"
              min="1"
              max="10"
              className=""
              placeholder="Enter rating"
            />
          </div>
          <Textarea
            disabled={isLoading}
            placeholder="Write your review here..."
            className
            onChange={(e) => settext(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button disabled={isLoading} onClick={handleAddReview}>
            Add Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
