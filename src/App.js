import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import SignIn from "layouts/authentication/sign-in";
import PreProgramForm from "layouts/surveylist/components/PreProgramForm";
import { Switch } from "@mui/material";
import MidProgram from "layouts/surveylist/components/MidProgram";
import PostProgram from "layouts/surveylist/components/PostProgram";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const history = useNavigate();
  const [pre, setPre] = useState(false);
  const [post, setPost] = useState(false);
  const [mid, setMid] = useState(false);
  const [logout, setLogout] = useState(false);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (pathname === "/") {
      localStorage.removeItem("token");
      localStorage.removeItem("reduxState");
      history("/");
    }
    if (!token) {
      if (pathname === "/pre-program-form") {
        setPre(true);
        history("/pre-program-form");
      } else if (pathname === "/mid-program-form") {
        setMid(true);
        history("/mid-program-form");
      } else if (pathname === "/post-program-form") {
        setPost(true);
        history("/post-program-form");
      } else if (pathname === "/") {
        history("/");
        setLogout(true);
      }
    }
  }, [token, history, pathname]);

  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        <ToastContainer />
        {console.log(direction)}
        {layout === "dashboard" && (
          <>
            {pre || mid || post ? (
              <> </>
            ) : (
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="Pro Growth Leadership & Business Coaching"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
            )}
            {/* <Configurator /> */}
            {console.log(layout, "this is layourtt")}
            {configsButton}
          </>
        )}
        <Routes>
          {!token ? (
            <>
              {pre && <Route path="/pre-program-form" element={<PreProgramForm />} />}
              {mid && <Route path="/mid-program-form" element={<MidProgram />} />}
              {post && <Route path="/post-program-form" element={<PostProgram />} />}
              {logout && <Route path="/" element={<SignIn />} />}
            </>
          ) : (
            getRoutes(routes)
          )}
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          {pre || mid || post ? (
            <> </>
          ) : (
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Pro Growth Leadership & Business Coaching"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          )}
          {console.log(pre, mid, post)}
          {/* <Configurator /> */}
          {/* {configsButton} */}
        </>
      )}

      <Routes>
        {!token ? (
          <>
            {console.log("pre", pathname)}
            {pre && <Route path="/pre-program-form" element={<PreProgramForm />} />}
            {mid && <Route path="/mid-program-form" element={<MidProgram />} />}
            {post && <Route path="/post-program-form" element={<PostProgram />} />}
            {logout && <Route path="/" element={<SignIn />} />}
          </>
        ) : (
          getRoutes(routes)
        )}
      </Routes>
    </ThemeProvider>
  );
}
