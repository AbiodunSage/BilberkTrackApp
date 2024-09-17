"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  DocumentData,
} from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { firestore } from "@/firebase/firebase";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserData {
  username: string;
  email: string;
  fullname: string;
  uid: string;
}

interface ApplicationData {
  applicationId: string;
  userId: string;
  [key: string]: any; // Adjust this type according to your application data structure
}

interface FileItem {
  name: string;
  url: string;
  userId: string;
}

const Page: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [combinedData, setCombinedData] = useState<any[]>([]);
  const [paymentStatuses, setPaymentStatuses] = useState<{
    [key: string]: boolean;
  }>({});
  const [visaStatuses, setVisaStatuses] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [adminMessages, setAdminMessages] = useState<{ [key: string]: string }>(
    {}
  );

  const { getPaymentStatus, setPaymentStatus, getVisaStatus, setVisaStatus } =
    useAppContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "users"));
        const usersData: UserData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as DocumentData;
          usersData.push({
            uid: doc.id,
            email: data.email,
            fullname: data.fullname,
            username: data.username,
          });
        });
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
        console.log(
          "Fetched Applications:",
          allApplications,
          allApplications.length
        ); // Debug log
        setApplications(allApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      const storage = getStorage();
      const listRef = ref(storage, `uploads`);

      try {
        const res = await listAll(listRef);
        const files: FileItem[] = (
          await Promise.all(
            res.prefixes.map(async (folderRef) => {
              const userFiles = await listAll(folderRef);
              return await Promise.all(
                userFiles.items.map(async (itemRef) => {
                  const url = await getDownloadURL(itemRef);
                  const userId = folderRef.name; // User ID from folder name
                  return {
                    name: itemRef.name,
                    url,
                    userId,
                  };
                })
              );
            })
          )
        ).flat();
        setFileItems(files);
      } catch (error) {
        console.error("Error listing uploads:", error);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    const combined = users.map((user) => {
      const userApplications = applications.filter(
        (app) => app.userId === user.uid
      );
      const userFiles = fileItems.filter((file) => file.userId === user.uid);
      return {
        ...user,
        applications: userApplications,
        files: userFiles,
      };
    });
    setCombinedData(combined);
  }, [users, applications, fileItems]);

  useEffect(() => {
    const fetchPaymentStatuses = async () => {
      const statuses: { [key: string]: boolean } = {};
      for (const user of users) {
        const paymentStatus = await getPaymentStatus(user.uid);
        statuses[user.uid] = paymentStatus;
      }
      setPaymentStatuses(statuses);
    };

    const fetchVisaStatuses = async () => {
      const statuses: { [key: string]: boolean } = {};
      for (const user of users) {
        const visaStatus = await getVisaStatus(user.uid);
        statuses[user.uid] = visaStatus;
      }
      setVisaStatuses(statuses);
    };

    if (users.length > 0) {
      fetchPaymentStatuses();
      fetchVisaStatuses();
    }
  }, [users, getPaymentStatus, getVisaStatus]);

  const handlePaymentToggle = async (userId: string) => {
    try {
      const currentPaymentStatus = paymentStatuses[userId];
      const newPaymentStatus = !currentPaymentStatus;
      await setPaymentStatus(userId, newPaymentStatus);
      setPaymentStatuses((prevStatuses) => ({
        ...prevStatuses,
        [userId]: newPaymentStatus,
      }));
    } catch (error) {
      console.error("Error toggling payment status:", error);
    }
  };

  const handleVisaToggle = async (userId: string) => {
    try {
      const currentVisaStatus = visaStatuses[userId];
      const newVisaStatus = !currentVisaStatus;
      await setVisaStatus(userId, newVisaStatus);
      setVisaStatuses((prevStatuses) => ({
        ...prevStatuses,
        [userId]: newVisaStatus,
      }));
    } catch (error) {
      console.error("Error toggling visa status:", error);
    }
  };

  const handleAdminMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    userId: string
  ) => {
    const message = event.target.value;
    setAdminMessages((prevMessages) => ({
      ...prevMessages,
      [userId]: message,
    }));
  };

  const handleAdminMessageSend = async (userId: string) => {
    const message = adminMessages[userId];
    if (!message) return;

    try {
      const userDocRef = doc(firestore, "users", userId);
      await setDoc(
        userDocRef,
        { adminMessage: message },
        { merge: true } // Merge with existing data
      );
      setAdminMessages((prevMessages) => ({
        ...prevMessages,
        [userId]: "", // Clear the message after sending
      }));
    } catch (error) {
      console.error("Error sending admin message:", error);
    }
  };
  const router = useRouter();
  const ApplicationsRoute = (userId: string) => {
    window.open(`/AdminApplications?userId=${userId}`, "_blank");
  };

  return (
    <div className=" w-full p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <Table className="w-full text-left bg-white shadow-lg rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="px-4 py-2">S/N</TableHead>
            <TableHead className="px-4 py-2">Full Name</TableHead>
            <TableHead className="px-4 py-2">Username</TableHead>
            <TableHead className="px-4 py-2">Email</TableHead>
            <TableHead className="px-4 py-2">Applications</TableHead>
            <TableHead className="px-4 py-2">Uploaded Files</TableHead>
            <TableHead className="px-4 py-2">Payment Status</TableHead>
            <TableHead className="px-4 py-2">Visa Status</TableHead>
            <TableHead className="px-4 py-2">Admin Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-gray-700">
          {combinedData.map((user, index) => (
            <TableRow
              key={user.uid}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
            >
              <TableCell className="px-4 py-3">{index + 1}</TableCell>
              <TableCell className="px-4 py-3">{user.fullname}</TableCell>
              <TableCell className="px-4 py-3">{user.username}</TableCell>
              <TableCell className="px-4 py-3">{user.email}</TableCell>
              <TableCell className="px-4 py-3">
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => ApplicationsRoute(user.uid)}
                >
                  View Applications
                </Button>
              </TableCell>
              <TableCell className="px-4 py-3">
                {user.files.length > 0 ? (
                  user.files.map((file: FileItem) => (
                    <div key={file.name} className="mb-2">
                      <button
                        onClick={() => window.open(file.url, "_blank")}
                        className="download-button"
                      >
                        {file.name}
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No files</span>
                )}
              </TableCell>
              <TableCell className="px-4 py-3">
                <Button
                  className={`${
                    paymentStatuses[user.uid]
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                  onClick={() => handlePaymentToggle(user.uid)}
                >
                  {paymentStatuses[user.uid]
                    ? "Cancel Payment"
                    : "Trigger Payment"}
                </Button>
              </TableCell>
              <TableCell className="px-4 py-3">
                <Button
                  className={`${
                    visaStatuses[user.uid]
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                  onClick={() => handleVisaToggle(user.uid)}
                >
                  {visaStatuses[user.uid]
                    ? "Cancel Visa Processing"
                    : "Trigger Visa Processing"}
                </Button>
              </TableCell>
              <TableCell className="px-4 py-3">
                <textarea
                  value={adminMessages[user.uid] || ""}
                  onChange={(e) => handleAdminMessageChange(e, user.uid)}
                  placeholder="Write a message"
                  rows={3}
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  className="mt-2 bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => handleAdminMessageSend(user.uid)}
                >
                  Send Message
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>

      <style jsx>{`
        .download-button {
          padding: 8px 12px;
          background-color: yellow;
          color: black;
          border: 2px solid black;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
          cursor: pointer;
        }

        .download-button:hover {
          background-color: black;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Page;
