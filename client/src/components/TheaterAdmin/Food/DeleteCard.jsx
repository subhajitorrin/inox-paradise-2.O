import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useTheaterAdmin from "@/store/TheaterAdmin";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

export function DeleteCard({ delOpen, setDelOpen, delData, setDelData }) {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteFood } = useTheaterAdmin();

  async function handleDelete() {
    try {
      setIsLoading(true);
      await deleteFood(delData._id);
      setDelOpen(false);
      setDelData(null);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog open={delOpen} onOpenChange={setDelOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="bg-black hover:bg-[#282828]"
            variant="destructive"
            onClick={handleDelete}
          >
            {isLoading === true ? (
              <BeatLoader color="#ffffff" size={5} />
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
