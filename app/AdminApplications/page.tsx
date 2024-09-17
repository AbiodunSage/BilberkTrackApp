"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { useSearchParams } from "next/navigation"; // To get query parameters

interface ApplicationData {
  applicationId: string;
  PersonalInfo?: {
    name?: string;
    middlename?: string;
    lastname?: string;
    dob?: string;
    email?: string;
    gender?: string;
    maritalStatus?: string;
    countryofBirth?: string;
    countryOfresidence?: string;
    contact?: number;
    address?: string;
    nameofFather?: string;
    nameofMother?: string;
    nationality?: string;
    placeOfBirth?: string;
  };
  StudyInformation?: {
    whatcourse?: string;
    atwhatuniversity?: string;
    inWhichCountry?: string;
    iamapplyingfor?: string;
    interestedCountry?: string;
    tuitionbudget?: string;
  };
  EducationalBackground?: {
    PreviousLevelofStudy?: string;
    CGPA?: string;
    YearOfGraduation?: string;
    DiplomaObtained?: string;
    currentLevelOfEducation?: string;
  };
  OtherInformation?: {
    Haveyoutravelledbefore?: string;
    amountforBankStatement?: string;
    refussalBeforeConsulate?: string;
    relationshipwithsponsor?: string;
    sponsor?: string;
    sponsorapproximatesalaryMonth?: string;
    sponsorapproximatesalaryYear?: string;
    sponsorworkplace?: string;
  };
  PassPortDetails?: {
    passportNnumber?: number;
    nin?: number;
    issueDate?: number;
    expiryDate?: number;
    issuedBy?: string;
  };
  [key: string]: any; // Adjust this type according to your application data structure
}

