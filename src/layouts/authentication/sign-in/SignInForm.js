import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Box, Button, CircularProgress, Snackbar } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { saveLoginData } from "../../../Redux/loginSlice";
import "./SignInForm.css";
import bgImage from "assets/images/signin-bg.png";
const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const url = "http://13.126.178.112:3000/user/login";
    const formValues = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        dispatch(saveLoginData(data));
        toast.success("Login Successful");
        setTimeout(() => {
          history("/dashboard");
        }, 800);
      }
      toast.error(data.error);
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Card>
        <ToastContainer />
      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <div style={{ zIndex: "9999", marginLeft: "50px" }}>
          <img src={bgImage} alt="" width="400px" />
        </div>
        <div>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form action="" className="form">
            <div className="form-inner">
              <h2 style={{ textAlign: "center", color: "#1692b4" }}>LOGIN</h2>
              <div className="content">
                <input
                  className="input"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button className="glow-on-hover" type="button" onClick={handleLogin}>
                  {isLoading ? (
                    <CircularProgress color="primary" size={24} /> // Display spinner when loading
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
