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

function ProgramVideos() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(false);
  const [openVdo, setOpenVdo] = useState(false);
  const [openResourceModal, setOpenResourceModal] = useState(false);
  const [resourceType, setResourceType] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [ppt, setPpt] = useState([]);
  const [video, setVideo] = useState([]);
  const handleResourceClick = (resource) => {
    setSelectedVideo(resource);
    setOpenVdo(true);
  };
  const [selectedTab, setSelectedTab] = useState("document");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://13.126.178.112:3000/getAllProgram`, {
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
      console.log(responseData.data);
      setIsLoading(false);
      setData(responseData.data || []);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  const handleProgramById = async (id) => {
    console.log(id);
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
          <MDBox pt={5} pb={3}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TitleBox>
                  <MDTypography variant="h6" color="black" backgroundColor="red">
                    ALL PROGRAMS
                  </MDTypography>
                </TitleBox>
                <Card>
                  <div>
                    <List>
                      {data.map((resource) => (
                        <ListItem key={resource.id} disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <FaBookmark style={{ color: "#A16205" }} />
                            </ListItemIcon>
                            <ListItemText primary={resource.title.toUpperCase()} />
                            <ListItemIcon>
                              <div
                                onClick={() => {
                                  setOpenResourceModal(true);
                                  handleProgramById(resource.id);
                                }}
                                style={{
                                  fontSize: "14px",
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
                              {/* <GrResources
                                onClick={() => {
                                  setOpenResourceModal(true);
                                  handleProgramById(resource.id);
                                }}
                              /> */}
                            </ListItemIcon>
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
                        <Tabs
                          style={{
                            background: "#3892EE",
                            color: "white",
                          }}
                          value={selectedTab}
                          onChange={handleTabChange}
                        >
                          <Tab value="document" label="Document" />
                          <Tab value="video" label="Video" />
                        </Tabs>
                        {selectedTab === "document" && (
                          <List>
                            {Object.keys(ppt).map(
                              (key) =>
                                ppt[key] && (
                                  <ListItem key={key} disablePadding>
                                    <ListItemButton component="a" href={ppt[key]} target="_blank">
                                      <ListItemText primary={`${key}`} />
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
                                      <ListItemText primary={`${key}`} />
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
