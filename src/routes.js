// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SurveyList from "layouts/surveylist/index";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import ActivePrograms from "layouts/ActivePrograms/index";
import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";
import ProgramVideos from "layouts/programvideos/ProgramVideos";
import VideoLibrarySharpIcon from "@mui/icons-material/VideoLibrarySharp";
import AllPrograms from "layouts/allprograms/AllPrograms";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { FaBookmark } from "react-icons/fa";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
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
  {
    type: "collapse",
    name: "Program Videos",
    key: "program-videos",
    icon: <PlayCircleIcon />,
    route: "/program-videos",
    component: <ProgramVideos />,
  },
  {
    type: "collapse",
    name: "All Programs",
    key: "all-programs",
    icon: <FaBookmark />,
    route: "/all-programs",
    component: <AllPrograms />,
  },
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
    route: "/",
    component: <SignIn />,
  },
];

export default routes;