const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId"); // Get the userId from query parameters

  useEffect(() => {
    const fetchApplications = async () => {
      if (!userId) return;

      try {
        const applicationsSnapshot = await getDocs(
          collection(firestore, "users", userId, "applications")
        );
        const userApplications = applicationsSnapshot.docs.map((doc) => ({
          applicationId: doc.id,
          ...doc.data(),
        }));
        setApplications(userApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [userId]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Applications for User: <span className="text-blue-600">{userId}</span>
      </h1>

      {applications.length > 0 ? (
        applications.map((app) => (
          <div
            key={app.applicationId}
            className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Application ID: {app.applicationId}
            </h2>

            {/* Personal Information Section */}
            {app.PersonalInfo && (
              <section className="mb-6">
                <h3 className="text-xl font-bold mb-2">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>First Name:</strong>{" "}
                    {app.PersonalInfo.name || "N/A"}
                  </p>
                  <p>
                    <strong>Middle Name:</strong>{" "}
                    {app.PersonalInfo.middlename || "N/A"}
                  </p>
                  <p>
                    <strong>Last Name:</strong>{" "}
                    {app.PersonalInfo.lastname || "N/A"}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {app.PersonalInfo.dob || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {app.PersonalInfo.email || "N/A"}
                  </p>
                  <p>
                    <strong>Gender:</strong> {app.PersonalInfo.gender || "N/A"}
                  </p>
                  <p>
                    <strong>Marital Status:</strong>{" "}
                    {app.PersonalInfo.maritalStatus || "N/A"}
                  </p>
                  <p>
                    <strong>Country of Birth:</strong>{" "}
                    {app.PersonalInfo.countryofBirth || "N/A"}
                  </p>
                  <p>
                    <strong>Place of Birth:</strong>{" "}
                    {app.PersonalInfo.placeOfBirth || "N/A"}
                  </p>
                  <p>
                    <strong>Country of Residence:</strong>{" "}
                    {app.PersonalInfo.countryOfresidence || "N/A"}
                  </p>
                  <p>
                    <strong>Contact:</strong>{" "}
                    {app.PersonalInfo.contact || "N/A"}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {app.PersonalInfo.address || "N/A"}
                  </p>
                  <p>
                    <strong>Name of Father:</strong>{" "}
                    {app.PersonalInfo.nameofFather || "N/A"}
                  </p>
                  <p>
                    <strong>Name of Mother:</strong>{" "}
                    {app.PersonalInfo.nameofMother || "N/A"}
                  </p>
                  <p>
                    <strong>Nationality:</strong>{" "}
                    {app.PersonalInfo.nationality || "N/A"}
                  </p>
                </div>
              </section>
            )}

            {/* Study Information Section */}
            {app.StudyInformation && (
              <section className="mb-6">
                <h3 className="text-xl font-bold mb-2">Study Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Course:</strong>{" "}
                    {app.StudyInformation.whatcourse || "N/A"}
                  </p>
                  <p>
                    <strong>Institution of Choice:</strong>{" "}
                    {app.StudyInformation.atwhatuniversity || "N/A"}
                  </p>
                  <p>
                    <strong>Country of Choice:</strong>{" "}
                    {app.StudyInformation.inWhichCountry || "N/A"}
                  </p>
                  <p>
                    <strong>Degree Applying For:</strong>{" "}
                    {app.StudyInformation.iamapplyingfor || "N/A"}
                  </p>
                  <p>
                    <strong>Tuition Budget:</strong>{" "}
                    {app.StudyInformation.tuitionbudget || "N/A"}
                  </p>
                </div>
              </section>
            )}

            {/* Educational Background Section */}
            {app.EducationalBackground && (
              <section className="mb-6">
                <h3 className="text-xl font-bold mb-2">
                  Educational Background
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Previous Level of Study:</strong>{" "}
                    {app.EducationalBackground.PreviousLevelofStudy || "N/A"}
                  </p>
                  <p>
                    <strong>CGPA:</strong>{" "}
                    {app.EducationalBackground.CGPA || "N/A"}
                  </p>
                  <p>
                    <strong>Year of Graduation:</strong>{" "}
                    {app.EducationalBackground.YearOfGraduation || "N/A"}
                  </p>
                  <p>
                    <strong>Diploma Obtained:</strong>{" "}
                    {app.EducationalBackground.DiplomaObtained || "N/A"}
                  </p>
                  <p>
                    <strong>Current Level of Education:</strong>{" "}
                    {app.EducationalBackground.currentLevelOfEducation || "N/A"}
                  </p>
                </div>
              </section>
            )}

            {/* Other Information Section */}
            {app.OtherInformation && (
              <section className="mb-6">
                <h3 className="text-xl font-bold mb-2">Other Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Have You Traveled Before:</strong>{" "}
                    {app.OtherInformation.Haveyoutravelledbefore || "N/A"}
                  </p>
                  <p>
                    <strong>Bank Statement Amount:</strong>{" "}
                    {app.OtherInformation.amountforBankStatement || "N/A"}
                  </p>
                  <p>
                    <strong>Refusal Before Consulate:</strong>{" "}
                    {app.OtherInformation.refussalBeforeConsulate || "N/A"}
                  </p>
                  <p>
                    <strong>Relationship with Sponsor:</strong>{" "}
                    {app.OtherInformation.relationshipwithsponsor || "N/A"}
                  </p>
                  <p>
                    <strong>Sponsor:</strong>{" "}
                    {app.OtherInformation.sponsor || "N/A"}
                  </p>
                  <p>
                    <strong>Sponsor's Monthly Salary:</strong>{" "}
                    {app.OtherInformation.sponsorapproximatesalaryMonth ||
                      "N/A"}
                  </p>
                  <p>
                    <strong>Sponsor's Annual Salary:</strong>{" "}
                    {app.OtherInformation.sponsorapproximatesalaryYear || "N/A"}
                  </p>
                  <p>
                    <strong>Sponsor's Workplace:</strong>{" "}
                    {app.OtherInformation.sponsorworkplace || "N/A"}
                  </p>
                </div>
              </section>
            )}

            {/* Passport Details Section */}
            {app.PassPortDetails && (
              <section className="mb-6">
                <h3 className="text-xl font-bold mb-2">Passport Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Passport Number:</strong>{" "}
                    {app.PassPortDetails.passportNnumber || "N/A"}
                  </p>
                  <p>
                    <strong>National ID Number:</strong>{" "}
                    {app.PassPortDetails.nin || "N/A"}
                  </p>
                  <p>
                    <strong>Issue Date:</strong>{" "}
                    {app.PassPortDetails.issueDate || "N/A"}
                  </p>
                  <p>
                    <strong>Expiry Date:</strong>{" "}
                    {app.PassPortDetails.expiryDate || "N/A"}
                  </p>
                  <p>
                    <strong>Issued By:</strong>{" "}
                    {app.PassPortDetails.issuedBy || "N/A"}
                  </p>
                </div>
              </section>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No applications found.</div>
      )}
    </div>
  );
};

export default AdminApplications;
