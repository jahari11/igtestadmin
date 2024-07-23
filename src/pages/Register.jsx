import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/reg.css";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrRole] = useState("customer");

  const [profileImage, setProfileImage] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Hide .navbar-side and set width of .content-container when component mounts
    const navbarSide = document.querySelector(".navbar-side");
    const contentContainer = document.querySelector(".content-container");

    if (navbarSide) {
      navbarSide.style.display = "none";
    }

    if (contentContainer) {
      contentContainer.style.width = "100%";
    }

    // Clean up function to reset styles when component unmounts
    return () => {
      if (navbarSide) {
        navbarSide.style.display = "";
      }

      if (contentContainer) {
        contentContainer.style.width = "";
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount


  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('profileImage',profileImage);
      formData.append('profileName',profileImage.name);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('role', role);

  
      const response = await axios.post(
        "https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/user/register",
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      console.log("Registration successful:", response.data);
      toast.success("Registration successful");
      // navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
      setError("Registration failed");
    }
  }
  

  return (
    <div className="container">
      <form className="logbox">
        <h2>User Register</h2>

        <div className="form-box">
          {error && <p className="red">{error}</p>}
          <input
            className="form-input"
            type="text"
            name="Username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
                    filename={profileImage} 

            type="file"
            name="profileImage" 
            onChange={e => setProfileImage(e.target.files[0])}
            accept="image/*"
          />
          <button type="button" onClick={handleRegister} className="form-btn">
            Register
          </button>
        </div>
        <p className="re-btn">
          If you have an account{" "}
          <b>
            <Link to="/login">Log in</Link>{" "}
          </b>
        </p>
      </form>
    </div>
  );
}

export default Register;
