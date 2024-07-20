import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, firestore } from "@/firebase/firebase"; // Ensure auth is properly exported
import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const DialogButton = () => {
  const [picture, setPicture] = useState<File | null>(null);
  const [bio, setBio] = useState<string>("");
  const [user] = useAuthState(auth);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPicture(file);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleSubmit = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `profile-pictures/${user.uid}`);

      if (picture) {
        await uploadBytes(storageRef, picture);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Uploaded a file and got the download URL:", downloadURL);

        // Here you would typically update the user's profile in your database with the downloadURL and bio
        // For example, using Firestore:
        const userDocRef = doc(firestore, "users", user.uid);
        await updateDoc(userDocRef, { bio, profilePicture: downloadURL });

        console.log("Profile updated with bio and picture");
        window.location.reload();
      } else {
        console.log("No picture to upload");
      }
    } catch (error) {
      console.error("Failed to upload file and update profile:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">
              Picture
            </Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={handleBioChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogButton;
