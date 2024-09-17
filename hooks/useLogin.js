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
    try {
      const userCred = await signInWithEmailAndPassword(
        formData.email,
        formData.password
      );

      // If userCred does not exist, display an error and return early
      if (!userCred) {
        showToast(
          "destructive",
          "User does not exist, or wrong username and password",
          "error"
        );
        return false; // Stop further execution
      }

      // Fetch user data from Firestore
      const docRef = doc(firestore, "users", userCred.user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        showToast(
          "destructive",
          "User document does not exist in Firestore",
          "error"
        );
        return false; // Stop further execution
      }

      const userData = docSnap.data();
      localStorage.setItem("user-info", JSON.stringify(userData));

      // Log in the user in the global state/store
      loginUser(userData);
      return true;

      // Redirect to home page or dashboard
      // Or whichever page you want to redirect to
    } catch (error) {
      console.error(error);
      showToast("destructive", "Login failed", "error");
    }
  };

  return { loading, error, login };
};

export default useLogin;
