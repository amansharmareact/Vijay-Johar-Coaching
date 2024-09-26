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
import { saveLoginData } from "../../../../Redux/loginSlice";
import "../../sign-in/SignInForm.css";
import bgImage from "assets/images/signin-bg.png";
import { makeStyles } from "@material-ui/core/styles";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import axios from "../../../../axios";

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    color: "red",
  },
}));
const Cover = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [cpassword, setCpassword] = useState("");
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

  const handleResetPassword = async () => {
    setIsLoading(true);
    if (password !== cpassword) {
      toast.error("Passwords do not match");
    } else {
      const formValues = {
        email: email,
        password: password,
      };

      try {
        const token = localStorage.getItem("token");
        const data = await axios.post("/forgotPassword", formValues, {
          headers: { Authorization: token },
        });
        if (data.status === 401) {
          localStorage.removeItem("token");
          history("/");
        } else {
          if (data) {
            toast.success("Password Changed Successfully");
            setTimeout(() => {
              history("/");
            }, 800);
          } else {
            toast.error(data.data.error);
          }
        }
      } catch (err) {
        toast.error(err);
        console.error(err);
      }
      setIsLoading(false);
    }
  };

  return (
    <BasicLayout>
      <div>
        <ToastContainer />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <div style={{ zIndex: "9999", marginLeft: "150px" }}>
            <img src={bgImage} alt="" width="600px" />
          </div>
          <div>
            <div className="background">
              <div className="shape"></div>
              <div className="shape"></div>
            </div>
            <form action="" className="form" style={{ height: "450px" }}>
              <div className="form-inner">
                <h2 style={{ textAlign: "center", color: "#1692b4", marginBottom: "15px" }}>
                  RESET PASSWORD
                </h2>
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
                  <input
                    className="input"
                    type="password"
                    placeholder="Confirm Password"
                    value={cpassword}
                    onChange={(event) => {
                      setCpassword(event.target.value);
                    }}
                  />
                  <button className="glow-on-hover" type="button" onClick={handleResetPassword}>
                    {isLoading ? (
                      <CircularProgress size={24} className={classes.colorPrimary} />
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Cover;
