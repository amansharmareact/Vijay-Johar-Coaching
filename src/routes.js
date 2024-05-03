// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SurveyList from "layouts/surveylist/index";
import ActivePrograms from "layouts/ActivePrograms/index";
import SignIn from "layouts/authentication/sign-in";
import ArchievePrograms from "layouts/ArchievePrograms/index";

// @mui icons
import Icon from "@mui/material/Icon";
import ProgramVideos from "layouts/programvideos/ProgramVideos";
import VideoLibrarySharpIcon from "@mui/icons-material/VideoLibrarySharp";
import AllPrograms from "layouts/allprograms/AllPrograms";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { FaBookmark } from "react-icons/fa";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "My Surveys",
    key: "my-surveys",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/my-surveys",
    component: <SurveyList />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Active Programs",
    key: "active-programs",
    icon: <BeenhereIcon />,
    route: "/active-programs",
    component: <ActivePrograms />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Archieve Programs",
    key: "archieve-programs",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/archieve-programs",
    component: <ArchievePrograms />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "All Programs",
    key: "all-programs",
    icon: <FaBookmark />,
    route: "/all-programs",
    component: <AllPrograms />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Program Videos",
    key: "program-videos",
    icon: <PlayCircleIcon />,
    route: "/program-videos",
    component: <ProgramVideos />,
    isPrivate: true,
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
