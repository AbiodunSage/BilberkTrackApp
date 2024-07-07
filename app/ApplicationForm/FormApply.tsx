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
  const [lastname, setLastname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [qualification, setQualification] = useState<string>("");
  const [Institution, setInstitution] = useState<string>("");

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
        gender,
        nationality,
        dob,
        address,
        email,
        contact,
        qualification,
        Institution,
        uid: user.uid,
      });
      console.log("Application submitted");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
    router.push("https://donate.stripe.com/eVa29zalDeKR9FK28h");
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div>
        <label htmlFor="Institution">Institution Attended:</label>
        <Input
          type="text"
          id="Institution"
          value={Institution}
          onChange={(e) => setInstitution(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="qualification">Qualification:</label>
        <select
          id="qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          required
        >
          <option value="">Select a qualification</option>
          <option value="SSCE">SSCE</option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Master's Degree">Master's Degree</option>
        </select>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormApply;
