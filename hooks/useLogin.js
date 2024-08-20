import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "../hooks/useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);
  const router = useRouter();

  const login = async (formData) => {
    if (!formData.email || !formData.password) {
      return showToast("destructive", "Please fill all the fields", "error");
    }

    try {
      const userCred = await signInWithEmailAndPassword(
        formData.email,
        formData.password
      );

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);

        const userData = docSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userData));
        loginUser(userData);

        // Redirect to home page or dashboard
      }
      if (!userCred) {
        showToast(
          "destructive",
          "User does not exist, or wrong username and password",
          "error"
        );
        return; // Prevent login if user does not exist in Firestore
      }
    } catch (error) {
      console.error(error);
      showToast("destructive", "Login failed", "error");
    }
  };

  return { loading, error, login };
};

export default useLogin;
