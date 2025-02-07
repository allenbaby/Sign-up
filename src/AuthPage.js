import { Eye, EyeOff } from "lucide-react";
import "./App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "./store";

const images = [
  "https://media.istockphoto.com/id/519760984/photo/starry-night.jpg?s=612x612&w=0&k=20&c=ppXohmOnNvW1z2P2ZX1CUhAOYEoGaxWr6Ha5jtdUD0Y=",
  "https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW5zfGVufDB8fDB8fHww",
  "https://t3.ftcdn.net/jpg/01/80/83/76/360_F_180837604_UyJZNTHPluIJNQJjmTkCpE4XLJ03Zott.jpg",
];

function AuthPage() {
  const { baseURL } = useStore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  // Handle login function
  const handleLogin = async () => {
    setLoading(true);
    const loginPayload = {
      email: document.querySelector('#inputEmail')?.value,
      password: document.querySelector('#inputPassword')?.value,
    };

    try {
      const response = await axios.post(
        `${baseURL}/api/users/login/`,
        loginPayload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          timeout: 10000, // 10 seconds
        }
      );
      console.log(response.data);

      alert(`Response Code: ${response.status} - ${response.data}`);
      response.status === 200 &&
        setTimeout(() => {
          navigate("/home",); // Pass name as route state
        }, 2000); // Simulating preloader
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.data}`);
      } else {
        alert("Error: Could not connect to the server.");
      }
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    const singupPayload = {
      email: document.querySelector('#inputEmail')?.value,
      password: document.querySelector('#inputPassword')?.value,
      first_name: document.querySelector('#inputFirstName')?.value,
      last_name: document.querySelector('#inputLastName')?.value,
      role: "customer",
    };

    try {
      const response = await axios.post(
        `${baseURL}/api/users/signup/`,
        singupPayload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000, // 10 seconds
        }
      );
      console.log(response.data);

      // // Assuming the API response contains the user data including the name
      // const { first_name } = response.data.user;

      // // Set the user name in state
      // setUserName(first_name);

      alert(`Response Code: ${response.status} - ${response.data}`);
      response.status === 200 &&
        setTimeout(() => {
          setIsLogin(!isLogin)
        }, 1000); // Simulating preloader
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.data}`);
      } else {
        alert("Error: Could not connect to the server.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="signup-container">
        {/* Left Side - Image & Text */}
        <div className="left-side">
          <img src={images[currentIndex]} alt="Background" className="background-image" />
          <div className="overlay">
            <h2>Capturing Moments, Creating Memories</h2>
            <div className="dots">
              {images.map((_, index) => (
                <span key={index} className={`dot ${index === currentIndex ? "active" : ""}`}></span>
              ))}
            </div>
          </div>
          <button className="back-btn">Back to website →</button>
        </div>

        {/* Right Side - Form */}
        <div className="right-side">
          <h2>{isLogin ? "Log in to your account" : "Create an account"}</h2>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <a href="#" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign up" : "Log in"}
            </a>
          </p>

          <div className="form-group">
            {!isLogin && (
              <>
                <input type="text" id="inputFirstName" placeholder="First name" />
                <input type="text" id="inputLastName" placeholder="Last name" />
              </>
            )}
          </div>
          <input type="email" id="inputEmail" placeholder="Email" />
          <div className="password-field">
            <input id="inputPassword" type={showPassword ? "text" : "password"} placeholder="Enter your password" />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {!isLogin && (
            <div className="terms">
              <input type="checkbox" id="terms" style={{ margin: "0" }} />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms & Conditions</a>
              </label>
            </div>
          )}

          <button className="create-btn" onClick={isLogin ? handleLogin : handleSignup}>
            {loading ? "Processing..." : isLogin ? "Log in" : "Create account"}
          </button>

          <div className="divider">
            <div className="line"></div>
            <p>Or {isLogin ? "log in" : "register"} with</p>
            <div className="line"></div>
          </div>

          <div className="social-buttons">
            <button className="google-btn">
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google"
              />{" "}
              Google
            </button>
            <button className="apple-btn">
              <img
                src="https://www.shareicon.net/data/2016/02/07/281232_apple_512x512.png"
                alt="Apple"
              />{" "}
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
