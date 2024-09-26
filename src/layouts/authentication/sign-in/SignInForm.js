import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@mui/material";
import bgImage from "assets/images/signin-bg.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css";
import { saveLoginData } from "../../../Redux/loginSlice";
import "./SignInForm.css";
import axios from "../../../axios";
const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    color: "red",
  },
}));
const SignInForm = () => {
  const classes = useStyles();
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
    const formValues = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("/signin", formValues);
      console.log(response);
      if (response.status === 401) {
        localStorage.removeItem("token");
        history("/");
      } else {
        if (response && response.data.access_Token) {
          localStorage.setItem("token", response.data.access_Token);
          dispatch(saveLoginData(response.data.data));
          toast.success("Login Successful");
          setTimeout(() => {
            history("/dashboard");
          }, 800);
        }
        toast.error(response.error);
      }
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <ToastContainer />

        <div style={{ zIndex: "9999", marginLeft: "150px" }}>
          <img src={bgImage} alt="" width="600px" />
        </div>
        <div>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form action="" className="form">
            <div className="form-inner">
              <h2 style={{ textAlign: "center", color: "#1692b4", marginBottom: "15px" }}>LOGIN</h2>
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
                    <CircularProgress size={24} className={classes.colorPrimary} />
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
