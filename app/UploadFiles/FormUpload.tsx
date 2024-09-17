"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { auth, storage } from "@/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

const FormUpload = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleFileChange = (event: any) => {
    const fieldName = event.target.name;
    const file = event.target.files[0];
    setFormData((prevState: any) => ({
      ...prevState,
      [fieldName]: file,
    }));
  };

  const handleFileUploads = async (
    formData: { [key: string]: File },
    user: { uid: string }
  ) => {
    try {
      const uploadPromises = Object.entries(formData).map(
        ([key, file]: [string, File]) => {
          const storageRef = ref(storage, `uploads/${user.uid}/${key}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          return new Promise<{ [key: string]: string }>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
              },
              (error) => {
                console.error("Upload failed:", error);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve({ [key]: downloadURL });
                });
              }
            );
          });
        }
      );

      const results = await Promise.all(uploadPromises);
      const downloadURLs = results.reduce(
        (acc, cur) => ({ ...acc, ...cur }),
        {}
      );

      router.push("/Board");

      return downloadURLs;
    } catch (error) {
      console.error("Failed to upload files:", error);
      throw error;
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    try {
      await handleFileUploads(formData, user);
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <div className="bg-gray-100 space-y-4 ">
      <div className="m-8 gap-2">
        <h1>Upload Documents</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="passport">Upload Your Passport</Label>
            <Input
              className="gap-2"
              id="passport"
              type="file"
              name="passportUpload"
              onChange={handleFileChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="transcript">Upload your Transcript</Label>
            <Input
              className="gap-2"
              id="transcript"
              type="file"
              name="transcriptUpload"
              onChange={handleFileChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="diploma">Upload your Diploma</Label>
            <Input
              className="gap-2"
              id="diploma"
              type="file"
              name="diplomaUpload"
              onChange={handleFileChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="cv">Upload your CV</Label>
            <Input
              className="gap-2"
              id="cv"
              type="file"
              name="cvUpload"
              onChange={handleFileChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="letter">Upload your Reference Letter</Label>
            <Input
              className="gap-2"
              id="letter"
              type="file"
              name="letterUpload"
              onChange={handleFileChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="photo">Upload your Photo</Label>
            <Input
              className="gap-2"
              id="photo"
              type="file"
              name="photoUpload"
              onChange={handleFileChange}
            />
          </div>
          <Button className="m-4 bg-yellow-600" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormUpload;
