import { Eye, EyeOff } from "lucide-react";
import "./App.css";
import React, { useState, useEffect } from "react";

const images = [
  "https://media.istockphoto.com/id/519760984/photo/starry-night.jpg?s=612x612&w=0&k=20&c=ppXohmOnNvW1z2P2ZX1CUhAOYEoGaxWr6Ha5jtdUD0Y=",
  "https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW5zfGVufDB8fDB8fHww",
  "https://t3.ftcdn.net/jpg/01/80/83/76/360_F_180837604_UyJZNTHPluIJNQJjmTkCpE4XLJ03Zott.jpg",
];

function App() {
  const [showPassword, setShowPassword] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
          <h2>Create an account</h2>
          <p>
            Already have an account? <a href="#">Log in</a>
          </p>

          <div className="form-group">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>
          <input type="email" placeholder="Email" />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="terms">
            <input type="checkbox" id="terms" style={{ margin: "0" }} />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms & Conditions</a>
            </label>
          </div>

          <button className="create-btn">Create account</button>

          <div className="divider">
            <div className="line"></div>
            <p>Or register with</p>
            <div className="line"></div>
          </div>

          <div className="social-buttons">
            <button className="google-btn">
              <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" /> Google
            </button>
            <button className="apple-btn">
              <img src="https://www.shareicon.net/data/2016/02/07/281232_apple_512x512.png" alt="Apple" /> Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
