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
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Box, CircularProgress, Stack } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TitleBox from "components/TitleBox";
function ProgramVideos() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(false);
  const [openVdo, setOpenVdo] = useState(false);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setOpenVdo(true);
  };

  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://13.126.178.112:3000/getAllVideo`, {
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
      setData(responseData.data || []);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
                    PROGRAM VIDEOS
                  </MDTypography>
                </TitleBox>
                <Card>
                  <div style={{ margin: "20px 10px" }}>
                    <List>
                      {data.map((video) => (
                        <ListItem key={video.id} disablePadding>
                          <ListItemButton onClick={() => handleVideoClick(video.video)}>
                            <ListItemIcon>
                              <PlayCircleIcon style={{ color: "#A16205" }} />
                            </ListItemIcon>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <KeyboardArrowRightIcon
                                style={{ color: "#000", marginRight: "5px" }}
                              />
                              <p style={{ fontWeight: "500", color: "black", fontSize: "16px" }}>
                                {video.title.toUpperCase()}
                              </p>
                            </div>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>

                    <Modal
                      open={openVdo}
                      onClose={() => {
                        setOpenVdo(false);
                      }}
                      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                      {/* {console.log(selectedVideo)} */}
                      <video controls style={{ width: "800px" }}>
                        <source src={selectedVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
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
