"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase"; // Adjust the path if necessary
import { onAuthStateChanged } from "firebase/auth";

interface AppContextProps {
  user: any; // Replace 'any' with your user type if you have it
  getPaymentStatus: (userId: string) => Promise<boolean>;
  setPaymentStatus: (userId: string, paymentStatus: boolean) => void;
  getVisaStatus: (userId: string) => Promise<boolean>;
  setVisaStatus: (userId: string, visaStatus: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const getPaymentStatus = async (userId: string): Promise<boolean> => {
    try {
      const docRef = doc(firestore, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.paymentStatus || false;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.error("Error fetching payment status: ", error);
      return false;
    }
  };

  const setPaymentStatus = async (
    userId: string,
    newPaymentStatus: boolean
  ) => {
    try {
      await setDoc(
        doc(firestore, "users", userId),
        { paymentStatus: newPaymentStatus },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating payment status in Firestore: ", error);
    }
  };

  const getVisaStatus = async (userId: string): Promise<boolean> => {
    try {
      const docRef = doc(firestore, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.visaStatus || false;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.error("Error fetching visa status: ", error);
      return false;
    }
  };

  const setVisaStatus = async (userId: string, newVisaStatus: boolean) => {
    try {
      await setDoc(
        doc(firestore, "users", userId),
        { visaStatus: newVisaStatus },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating visa status in Firestore: ", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        getPaymentStatus,
        setPaymentStatus,
        getVisaStatus,
        setVisaStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
