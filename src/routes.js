// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SurveyList from "layouts/surveylist/index";
import ActivePrograms from "layouts/ActivePrograms/index";
import SignIn from "layouts/authentication/sign-in";
import ArchievePrograms from "layouts/ArchievePrograms/index";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
// @mui icons
import Icon from "@mui/material/Icon";
import ProgramVideos from "layouts/programvideos/ProgramVideos";
import VideoLibrarySharpIcon from "@mui/icons-material/VideoLibrarySharp";
import AllPrograms from "layouts/allprograms/AllPrograms";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { FaBookmark } from "react-icons/fa";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import Cover from "layouts/authentication/reset-password/cover";
import PreProgramForm from "layouts/surveylist/components/PreProgramForm";
import MidProgram from "layouts/surveylist/components/MidProgram";
import PostProgram from "layouts/surveylist/components/PostProgram";
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
    name: "Archive Programs",
    key: "archive-programs",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/archive-programs",
    component: <ArchievePrograms />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Forgot Password",
    key: "sign-in",
    icon: <VpnKeyIcon />,
    route: "/reset-password",
    component: <Cover />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/",
    component: <SignIn />,
  },
  {
    type: "forms",
    name: "Pre Program",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/pre-program-form",
    component: <PreProgramForm />,
  },
  {
    type: "forms",
    name: "Mid Program",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/mid-program-form",
    component: <MidProgram />,
  },
  {
    type: "forms",
    name: "Mid Program",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/post-program-form",
    component: <PostProgram />,
  },
];

export default routes;
