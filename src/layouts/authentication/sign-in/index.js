import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/signin-bg.jpg";
import { Box, Button, CircularProgress, Snackbar } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { saveLoginData } from "../../../Redux/loginSlice";

function Basic() {
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
    <BasicLayout image={bgImage}>
      <ToastContainer />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Coach Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleLogin}
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? (
                  <CircularProgress color="primary" size={24} /> // Display spinner when loading
                ) : (
                  "Sign in"
                )}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
