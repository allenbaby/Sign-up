import './HomePage.css';
// src/components/HomePage.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "./store";

const HomePage = () => {
  const { baseURL } = useStore();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const name = "Temp";
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="hey-name-container">
      {/* Greeting Section */}
      <motion.div
        className="greeting"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Hey {name}</h1>
      </motion.div>

      {/* Profile Icon and Dropdown */}
      <div className="profile-section">
        <motion.div
          className="profile-icon"
          onClick={toggleDropdown}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          👤
        </motion.div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="dropdown-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li onClick={() => alert("Logged out!")}>Logout</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomePage;