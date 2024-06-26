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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const uploads = Object.entries(formData).map(
      async ([key, file]: [string, File]) => {
        const storageRef = ref(storage, `uploads/${user.uid}/${key}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
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

    try {
      const results = await Promise.all(uploads);
      const uploadedFiles = results.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      );
      console.log("Uploaded files:", uploadedFiles);
      router.push("/PaymentPlatform");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="bg-gray-100 space-y-4">
      <h1>Upload Documents</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="passport">Upload Your Passport</Label>
        <Input
          id="passport"
          type="file"
          name="passportUpload"
          onChange={handleFileChange}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="transcript">Upload your Transcript</Label>
        <Input
          id="transcript"
          type="file"
          name="transcriptUpload"
          onChange={handleFileChange}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="diploma">Upload your Diploma</Label>
        <Input
          id="diploma"
          type="file"
          name="diplomaUpload"
          onChange={handleFileChange}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="cv">Upload your CV</Label>
        <Input
          id="cv"
          type="file"
          name="cvupload"
          onChange={handleFileChange}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="letter">Upload your Reference Letter</Label>
        <Input
          id="letter"
          type="file"
          name="letterUpload"
          onChange={handleFileChange}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="photo">Upload your Photo</Label>
        <Input
          id="photo"
          type="file"
          name="photoUpload"
          onChange={handleFileChange}
        />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default FormUpload;
