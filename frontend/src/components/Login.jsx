import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { Coffee, Eye, EyeOff, Star, Gift, Clock } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // ✅ import AuthContext

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext); // ✅ get loginUser from context
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ Save user in context and localStorage
      loginUser(data.user, data.token);

      // Redirect to home page
      navigate("/");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="headerContent">
          <div className="headerFlex">
            <div className="logo">
              <img src="../Coffeno.jpeg" alt="Coffeno Logo" />
              <h1 className="logoText">Coffeno</h1>
            </div>
            <div className="headerRight">
              <span className="headerText">Don't have an account?</span>
              <button
                className="signUpButton hoverTextOrange"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mainContainer">
        <div className="maxWidth">
          <div className="gridWrapper">
            {/* Benefits Section */}
            <div className="benefitsCard">
              <div className="benefitsHeader">
                <Coffee size={64} color="#d97706" className="benefitsIcon" />
                <h2 className="benefitsTitle">Welcome Back!</h2>
                <p className="benefitsSubtitle">
                  Your favorite coffee is waiting for you
                </p>
              </div>

              <div className="benefitsList">
                <div className="benefitItem">
                  <div className="benefitIcon">
                    <Star size={24} color="#d97706" />
                  </div>
                  <div>
                    <h3 className="benefitTitle">Your Rewards</h3>
                    <p className="benefitText">
                      Check your points balance and redeem rewards instantly!
                    </p>
                  </div>
                </div>

                <div className="benefitItem">
                  <div className="benefitIcon">
                    <Gift size={24} color="#d97706" />
                  </div>
                  <div>
                    <h3 className="benefitTitle">Exclusive Offers</h3>
                    <p className="benefitText">
                      Access member-only deals and personalized recommendations.
                    </p>
                  </div>
                </div>

                <div className="benefitItem">
                  <div className="benefitIcon">
                    <Clock size={24} color="#d97706" />
                  </div>
                  <div>
                    <h3 className="benefitTitle">Quick Orders</h3>
                    <p className="benefitText">
                      Reorder your favorites with just one click.
                    </p>
                  </div>
                </div>
              </div>

              <div className="welcomeOffer">
                <p className="welcomeText">
                  ☕ Welcome back! Your usual order is ready to go!
                </p>
              </div>
            </div>

            {/* Login Form */}
            <div className="formCard">
              <div className="formHeader">
                <h2 className="formTitle">Sign In to Your Account</h2>
                <p className="formSubtitle">Welcome back, coffee lover!</p>
              </div>

              <form onSubmit={handleSubmit} className="formContent">
                {errorMessage && (
                  <p className="errorMessage">{errorMessage}</p>
                )}

                <div className="inputGroup">
                  <label className="label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="inputGroup">
                  <label className="label">Password</label>
                  <div className="passwordContainer">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="passwordInput"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="eyeButton"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="loginOptions">
                  <div className="checkboxItem">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="checkbox"
                    />
                    <label className="checkboxLabel">Remember me</label>
                  </div>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="forgotPassword"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="submitButton hoverDarkenOrange"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
