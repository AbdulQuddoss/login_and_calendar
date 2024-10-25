import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useGlobalContext } from "../../Context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const {user, submitSignup} = useGlobalContext();
  const [action, setAction] = useState("Sign up");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleAction = (newAction) => {
    setAction(newAction);
  };

  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    })
  }
  
  const handleSignup = (e) => {
    e.preventDefault();
    if (action === "Sign up") {
      
      if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
      }

      if(formData.name === "" || formData.email === "") {
        alert("Name or Email missing!");
          return;
      }
      
      const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
      };

      let existingUser = user.find((item) => item.email === formData.email);
      if(existingUser) {
        alert("User all ready exist! go to the login");
      } else {
        submitSignup(newUser); 
        setAction("Log in");
        //navigate('/calendar');
      }
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if(action === "Log in") {
      // if(formData.name === "" || formData.email === "") {
      //   alert("Name or Email missing!");
      //     return;
      // }

      let userIsExist = user.find((item) => (item.email === formData.email) && (item.password === formData.password));
      if(userIsExist) {
        navigate("/calendar");
      } else {
        alert("user name or email is incorrect!");
      }
  }
}
console.log(user);

  return (
    <>
      <div className="container">
        <div className="form-box">
          <h2>{action}</h2>
          <form>
            <div
              className={
                action === "Sign up" ? "input-group" : "input-group active"
              }
            >
              <FaUser className="icon" />
              <input type="text" name="name" value={formData.name} onChange={handleInput} placeholder="Enter your name" required />
            </div>
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input type="email" name="email" value={formData.email} onChange={handleInput} placeholder="Enter your email" required />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="password" name="password" value={formData.password} onChange={handleInput} placeholder="Create password" required />
            </div>
            <div
              className={
                action === "Sign up" ? "input-group" : "input-group active"
              }
            >
              <FaLock className="icon" />
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInput} placeholder="Confirm password" required />
            </div>
            <div className="btn-container">
              <button
                className={action === "Log in" ? "btn" : "btn active"}
                onClick={handleLogin}
              >
                Log in
              </button>
              <button
                className={action === "Sign up" ? "btn" : "btn active"}
                onClick={handleSignup}
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="login-text">
            {action === "Sign up" ? (
              <>
                Already have an account? <a href="#" onClick={() => handleAction("Log in")}>Login now</a>
              </>
            ) : (
              <>
                Don't have an account? <a href="#" onClick={() => handleAction("Sign up")}>Sign up now</a>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
