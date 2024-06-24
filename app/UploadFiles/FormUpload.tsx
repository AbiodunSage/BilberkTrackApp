"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FormUpload = () => {
  const [formData, setFormData] = useState({
    passportUpload: "",
    transcriptUpload: "",
    diplomaUpload: "",
    cvupload: "",
    letterUpload: "",
    photoUpload: "",
    errors: {
      passportUpload: "",
      transcriptUpload: "",
      diplomaUpload: "",
      cvupload: "",
      letterUpload: "",
      photoUpload: "",
    },
  });
  const handleChange = (event: any) => {
    const fieldName = event.target.name;
    const newValue = event.target.value;
    setFormData({
      ...formData,
      [fieldName]: newValue,
    });
  };

  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    router.push("/PaymentPlatform");
    console.log(formData);
  };
  return (
    <div className="bg-gray-100 space-y-4">
      <h1>Upload Documents</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="passport">Upload Your Passport</Label>
        <Input
          id="picture"
          type="file"
          name="passportUpload"
          value={formData.passportUpload}
          onChange={handleChange}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="passport">Upload your Transcript</Label>
        <Input
          id="pdf"
          name="transcriptUpload"
          type="file"
          value={formData.transcriptUpload}
          onChange={handleChange}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="passport">Upload your Diploma</Label>
        <Input
          id="pdf"
          name="diplomaUpload"
          type="file"
          value={formData.diplomaUpload}
          onChange={handleChange}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="passport">Upload your CV</Label>
        <Input
          id="pdf"
          name="cvupload"
          type="file"
          value={formData.cvupload}
          onChange={handleChange}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="passport">Upload your Reference Letter</Label>
        <Input
          id="pdf"
          name="letterUpload"
          type="file"
          value={formData.letterUpload}
          onChange={handleChange}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="passport">Upload your Photo</Label>
        <Input
          id="picture"
          name="photoUpload"
          type="file"
          value={formData.photoUpload}
          onChange={handleChange}
        />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default FormUpload;
