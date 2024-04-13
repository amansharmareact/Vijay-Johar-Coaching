// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SurveyList from "layouts/surveylist/index";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import ActivePrograms from "layouts/ActivePrograms/index";
import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "My Surveys",
    key: "my-surveys",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/my-surveys",
    component: <SurveyList />,
  },
  {
    type: "collapse",
    name: "Active Programs",
    key: "active-programs",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/active-programs",
    component: <ActivePrograms />,
  },
  // {
  //   type: "collapse",
  //   name: "Archive Programs",
  //   key: "archive-programs",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/archive-programs",
  //   component: <Notifications />,
  // },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
