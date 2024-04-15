"use client";
import { RadioGroupDemo } from "@/components/RadioGroup";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { SelectDemo } from "@/components/SelectQualification";
import { SelectDegree } from "@/components/SelectDesiredCourse";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Data from "../Database/Data";
import { useRouter } from "next/navigation";

const user = Data;

const FormApply = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneno: "",
    dateofbirth: "",
    emailAddress: "",
    gender: "",
    countryoforigin: "",
    placeofbirth: "",
    parentname: "",
    parentemail: "",
    degreeHave: "",
    diplomatitle: "",
    Scholarshiop: "",
    InstitutionName: "",
    degreePursuit: "",
    graduationYear: "",
    schoolCity: "",
    passportNumber: "",
    passportDate1: "",
    passportDate2: "",
    homeAddress: "",
    ZipCode: "",
    city: "",
    country: "",
    specificCountry: "",
    passportUpload: "",
    transcriptUpload: "",
    diplomaUpload: "",
    cvupload: "",
    letterUpload: "",
    photoUpload: "",
    interestedCountry: "",
    SpecificCountry: "",
    gdprConsent: "",
    errors: {
      firstname: "",
      lastname: "",
      phoneno: "",
      dateofbirth: "",
      emailAddress: "",
      gender: "",
      countryoforigin: "",
      placeofbirth: "",
      parentname: "",
      parentemail: "",
      degreeHave: "",
      diplomatitle: "",
      Scholarshiop: "",
      InstitutionName: "",
      degreePursuit: "",
      graduationYear: "",
      schoolCity: "",
      passportNumber: "",
      passportDate1: "",
      passportDate2: "",
      homeAddress: "",
      ZipCode: "",
      city: "",
      country: "",
      specificCountry: "",
      passportUpload: "",
      transcriptUpload: "",
      diplomaUpload: "",
      cvupload: "",
      letterUpload: "",
      photoUpload: "",
      interestedCountry: "",
      SpecificCountry: "",
      gdprConsent: "",
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
    router.push("/Dashboard");
    console.log(formData);
  };
  return (
    <>
      <div className="bg-gray-200 space-y-4">
        <Input
          type="text"
          placeholder="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
        />
        <Input
          type="numbers"
          name="phoneno"
          placeholder="Phone No/Whatsapp"
          value={formData.phoneno}
          onChange={handleChange}
        />
        <Input
          type="Date"
          placeholder="Date of Birth"
          name="dateofbirth"
          value={formData.dateofbirth}
          onChange={handleChange}
        />

        <Input
          type="Email"
          name="emailAddress"
          placeholder="Email Address"
          value={formData.emailAddress}
          onChange={handleChange}
        />
        <RadioGroupDemo />
        <Input
          type="Text"
          name="countryoforigin"
          placeholder="Country of Origin"
          value={formData.countryoforigin}
          onChange={handleChange}
        />
        <Input
          type="Text"
          name="placeofbirth"
          placeholder="Place of Birth"
          value={formData.placeofbirth}
          onChange={handleChange}
        />
      </div>
      <div className="bg-gray-100 space-y-4">
        <h1>Guardian Info</h1>
        <Input
          type="Text"
          name="parentname"
          placeholder="Parent or Guardian Name"
          value={formData.parentname}
          onChange={handleChange}
        />
        <Input
          type="Text"
          name="parentemail"
          placeholder="Email Address of Guardian "
          value={formData.parentemail}
          onChange={handleChange}
        />
      </div>
      <div className="bg-gray-200 space-y-4">
        <h1>Educational Info</h1>
        <SelectDemo />
        <Input
          type="Text"
          name="diplomatitle"
          placeholder="Title of your Diploma"
          value={formData.diplomatitle}
          onChange={handleChange}
        />
        <div>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">
              Would you like a schorlarship? or Tuition Fee
            </Label>
          </div>
        </div>
        <Input
          type="Text"
          name="InstitutionName"
          placeholder="Name of the Institution "
          value={formData.InstitutionName}
          onChange={handleChange}
        />
        <SelectDegree />
        <Input
          type="Text"
          name="graduationYear"
          placeholder="Graduation Year"
          value={formData.graduationYear}
          onChange={handleChange}
        />
        <Input
          type="Text"
          name="schoolCity"
          placeholder="City, State/Country"
          value={formData.schoolCity}
          onChange={handleChange}
        />
        <div className="bg-gray-100 space-y-4">
          <h1>PassPort Info</h1>
          <Input
            type="Text"
            name="passportNumber"
            placeholder="Passport Number"
            value={formData.passportNumber}
            onChange={handleChange}
          />
          <Input
            type="Date"
            name="passportDate1"
            placeholder="Date of Issue"
            value={formData.passportDate1}
            onChange={handleChange}
          />
          <Input
            type="Date"
            name="passportDate2"
            placeholder="Expiry Date"
            value={formData.passportDate2}
            onChange={handleChange}
          />
        </div>
        <div className="bg-gray-200 space-y-4">
          <h1>Home Address</h1>
          <Input
            type="Text"
            name="homeAddress"
            placeholder="Home Address"
            value={formData.homeAddress}
            onChange={handleChange}
          />
          <Input
            type="Numbers"
            name="ZipCode"
            placeholder="ZipCode"
            value={formData.ZipCode}
            onChange={handleChange}
          />
          <Input
            type="Text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            type="Text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <div className="bg-gray-100 space-y-4">
          <Input
            type="Text"
            name="specificCountry"
            placeholder="Do you have a specific country or University"
            value={formData.specificCountry}
            onChange={handleChange}
          />
        </div>
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
          <div className="bg-gray-200 space-y-4">
            <h1>Which Country are you interested in?</h1>
            <div className="items-top flex space-x-2">
              <Checkbox
                id="terms1"
                name="interestedCountry"
                value={formData.interestedCountry}
                onChange={handleChange}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  European Countries
                </label>
              </div>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Cyprus
                </label>
              </div>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Turkey
                </label>
              </div>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  UK
                </label>
              </div>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Canada
                </label>
              </div>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Other Asian Countries
                </label>
              </div>
            </div>
          </div>
          <Input
            type="Text"
            name="SpecificCountry"
            placeholder="Specific Country of Choice"
            value={formData.SpecificCountry}
            onChange={handleChange}
          />
        </div>
        <div className="bg-gray-100 space-y-4">
          <h1>GDPR consent</h1>
          <div className="items-top flex space-x-2">
            <Checkbox
              id="terms1"
              name="gdprConsent"
              value={formData.gdprConsent}
              onChange={handleChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                GDPR Consent
              </label>
              <p>
                Agree on our{" "}
                <a
                  className="no-underline text-yellow-600"
                  href="https://bilberktravelagency.com/elementor-5359/"
                >
                  terms and condition
                </a>{" "}
                for using your submitted data?
              </p>
            </div>
          </div>
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
};

export default FormApply;
