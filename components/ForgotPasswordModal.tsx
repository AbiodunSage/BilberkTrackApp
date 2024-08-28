import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase"; // Adjust the path if necessary
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
      setError("");
    } catch (error) {
      setMessage("");
      setError("Error sending password reset email. Please try again.");
    }
  };

  return (
    <>
      <div className="forgot-password-modal">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div>
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Send Password Reset Email</Button>
        </form>
        {message && <p>{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default ForgotPasswordModal;
