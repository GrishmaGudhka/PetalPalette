// src/pages/Login.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();

  /* ================================
      State
  ================================= */

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [hoverLogin, setHoverLogin] =
    useState(false);

  const [hoverSignup, setHoverSignup] =
    useState(false);

  /* ================================
      Handle Input
  ================================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  /* ================================
      Login
  ================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!form.password.trim()) {
      setError("Please enter your password.");
      return;
    }

    /* ================================
        Admin Login
    ================================= */

    if (
      form.email === "admin@gmail.com" &&
      form.password === "111111"
    ) {
      localStorage.setItem(
        "isAdminLoggedIn",
        "true"
      );

      window.dispatchEvent(
        new Event("storage")
      );

      navigate("/admin-dashboard");

      return;
    }

    /* ================================
        User Login
    ================================= */

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/login",
        form
      );

      localStorage.setItem(
        "userId",
        res.data.user._id
      );

      localStorage.setItem(
        "userName",
        res.data.user.fullName
      );

      localStorage.setItem(
        "userEmail",
        res.data.user.email
      );

      window.dispatchEvent(
        new Event("storage")
      );

      setForm({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================================
      JSX
  ================================= */

  return (
    <>
      <Header />

      <div style={styles.page}>

        <div style={styles.card}>

          <div style={styles.leftSection}>

            <h1 style={styles.title}>
              Welcome Back 🌸
            </h1>

            <p style={styles.subtitle}>
              Login to continue shopping beautiful
              flowers, manage your orders and enjoy
              exclusive offers from PetalPalette.
            </p>

            <img
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800"
              alt="Flowers"
              style={styles.image}
            />

          </div>

          <div style={styles.rightSection}>

            <h2 style={styles.loginHeading}>
              Login
            </h2>

            <p style={styles.loginText}>
              Enter your account details.
            </p>

            {error && (
              <div style={styles.errorBox}>
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={styles.form}
            >

              <label style={styles.label}>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <label style={styles.label}>
                Password
              </label>

              <div style={styles.passwordWrapper}>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  style={styles.passwordInput}
                  required
                />

                <button
                  type="button"
                  style={styles.showButton}
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

              <div style={styles.optionsRow}>

                <label style={styles.rememberMe}>

                  <input type="checkbox" />

                  Remember Me

                </label>

                <Link
                  to="/forgot-password"
                  style={styles.forgotLink}
                >
                  Forgot Password?
                </Link>

              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.loginButton,
                  background: hoverLogin
                    ? "#db2777"
                    : "#ec4899",
                  opacity: loading ? 0.7 : 1,
                  cursor: loading
                    ? "not-allowed"
                    : "pointer",
                }}
                onMouseEnter={() =>
                  setHoverLogin(true)
                }
                onMouseLeave={() =>
                  setHoverLogin(false)
                }
              >
                {loading
                  ? "Logging In..."
                  : "Login"}
              </button>

            </form>

            <div style={styles.dividerContainer}>

              <div style={styles.divider}></div>

              <span style={styles.dividerText}>
                OR
              </span>

              <div style={styles.divider}></div>

            </div>

            <p style={styles.signupText}>

              Don't have an account?

            </p>

            <Link
              to="/signup"
              style={{
                ...styles.signupButton,
                background: hoverSignup
                  ? "#f9a8d4"
                  : "#ffffff",
              }}
              onMouseEnter={() =>
                setHoverSignup(true)
              }
              onMouseLeave={() =>
                setHoverSignup(false)
              }
            >
              Create New Account
            </Link>

          </div>

        </div>

      </div>

      <Footer />

    </>

  );

};

export default Login;

const styles = {

  page: { minHeight: "100vh", background: "linear-gradient(to bottom,#fff8fb,#ffeaf4)", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px", },

  container: { width: "100%", maxWidth: "1200px", display: "grid", gridTemplateColumns: "1fr 1fr", background: "#ffffff", borderRadius: "24px", overflow: "hidden", boxShadow: "0 15px 40px rgba(0,0,0,0.12)", },

  leftSection: { background: "linear-gradient(135deg,#ec4899,#f472b6)", color: "#ffffff", padding: "70px 50px", display: "flex", flexDirection: "column", justifyContent: "center", },

  brand: { fontSize: "42px", fontWeight: "700", marginBottom: "18px", },

  tagline: { fontSize: "19px", lineHeight: "34px", marginBottom: "40px", opacity: 0.95, },

  featureList: { display: "flex", flexDirection: "column", gap: "18px", },

  featureItem: { display: "flex", alignItems: "center", gap: "12px", fontSize: "17px", fontWeight: "500", },

  featureIcon: { fontSize: "24px", },

  rightSection: { padding: "60px 55px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#ffffff", },

  heading: { fontSize: "36px", fontWeight: "700", color: "#222", marginBottom: "10px", },

  subHeading: { color: "#666", fontSize: "16px", lineHeight: "28px", marginBottom: "35px", },

  error: { background: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca", padding: "12px", borderRadius: "10px", marginBottom: "20px", textAlign: "center", fontWeight: "600", },

  form: { display: "flex", flexDirection: "column", gap: "18px", },

  label: { fontWeight: "600", color: "#444", marginBottom: "6px", display: "block", },

  input: { width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "15px", outline: "none", transition: "0.3s", boxSizing: "border-box", },

  optionsRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px", marginBottom: "10px", },

  rememberMe: { display: "flex", alignItems: "center", gap: "8px", color: "#555", fontSize: "14px", },

  forgotLink: { color: "#ec4899", textDecoration: "none", fontWeight: "600", fontSize: "14px", },

  loginButton: { width: "100%", color: "#ffffff", border: "none", borderRadius: "12px", padding: "15px", fontSize: "17px", fontWeight: "700", transition: "0.3s", },

  dividerContainer: { display: "flex", alignItems: "center", margin: "30px 0", },

  divider: { flex: 1, height: "1px", background: "#e5e7eb", },

  dividerText: { margin: "0 15px", color: "#888", fontWeight: "600", fontSize: "14px", },

  signupText: { textAlign: "center", color: "#666", marginTop: "25px", fontSize: "15px", },

  signupLink: { color: "#ec4899", fontWeight: "700", textDecoration: "none", },

  demoBox: { marginTop: "35px", padding: "18px", background: "#fff5fa", border: "1px solid #fbcfe8", borderRadius: "12px", },

  demoTitle: { fontSize: "15px", fontWeight: "700", color: "#ec4899", marginBottom: "10px", },

  demoText: { fontSize: "14px", color: "#666", lineHeight: "24px", },

  footerText: { textAlign: "center", color: "#888", marginTop: "30px", fontSize: "13px", },

  inputFocus: { border: "1px solid #ec4899", boxShadow: "0 0 8px rgba(236,72,153,0.25)", },

  buttonHover: { background: "#db2777", transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(236,72,153,0.35)", },

  buttonNormal: { background: "#ec4899", transform: "translateY(0px)", boxShadow: "none", },
};