/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "../../../axios";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { navigate } from "react-router-dom";
import bgImage from "assets/images/signin-bg.jpg";
import { Box, CircularProgress } from "@mui/material";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleLogin = async (values) => {
    // setLoginValues(values);
    setIsLoading(true);
    var url = "http://65.0.100.104:3000/user/login";
    var formvalues = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formvalues),
      });
      const data = await response.json();
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        // Redirect or do something after successful login
      }
      setIsLoading(false);
      history("/dashboard");
    } catch (err) {
      setIsLoading(false);
      // toast.error(`Wrong Email or Password`, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
  };
  return (
    <BasicLayout image={bgImage}>
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
                onClick={() => {
                  handleLogin();
                }}
              >
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      {isLoading && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress color="primary" />
        </Box>
      )}
    </BasicLayout>
  );
}

export default Basic;
