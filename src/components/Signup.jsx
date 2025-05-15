import React, { useState } from "react";
import "../style/Signup.css";
import { BsTwitterX } from "react-icons/bs";
import { SiFacebook } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signupdata } from "../features/ecomSlice";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    age: "",
    address: "",
  });
  const [msg, setMsg] = useState(null);
  const signupData = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );
      const { success, message } = response.data;

      if (success) {
        setLoader(false);
        setMsg("Sign up successful.");
        dispatch(signupdata({ name: formData.name, email: formData.email }));
      } else {
        setLoader(false);
        setMsg(message || "Something went wrong");
      }
    } catch (error) {
      setLoader(false);
      setMsg("Email already exists or server error.");
    }
  };

  return (
    <div>
      {signupData.length === 0 ? (
        <div className="signup-page">
          <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">
              {["name", "email", "password", "mobile", "age", "address"].map(
                (field) => (
                  <div className="form-group" key={field}>
                    <label htmlFor={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {field === "address" ? (
                      <textarea
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        rows="4"
                        required
                      />
                    ) : (
                      <input
                        type={
                          field === "email"
                            ? "email"
                            : field === "password"
                            ? "password"
                            : field === "age"
                            ? "number"
                            : "text"
                        }
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                      />
                    )}
                  </div>
                )
              )}
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {loader ? (
                <>
                  <Loader />
                </>
              ) : (
                <>
                  <button type="submit" className="login-btn">
                    Signup
                  </button>
                </>
              )}
            </form>
            <p className="msg">{msg}</p>
          </div>
        </div>
      ) : (
        <>{navigate("/")}</>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section about">
            <h2>About Us</h2>
            <p>
              We are a leading tech company focused on innovation and
              excellence.
            </p>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Projects</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h2>Contact Us</h2>
            <p>Nagpur, Maharashtra, India</p>
            <p>+91 8080255843</p>
            <p>info@shopX.com</p>
          </div>
          <div className="footer-section social">
            <h2>Follow Us</h2>
            <div className="social-icons">
              <a href="#">
                <SiFacebook />
              </a>
              <a href="#">
                <BsTwitterX />
              </a>
              <a href="#">
                <GrInstagram />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; ShopX All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
