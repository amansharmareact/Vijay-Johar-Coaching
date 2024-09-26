import React, { useState } from "react";
import axios from "axios";

// import { compose } from "redux";
import { toast } from "react-toastify";

const instance = axios.create({
  // baseURL: "http://54.211.209.176:8000/user",
  baseURL: "http://localhost:8000/user",
});

// customer and admin secure
instance.defaults.headers.common["language"] = window.localStorage.getItem("rcml-lang") || "en";
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
if (localStorage.accessToken) {
  const JWT_token = localStorage.accessToken;
  instance.defaults.headers.common["access_token"] = JWT_token;
}

export default instance;
