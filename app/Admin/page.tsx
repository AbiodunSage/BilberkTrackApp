"use client";
import { Input } from "@/components/ui/input";
import useShowToast from "@/hooks/useShowToast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase"; // Make sure this path is correct for your project
import { EyeIcon, EyeOffIcon } from "lucide-react";

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    const fieldName = event.target.name;
    const newValue = event.target.value;
    setFormData({
      ...formData,
      [fieldName]: newValue,
    });
  };

  const checkIfAdmin = async (uid: string) => {
    try {
      const userDocRef = doc(firestore, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.isAdmin || false;
      } else {
        console.error("User does not exist in Firestore.");
        return false;
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const auth = getAuth();

    if (!formData.email || !formData.password) {
      showToast("destructive", "Please fill all the fields", "error");
      setLoading(false);
      return;
    }

    try {
      // Log the user in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Check if the user is an admin
      const isAdmin = await checkIfAdmin(user.uid);

      if (!isAdmin) {
        showToast("destructive", "You are not an admin", "error");
      } else {
        showToast("variant", "Welcome, Admin");
        router.push("/AdminPage"); // Navigate to the admin page
      }
    } catch (error) {
      showToast("destructive", "Login failed", "error");
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div>
        <img src="/logowithoutBackground.png" alt="logo" />
      </div>
      <div className="login-page">
        <div className="space-y-4">
          <div>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Login-id"
              required
            />
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
        <Button className="Button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "SUBMIT"}
        </Button>
      </div>
    </div>
  );
};

export default AdminLogin;
