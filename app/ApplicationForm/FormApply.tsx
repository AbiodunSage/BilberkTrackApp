"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, firestore } from "@/firebase/firebase"; // Ensure you have proper Firebase initialization here
import { collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const FormApply: React.FC = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState<string>("");
  const [middlename, setMiddlename] = useState<string>("");
  const [nameofFather, setNameofFather] = useState<string>("");
  const [nameofMother, setNameofMother] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [countryOfresidence, setCountryofResidence] = useState<string>("");
  const [placeOfBirth, setPlaceofBirth] = useState<string>("");
  const [countryofBirth, setCountryofBirth] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [maritalStatus, setMaritalStatus] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [passportNumber, setPassportNumber] = useState<string>("");
  const [issueDate, setIssueDate] = useState<string>("");
  const [issuedBy, setIssuedBy] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [nin, setNin] = useState<string>("");
  const [PreviousLevelofStudy, setPreviousLevelofStudy] = useState<string>("");
  const [currentLevelOfEducation, setCurrentLevelofEducation] =
    useState<string>("");
  const [YearOfGraduation, setYearofGraduation] = useState<string>("");
  const [DiplomaObtained, setDiplomaObtained] = useState<string>("");
  const [Institution, setInstitution] = useState<string>("");
  const [CGPA, setCGPA] = useState<string>("");
  const [iamapplyingfor, setIamapplyingfor] = useState<string>("");
  const [atwhatUniversity, setAtwhatUniversity] = useState<string>("");
  const [inWhichCountry, setInWhichCoutry] = useState<string>("");
  const [interestedCountry, setInterestedCountry] = useState<string>("");
  const [whatcourse, setWhatcourse] = useState<string>("");
  const [tuitionbudget, setTuitionBudget] = useState<string>("");
  const [Haveyoutravelledbefore, setHaveyoutravelledbefore] =
    useState<string>("");
  const [refussalBeforeConsulate, setRefussalBeforeConsulate] =
    useState<string>("");
  const [amountforBankStatement, setAmountforBankStatement] =
    useState<string>("");
  const [sponsor, setSponsor] = useState<string>("");
  const [relationshipwithsponsor, setRelationshipwithsponsor] =
    useState<string>("");
  const [sponsorworkplace, setSponsorworkplace] = useState<string>("");
  const [sponsorapproximatesalaryMonth, setSponsorApproximatesalaryMonth] =
    useState<string>("");
  const [sponsorapproximatesalaryYear, setSponsorApproximatesalaryYear] =
    useState<string>("");

  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    try {
      // Reference to the user's document
      const userDocRef = doc(firestore, "users", user.uid);

      // Reference to the 'applications' sub-collection within the user's document
      const applicationsCollectionRef = collection(userDocRef, "applications");

      // Reference to a new document within the 'applications' sub-collection
      const newApplicationDocRef = doc(applicationsCollectionRef);

      await setDoc(newApplicationDocRef, {
        name,
        lastname,
        middlename,
        nameofFather,
        nameofMother,
        gender,
        nationality,
        countryOfresidence,
        dob,
        placeOfBirth,
        countryofBirth,
        maritalStatus,
        address,
        email,
        contact,
        passportNumber,
        issueDate,
        issuedBy,
        expiryDate,
        nin,
        PreviousLevelofStudy,
        currentLevelOfEducation,
        YearOfGraduation,
        DiplomaObtained,
        CGPA,
        iamapplyingfor,
        atwhatUniversity,
        inWhichCountry,
        interestedCountry,
        whatcourse,
        tuitionbudget,
        Haveyoutravelledbefore,
        refussalBeforeConsulate,
        amountforBankStatement,
        sponsor,
        relationshipwithsponsor,
        sponsorworkplace,
        sponsorapproximatesalaryMonth,
        sponsorapproximatesalaryYear,
        uid: user.uid,
      });
      console.log("Application submitted");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
    router.push("/UploadFiles");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl uppercase text-sky-500">
          Personal Information
        </h1>
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <div>
            <label htmlFor="name">First Name:</label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Middle Name:</label>
            <Input
              type="text"
              id="name"
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <Input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Father's Name">Father's Name:</label>
            <Input
              type="text"
              id="nameofFather"
              value={nameofFather}
              onChange={(e) => setNameofFather(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Mother's Name">Mother's Name :</label>
            <Input
              type="text"
              id="nameofMother"
              value={nameofMother}
              onChange={(e) => setNameofMother(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="nationality">Nationality:</label>
            <Input
              type="text"
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Gender">Gender:</label>
            <select
              id="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Gender</option>
              <option value="Male">MALE</option>
              <option value="Female">FEMALE</option>
            </select>
          </div>
          <div>
            <label htmlFor="Coutry of Residence">
              Country of Residence Name:
            </label>
            <Input
              type="text"
              id="countryOfResidence"
              value={countryOfresidence}
              onChange={(e) => setCountryofResidence(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth:</label>
            <Input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="place of birth">Place of Birth:</label>
            <Input
              type="text"
              id="placeofbirth"
              value={placeOfBirth}
              onChange={(e) => setPlaceofBirth(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Country of Birth">Country of Birth:</label>
            <Input
              type="text"
              id="coutry of birth"
              value={countryofBirth}
              onChange={(e) => setCountryofBirth(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Marital Status">Marital status:</label>
            <select
              id="Marital Status"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              required
            >
              <option value="">Select a qualification</option>
              <option value="Married">Married</option>
              <option value="Single">Single</option>
              <option value="Divorced">Divorced</option>
              <option value="Widow/Widower">Widow/Widower</option>
            </select>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="contact">Contact:</label>
            <Input
              type="number"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>
        <h1 className="text-3xl uppercase text-sky-500">
          IDENTIFICATION DOCUMENT
        </h1>
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          <div>
            <label htmlFor="passportNumber">passport Number:</label>
            <Input
              type="number"
              id="passportNumber"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="issue Date">Issue Date:</label>
            <Input
              type="date"
              id="issue date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="IssuedBy">Issued By:</label>
            <Input
              type="text"
              id="Issued By"
              value={issuedBy}
              onChange={(e) => setIssuedBy(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Expiry Date">Expiry Date:</label>
            <Input
              type="date"
              id="Expiry date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="NIN">Identification Number:</label>
            <Input
              type="text"
              id="nin"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              required
            />
          </div>
        </div>
        <h1 className="text-3xl uppercase text-sky-500">STUDY INFORMATION</h1>
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <div>
            <label htmlFor="previous level of study">
              Previous Level of Study:
            </label>
            <Input
              type="text"
              id="previous level of study"
              value={PreviousLevelofStudy}
              onChange={(e) => setPreviousLevelofStudy(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="current level of Education">
              Current Level of Education:
            </label>
            <Input
              type="text"
              id="currret leveldof education"
              value={currentLevelOfEducation}
              onChange={(e) => setCurrentLevelofEducation(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Institution">School Grdauated from:</label>
            <Input
              type="text"
              id="Institution"
              value={Institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="year of grdauation">year of grdauation:</label>
            <Input
              type="date"
              id="year of graduation"
              value={YearOfGraduation}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="DiplomaObtained">DiplomaObtained:</label>
            <select
              id="DiplomaObtained"
              value={DiplomaObtained}
              onChange={(e) => setDiplomaObtained(e.target.value)}
              required
            >
              <option value="">Select a qualification</option>
              <option value="SSCE">SSCE</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
            </select>
          </div>
          <div>
            <label htmlFor="CGPA">CGPA:</label>
            <Input
              type="text"
              id="CGPA"
              value={CGPA}
              onChange={(e) => setCGPA(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="I am applying for">I am applying for:</label>
            <select
              id="i am applying for"
              value={iamapplyingfor}
              onChange={(e) => setIamapplyingfor(e.target.value)}
              required
            >
              <option value="">Select a qualification</option>
              <option value="PhD">PhD</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
            </select>
          </div>
          <div>
            <label htmlFor="atwhat university">At what University:</label>
            <Input
              type="text"
              id="at what university"
              value={atwhatUniversity}
              onChange={(e) => setAtwhatUniversity(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="in which country">In which Country:</label>
            <Input
              type="text"
              id="in which country"
              value={inWhichCountry}
              onChange={(e) => setInWhichCoutry(e.target.value)}
              required
            />
          </div>
        </div>
        <h1 className="text-3xl uppercase text-sky-500">
          If Unknown , Please fill below
        </h1>
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <div>
            <label htmlFor="which country are you interested in">
              Which Country are you interested in:
            </label>
            <Input
              type="text"
              id="which coutry are you interested in"
              value={interestedCountry}
              onChange={(e) => setInterestedCountry(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="what course">
              Which Course are you interested in:
            </label>
            <Input
              type="text"
              id="which course are you interested in"
              value={whatcourse}
              onChange={(e) => setWhatcourse(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tuition Budget">Whats your tuition Budget:</label>
            <Input
              type="text"
              id="whats your tuition budget"
              value={tuitionbudget}
              onChange={(e) => setTuitionBudget(e.target.value)}
            />
          </div>
        </div>
        <h1 className="text-3xl uppercase text-sky-500"> TRAVEL INFORMATION</h1>
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <div>
            <label htmlFor="have you travelled before">
              Have you travelled before:
            </label>
            <Input
              type="text"
              id="Have youh travelled before"
              value={Haveyoutravelledbefore}
              onChange={(e) => setHaveyoutravelledbefore(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="consolate">
              Have you gotten refusal before a consolate:
            </label>
            <Input
              type="text"
              id="consolate"
              value={refussalBeforeConsulate}
              onChange={(e) => setRefussalBeforeConsulate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bank statement">Amount for Bank Statement:</label>
            <Input
              type="text"
              id="statement"
              value={amountforBankStatement}
              onChange={(e) => setAmountforBankStatement(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sponsor">who is your sponsor:</label>
            <Input
              type="text"
              id="sponsor"
              value={sponsor}
              onChange={(e) => setSponsor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="relationship with sponsor">
              Relationship with sponsor:
            </label>
            <Input
              type="text"
              id="relationship with sponsor"
              value={relationshipwithsponsor}
              onChange={(e) => setRelationshipwithsponsor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sponsor work">Where does your sponsor work?:</label>
            <Input
              type="text"
              id="sponsor work"
              value={sponsorworkplace}
              onChange={(e) => setSponsorworkplace(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="approximate monthly earning">
              Your Sponsor Approximate Monthly Earning:
            </label>
            <Input
              type="text"
              id="monthly"
              value={sponsorapproximatesalaryMonth}
              onChange={(e) => setSponsorApproximatesalaryMonth(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="approximate yearly earning">
              Your Sponsor Approximate Yearly Earning:
            </label>
            <Input
              type="text"
              id="yearly"
              value={sponsorapproximatesalaryYear}
              onChange={(e) => setSponsorApproximatesalaryYear(e.target.value)}
            />
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default FormApply;
