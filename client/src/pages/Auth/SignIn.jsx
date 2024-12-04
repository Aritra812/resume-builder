import React, { useState } from "react";
import { app } from "../../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { BASE_URL } from "../../utils/api";

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("logIn"); // "logIn" or "signIn"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmEmail: "",
  });

  const handleGoogle = async () => {
    try {
      dispatch(signInStart());
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const googleData = {
        username: result?.user?.displayName,
        email: result?.user?.email,
        avatar: result?.user?.photoURL,
      };

      const response = await axios.post(
        `${BASE_URL}/auth/google-sign-in`,
        googleData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(signInSuccess(response?.data?.user));
      toast.success(response?.data?.message, { position: "top-left" });
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      dispatch(signInFailure(error.message));
      toast.error("Login failed. Please try again.", { position: "top-left" });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      dispatch(signInStart());
      setLoading(true);

      if (mode === "signIn" && formData.email !== formData.confirmEmail) {
        toast.error("Emails do not match.", { position: "top-left" });
        setLoading(false);
        return;
      }

      const endpoint = mode === "signIn" ? "/auth/register" : "/auth/login";
      const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      dispatch(signInSuccess(response?.data?.user));
      toast.success(response?.data?.message, { position: "top-left" });
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      dispatch(signInFailure(error.message));
      toast.error("Authentication failed. Please try again.", {
        position: "top-left",
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <div style={styles.authBox}>
        <div style={styles.switchContainer}>
          <button
            onClick={() => setMode("logIn")}
            style={{
              ...styles.switchButton,
              ...(mode === "logIn" && styles.activeSwitch),
            }}
          >
            Log In
          </button>
          <button
            onClick={() => setMode("signIn")}
            style={{
              ...styles.switchButton,
              ...(mode === "signIn" && styles.activeSwitch),
            }}
          >
            Sign In
          </button>
        </div>

        <div style={styles.formContainer}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleFormChange}
            style={styles.input}
          />
          {mode === "signIn" && (
            <input
              type="email"
              name="confirmEmail"
              placeholder="Confirm Email"
              value={formData.confirmEmail}
              onChange={handleFormChange}
              style={styles.input}
            />
          )}
          <button onClick={handleSubmit} style={styles.submitButton}>
            {loading ? <CircularProgress size={20} /> : "Submit"}
          </button>
          <button onClick={handleGoogle} style={styles.googleButton}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="4vw" height="4vh" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <>
                <span style={styles.googleText}>Sign in with Google</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
    zIndex: -1,
  },
  authBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    backgroundColor: "#ffffffcc", // semi-transparent white
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    width: "400px",
  },
  switchContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: "20px",
  },
  switchButton: {
    fontSize: "18px",
    padding: "10px 0",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#555",
    fontWeight: "600",
  },
  activeSwitch: {
    color: "#007BFF",
    borderBottom: "2px solid #007BFF",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s",
  },
  submitButton: {
    padding: "12px",
    background: "linear-gradient(90deg, #36d1dc, #5b86e5)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    background: "white",
    color: "#555",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
