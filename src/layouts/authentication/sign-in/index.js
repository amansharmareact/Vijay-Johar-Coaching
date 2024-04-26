import React from "react";
import Card from "@mui/material/Card";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import SignInForm from "./SignInForm";
import bgImage from "assets/images/bgv.png";

function Basic() {
  return (
    <BasicLayout>
      <SignInForm />
    </BasicLayout>
  );
}

export default Basic;
