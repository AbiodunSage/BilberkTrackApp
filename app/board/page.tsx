"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { MainNav } from "./components/main-nav";
import HelloUser from "./components/Welcome";
import { UserNav } from "./components/user-nav";
import { SiteFooter } from "./components/SocialFooter";
import { Caroussel } from "@/components/Caroussel";
import ProfilePage from "./components/ProfilePage";
import ParticlesComponent from "@/components/ParticleComponent";

import TrackPage from "../Tracking/page";
import AuthRouter from "@/AuthRoute";

import { useEffect, useState } from "react";

import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import useLogout from "@/hooks/useLogOut";
import MoreInfo from "./components/MoreInfo";

interface UserProfileData {
  adminMessage: string;
}
interface ApplicationData {
  applicationId: string;
  userId: string;
  [key: string]: any; // Adjust this type according to your application data structure
}
const BoardPage: React.FC = () => {
  const { isLoading, userProfile } = useGetUserProfile();
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [userapplications, setUserApplications] = useState<ApplicationData[]>(
    []
  );
  const [user] = useAuthState(auth);
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setProfileData(userDoc.data() as UserProfileData);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchProfileData();
  }, [user]);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, "users"));
        const applicationsPromises = usersSnapshot.docs.map(async (userDoc) => {
          const applicationsSnapshot = await getDocs(
            collection(firestore, "users", userDoc.id, "applications")
          );
          return applicationsSnapshot.docs.map((doc) => ({
            applicationId: doc.id,
            userId: userDoc.id,
            ...doc.data(),
          }));
        });

        const applicationsResults = await Promise.all(applicationsPromises);
        const allApplications: ApplicationData[] = applicationsResults.flat();
        // Debug log
        const userApplications = allApplications.filter(
          (app) => app.userId === user?.uid
        );

        setApplications(allApplications);
        setUserApplications(userApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [user]);
  const { logout, isLoggingOut } = useLogout();
  return (
    <>
      <AuthRouter isLoggingOut={isLoggingOut}>
        <div style={{ position: "relative" }}>
          <ParticlesComponent />
        </div>
        <div className=" flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <HelloUser />
                <UserNav />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="hover:bg-yellow-500 shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium ">
                        Number of Applications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="">
                      <div className="text-2xl font-bold">
                        +{applications.length}
                      </div>
                      <div></div>
                    </CardContent>
                  </Card>
                  <Card className="hover:bg-yellow-500 shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Task's to Do
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg text-yellow-700">
                        {profileData?.adminMessage}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:bg-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium no-underline">
                        User Applications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="">
                      <div className="text-2xl font-bold">
                        +{userapplications.length}
                      </div>
                      <div></div>
                    </CardContent>
                  </Card>

                  <Link
                    href="http://bilberktravelagency.com/admission-processing/"
                    className="no-underline"
                  >
                    <Card className="hover:bg-yellow-500">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Learn More About what we offer
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="shadow-2xl">
                        <div className="text-2xl font-bold">Learn</div>
                        <p className="text-xs text-muted-foreground ">
                          more about Bilberk
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-[1] bg-yellow-500 shadow-2xl rounded-lg">
                      <ProfilePage />
                    </div>

                    <div className="flex-[1] bg-yellow-500 flex justify-center items-center shadow-2xl rounded-lg">
                      <TrackPage />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="flex justify-center w-fit bg-black text-white p-2 mx-auto rounded-sm shadow-md place content-center">
            <p
              style={{ fontFamily: "cursive", fontSize: 20 }}
              className="text-sm md:text-base m-2"
            >
              More About what we Offer!!
            </p>
          </div>
          <div className="">
            <MoreInfo />
          </div>

          <SiteFooter />
        </div>
      </AuthRouter>
    </>
  );
};

export default BoardPage;
