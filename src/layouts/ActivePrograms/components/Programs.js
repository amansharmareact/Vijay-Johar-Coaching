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
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import ReactPlayer from "react-player";
import TitleBox from "components/TitleBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  textMiddle: {
    verticalAlign: "middle !important",
    textAlign: "center",
  },
  tablseHeadingCell: {
    textAlign: "center",
    fontWeight: "600",
  },
  tablePadding: {
    padding: "5px",
    textAlign: "center",
    fontSize: "0.8rem",
    fontWeight: "800",
  },
  tableContainerHeight: {
    height: "70vh",
  },
  paperTableHeight: {
    height: "650px",
    width: "95%",
    marginLeft: "2rem",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  "@media (max-width: 780px)": {
    paperTableHeight: {
      marginLeft: "0.75rem",
    },
    tableContainerHeight: {
      maxHeight: "64vh",
    },
  },
  "@media (max-width: 968px)": {
    tableContainerHeight: {
      maxHeight: "64vh",
    },
  },
  "@media (max-width: 480px)": {
    paperTableHeight: {
      marginLeft: "0.75rem",
    },
  },
  tablePaginationStyle: {
    border: "1px solid #0000001a",
    borderRadius: "0rem 0rem 0.4rem 0.4rem",
    overflowY: "hidden",
  },
  tableFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchDesign: {
    borderRadius: "20px",
    boxShadow: "none",
    width: "21%",
  },
}));
const Programs = () => {
  // const classes = useStyles();
  const [courseList, setCourseList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCLoading, setCIsLoading] = useState(true);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getCourseList = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const reduxState = localStorage.getItem("reduxState");
        const email = JSON.parse(reduxState).loginData.email;
        console.log(email);
        const response = await fetch(`http://13.126.178.112:3000/GetAssignCourseofCoach/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await response.json();
        if (data) {
          setCourseList(data.data);
        }
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
                MY PROGRAMS
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
                        <div style={{ fontWeight: "500", color: "#1692b4", fontSize: "16px" }}>
                          {item[1].course_name.toUpperCase()}
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {isCLoading ? ( // Render loading indicator if isLoading is true
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
                              <SimpleTreeView key={id}>
                                <TreeItem
                                  itemId="grid"
                                  label={weekData.weeks}
                                  // className={classes.colorClass}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      width: "100%",
                                      padding: "0px 60px",
                                    }}
                                  >
                                    <div>
                                      {weekData.headings && (
                                        <>
                                          {weekData.headings && (
                                            <>
                                              {JSON.parse(weekData.headings).heading.map(
                                                (heading, index) => (
                                                  <FormControlLabel
                                                    key={index}
                                                    style={{ fontSize: "40px", color: "blue" }}
                                                    control={<Checkbox color="primary" />}
                                                    label={<li key={index}>{heading}</li>}
                                                  />
                                                )
                                              )}
                                            </>
                                          )}
                                          {weekData.headings && (
                                            <>
                                              {JSON.parse(
                                                JSON.parse(weekData.headings).subheading
                                              ).map((subheading, index) => (
                                                <div key={index}>{subheading}</div>
                                              ))}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </div>
                                    <div
                                      style={{
                                        width: "20%",
                                      }}
                                    >
                                      <div style={{}}>
                                        {/* {console.log(weekData)} */}
                                        {weekData.PPT !== undefined &&
                                          weekData.PPT !== "undefined" && (
                                            <Link
                                              href={weekData.PPT}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              download
                                            >
                                              <IconButton color="primary" aria-label="download">
                                                <GetAppIcon />
                                              </IconButton>
                                              {weekData.PPT}
                                            </Link>
                                          )}
                                      </div>
                                      <div>
                                        {weekData.video && (
                                          <Link
                                            href="#"
                                            onClick={() => handleOpenModal(weekData.video)}
                                          >
                                            {weekData.video}
                                          </Link>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </TreeItem>
                              </SimpleTreeView>
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
