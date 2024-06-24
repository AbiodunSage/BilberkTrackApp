import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import useShowToast from "../hooks/useShowToast";
import useAuthStore from "../store/authStore";
import { useState } from "react";
const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const loginUser = useAuthStore((state) => state.login);
  const router = useRouter();
  const showToast = useShowToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (formData) => {
    if (
      !formData.email ||
      !formData.username ||
      !formData.fullname ||
      !formData.password
    ) {
      showToast(
        "destructive",
        "something went wrong",
        "please fill all fields"
      );
      return;
    }

    const usersRef = collection(firestore, "users");

    const q = query(usersRef, where("username", "==", formData.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("destructive", "Username already exixts", "error");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );
      setEmail("");
      setPassword("");
      if (!newUser && error) {
        showToast("destructive", "something went wrong", "Error");
        return;
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: formData.email,
          username: formData.username,
          fullname: formData.fullname,
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
        router.push("/Login");
      }
    } catch (e) {
      showToast("destructive", "something went wrongbull", "Error");
    }
  };
  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
