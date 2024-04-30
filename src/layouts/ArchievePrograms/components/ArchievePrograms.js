import React, { useEffect, useState } from "react";
import { Box, Card, CircularProgress, Grid, Typography, Link, Modal } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import { FormControlLabel, Checkbox } from "@mui/material";
import ReactPlayer from "react-player";
import TitleBox from "components/TitleBox";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
const useStyles = makeStyles({
  customTreeItem: {
    // Add your custom styles here
    // For example:
    color: "#000000",
  },
  MuiSelectedContent: {
    // Add styles for selected state
    backgroundColor: "transparent",
  },
});
const Programs = () => {
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState(false);
  const [courseList, setCourseList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCLoading, setCIsLoading] = useState(true);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = React.useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, 500);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  const [truee, setTruee] = useState(false);

  useEffect(() => {
    const getCourseList = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const reduxState = localStorage.getItem("reduxState");
        const email = JSON.parse(reduxState).loginData.email;
        const response = await fetch(`http://13.126.178.112:3000/GetAssignCourseofCoach/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await response.json();
        const activePrograms = data.data.filter((item) => item.archives);
        console.log(activePrograms);
        setCourseList(activePrograms);
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 600);

        return () => clearTimeout(timer);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getCourseList();
  }, []);
  const trackCourse = async (week, checked) => {
    setTruee(!truee);
    try {
      const reduxState = localStorage.getItem("reduxState");
      const email = JSON.parse(reduxState).loginData.email;
      if (expandedCourseId !== null) {
        const url = `http://13.126.178.112:3000/activeCourse/${email}/${expandedCourseId}/${week}`;
        const token = localStorage.getItem("token");
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ actives: checked }),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getCourseData = async () => {
      setCIsLoading(true);

      try {
        if (expandedCourseId !== null) {
          const url = `http://13.126.178.112:3000/getCoursebyId/${expandedCourseId}`;
          const token = localStorage.getItem("token");
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });
          const data = await response.json();
          setCourseData(data.data?.details);
          const timer = setTimeout(() => {
            setCIsLoading(false);
          }, 300);

          return () => clearTimeout(timer);
        }
      } catch (err) {
        setCIsLoading(false);
      }
    };

    getCourseData();
  }, [expandedCourseId]);

  const handleOpenModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };
  const sortedCourseData = courseData.sort((a, b) => {
    const weekA = parseInt(a.weeks.split(" ")[1]);
    const weekB = parseInt(b.weeks.split(" ")[1]);
    return weekA - weekB;
  });
  return (
    <Box mb={3}>
      <Grid container style={{ position: "relative", minHeight: "100vh" }}>
        {isLoading && (
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              zIndex: 9999,
            }}
          >
            <CircularProgress color="primary" size={50} />
          </Box>
        )}
        {!isLoading && (
          <Grid item xs={12} lg={12}>
            <TitleBox>
              <MDTypography variant="h6" color="black" backgroundColor="red">
                ARCHIEVE PROGRAMS
              </MDTypography>
            </TitleBox>
            <MDBox>
              {(courseList !== null || courseList.length <= 0) &&
                Object.entries(courseList).map((item, index) => (
                  <Accordion
                    key={index}
                    style={{
                      marginTop: "20px",
                      borderRadius: "5px",
                      backgroundColor: "white",
                      width: "160vh",
                    }}
                    onChange={() => {
                      setExpandedCourseId(item[1]?.course_id);
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      style={{ height: "60px" }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                      >
                        <CalendarMonthIcon
                          style={{ marginRight: "10px", color: "#1692b4", fontWeight: "800" }}
                        />
                        <div style={{ fontWeight: "500", color: "#00000", fontSize: "16px" }}>
                          {item[1].course_name !== undefined && item[1].course_name.toUpperCase()}
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {isCLoading ? (
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
                        <SimpleTreeView>
                          {sortedCourseData !== null || sortedCourseData.length <= 0 ? (
                            sortedCourseData.map((weekData, id) => (
                              <>
                                <SimpleTreeView key={id}>
                                  <TreeItem
                                    itemId="grid"
                                    label={weekData.weeks}
                                    classes={{
                                      root: classes.customTreeItem,
                                      content: `${classes.MuiSelectedContent} .css-1xqquov-MuiTreeItem-content`,
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        padding: "15px 20px",
                                      }}
                                    >
                                      <div>
                                        {weekData.headings && (
                                          <>
                                            {weekData.headings && (
                                              <>
                                                {JSON.parse(weekData.headings).heading.map(
                                                  (heading, index) => (
                                                    <div
                                                      key={index}
                                                      style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "flex-start",
                                                      }}
                                                    >
                                                      <Checkbox
                                                        checked={weekData.active}
                                                        onChange={(e) => {
                                                          const newActiveState = e.target.checked;
                                                          setCourseData((prevCourseData) => {
                                                            const updatedCourseData =
                                                              prevCourseData.map((week) =>
                                                                week.weeks === weekData.weeks
                                                                  ? {
                                                                      ...week,
                                                                      active: newActiveState,
                                                                    }
                                                                  : week
                                                              );
                                                            return updatedCourseData;
                                                          });
                                                          trackCourse(
                                                            weekData.weeks,
                                                            newActiveState
                                                          );
                                                        }}
                                                        style={{
                                                          color: "#000",
                                                          cursor: "pointer",
                                                          marginRight: "10px",
                                                        }}
                                                      />
                                                      <div
                                                        style={{
                                                          fontSize: "18px",
                                                          color: "#000",
                                                          display: "inline-block",
                                                          verticalAlign: "middle",
                                                        }}
                                                      >
                                                        {heading}
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                              </>
                                            )}
                                            <div style={{ padding: "10px 30px" }}>
                                              {weekData.headings && (
                                                <>
                                                  {JSON.parse(
                                                    JSON.parse(weekData.headings).subheading
                                                  ).map((subheading, index) => (
                                                    <div key={index}>{subheading}</div>
                                                  ))}
                                                </>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <div style={{ textAlign: "center", fontSize: "30px" }}>
                                          {/* {console.log(weekData)} */}
                                          {weekData.PPT !== undefined &&
                                            weekData.PPT !== "undefined" && (
                                              <Link
                                                href={weekData.PPT}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                              >
                                                <IconButton
                                                  aria-label="download"
                                                  style={{ fontSize: "30px" }}
                                                >
                                                  <PictureAsPdfIcon style={{ color: "#1692b4" }} />
                                                </IconButton>
                                              </Link>
                                            )}
                                        </div>
                                        <div style={{ fontSize: "30px", display: "flex" }}>
                                          {weekData.video && (
                                            <YouTubeIcon
                                              onClick={() => handleOpenModal(weekData.video)}
                                              style={{ color: "#1692b4", cursor: "pointer" }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </TreeItem>
                                </SimpleTreeView>
                              </>
                            ))
                          ) : (
                            <>
                              {Object.keys(courseList).length === 0 && !isLoading && (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "50vh",
                                  }}
                                >
                                  <h2>No Course Found</h2>
                                </div>
                              )}
                            </>
                          )}
                        </SimpleTreeView>
                      )}
                    </AccordionDetails>
                    {/* <LinearProgress style={{ width: "160vh", overflow: "hidden" }} /> */}
                  </Accordion>
                ))}
            </MDBox>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                }}
              >
                <ReactPlayer url={selectedVideo} controls={true} width="100%" height="100%" />
              </Box>
            </Modal>
          </Grid>
        )}
        {Object.keys(courseList).length === 0 && !isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "50vh",
            }}
          >
            <h2>No Course Found</h2>
          </div>
        )}
      </Grid>
    </Box>
  );
};

export default Programs;
