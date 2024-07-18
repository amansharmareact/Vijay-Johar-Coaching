import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import "../surveylist/data/SurveyList.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState, useEffect } from "react";
import VideoLibrarySharpIcon from "@mui/icons-material/VideoLibrarySharp";
import { Box, CircularProgress, Stack, Tab, Tabs } from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { GrResources } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa";
import TitleBox from "components/TitleBox";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  selectedTab: {
    height: "100%",
  },
}));
function ProgramVideos() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(false);
  const [openVdo, setOpenVdo] = useState(false);
  const [openResourceModal, setOpenResourceModal] = useState(false);
  const [resourceType, setResourceType] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [ppt, setPpt] = useState([]);
  const [video, setVideo] = useState([]);
  const { history } = useNavigate();
  const handleResourceClick = (resource) => {
    setSelectedVideo(resource);
    setOpenVdo(true);
  };
  const [selectedTab, setSelectedTab] = useState("document");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://13.126.178.112:3000/getAllProgram/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const responseData = await response.json();
      setIsLoading(false);
      setData(responseData.data || []);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  const handleProgramById = async (id) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://13.126.178.112:3000/getAllProgram/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      console.log(responseData);
      setVideo(responseData.video);
      setPpt(responseData.ppts);
      setIsLoading(false);
      setData(responseData.data || []);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [openModal, openResourceModal]);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        {isLoading ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <CircularProgress color="primary" size={50} />
          </Box>
        ) : (
          <MDBox pt={5} pb={3} style={{ minHeight: "70vh" }}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TitleBox>
                  <MDTypography variant="h6" color="black" backgroundColor="red">
                    ALL PROGRAMS
                  </MDTypography>
                </TitleBox>
                <Card style={{ width: "100%" }}>
                  <div>
                    <List>
                      {data.map((resource) => (
                        <ListItem key={resource.id} disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <FaBookmark style={{ color: "#A16205" }} />
                            </ListItemIcon>
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ fontWeight: "500", color: "black", fontSize: "16px" }}>
                                {resource.title.toUpperCase()}
                              </div>
                              <div
                                onClick={() => {
                                  setOpenResourceModal(true);
                                  handleProgramById(resource.id);
                                }}
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "800",
                                  color: "gray",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  transition: "color 0.3s, text-decoration 0.3s",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.textDecoration = "underline";
                                  e.target.style.color = "black";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.textDecoration = "none";
                                  e.target.style.color = "gray";
                                }}
                              >
                                Resources
                              </div>
                            </div>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                    <Modal
                      open={openResourceModal}
                      onClose={() => {
                        setOpenResourceModal(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          background: "#DDDBD7",
                          height: 400,
                          width: 400,
                          padding: 20,
                          borderRadius: "15px",
                        }}
                      >
                        <div
                          style={{
                            background: "#1692b4",
                            borderRadius: "30px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "16px",
                              textTransform: "uppercase",
                              fontWeight: "600",
                              width: "100%",
                              textAlign: "center",
                              padding: "10px 20px",
                              color: selectedTab === "document" ? "white" : "black",
                              cursor: "pointer",
                              backgroundColor:
                                selectedTab === "document"
                                  ? "rgba(255, 255, 255, 0.3)"
                                  : "transparent",
                              borderRadius: "30px 0 0 30px",
                            }}
                            onClick={() => handleTabChange("document")}
                          >
                            Document
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              textTransform: "uppercase",
                              fontWeight: "600",
                              textAlign: "center",
                              width: "100%",
                              padding: "10px 20px",
                              color: selectedTab === "video" ? "white" : "black",
                              cursor: "pointer",
                              backgroundColor:
                                selectedTab === "video"
                                  ? "rgba(255, 255, 255, 0.3)"
                                  : "transparent",
                              borderRadius: "0 30px 30px 0",
                            }}
                            onClick={() => handleTabChange("video")}
                          >
                            Video
                          </div>
                        </div>
                        {selectedTab === "document" && (
                          <List>
                            {Object.keys(ppt).map(
                              (key) =>
                                ppt[key] && (
                                  <ListItem key={key} disablePadding>
                                    <ListItemButton component="a" href={ppt[key]} target="_blank">
                                      <ListItemText primary={`${key.toUpperCase()}`} />
                                    </ListItemButton>
                                  </ListItem>
                                )
                            )}
                          </List>
                        )}
                        {selectedTab === "video" && (
                          <div>
                            {Object.keys(video).map(
                              (key) =>
                                video[key] && (
                                  <ListItem key={key} disablePadding>
                                    <ListItemButton
                                      onClick={(videoUrl) => {
                                        setSelectedVideo(videoUrl);
                                        setOpenModal(true);
                                      }}
                                    >
                                      <ListItemText primary={`${key.toUpperCase()}`} />
                                    </ListItemButton>
                                  </ListItem>
                                )
                            )}
                          </div>
                        )}
                        <Modal
                          open={openModal}
                          onClose={() => {
                            setOpenModal(false);
                          }}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            {selectedVideo && (
                              <video style={{ width: "800px" }} controls>
                                <source src={selectedVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </div>
                        </Modal>
                      </div>
                    </Modal>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        )}

        <Footer />
      </DashboardLayout>
    </>
  );
}

export default ProgramVideos;
