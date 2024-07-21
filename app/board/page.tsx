import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { MainNav } from "./components/main-nav";
import HelloUser from "./components/Welcome";
import { UserNav } from "./components/user-nav";
import { SiteFooter } from "./components/SocialFooter";
import { Caroussel } from "@/components/Caroussel";
import ProfilePage from "./components/ProfilePage";
import ParticlesComponent from "@/components/ParticleComponent";
import NewsLetter from "./components/NewsLetter";
import TrackPage from "../Tracking/page";
const Board = () => {
  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div> */}
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
                <Card className="hover:bg-yellow-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium ">
                      Number of Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5000+</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:bg-yellow-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Task's to Do
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+Invoice</div>
                    <p className="text-xs text-muted-foreground">
                      Hello,pls complete your application
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:bg-yellow-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Invoice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+1</div>
                    <p className="text-xs text-muted-foreground">
                      View your Invoice
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:bg-yellow-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Learn More About your destination
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+</div>
                    <p className="text-xs text-muted-foreground">
                      learn more about your destination
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
                <Card className="col-span-2 ">
                  <CardTitle>Profile</CardTitle>
                  <CardContent>
                    <ProfilePage />
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <div className=" flex justify-center items-center">
                    <TrackPage />
                  </div>
                </Card>
                <Card className="col-span-3 ">
                  <CardTitle>Courses</CardTitle>
                  <CardContent>
                    <Caroussel />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <NewsLetter />
        <SiteFooter />
      </div>
    </>
  );
};

export default Board;
