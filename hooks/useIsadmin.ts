import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase"; // Adjust the import to your firebase config

const useIsadmin = (uid: string) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkIfAdmin = async () => {
      try {
        const userDocRef = doc(firestore, "users", uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.isAdmin || false); // Ensure proper check for `isAdmin`
        } else {
          console.error("No such user document!");
        }
      } catch (err) {
        setError(err as Error);
        console.error("Error checking admin status:", err);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      checkIfAdmin();
      console.log(uid);
    }
  }, [uid]);

  return { isAdmin, loading, error };
};

export default useIsadmin;
