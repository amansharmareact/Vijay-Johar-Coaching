import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  Grid,
  Typography,
  Link,
  Modal,
  Tooltip,
  IconButton,
  FormControlLabel,
  Checkbox,
  LinearProgress,
  Button,
} from "@mui/material";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ReactPlayer from "react-player";
import TitleBox from "components/TitleBox";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import "./Programs.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify

const useStyles = makeStyles({
  customTreeItem: {
    color: "#000000",
  },
  MuiSelectedContent: {
    backgroundColor: "transparent",
  },
});

const Programs = () => {
  const classes = useStyles();
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCLoading, setCIsLoading] = useState(true);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState({});
  const calenderRef = useRef(null);
  const history = useNavigate();

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
        if (response.status === 401) {
          localStorage.removeItem("token");
          history("/");
        } else {
          const activePrograms = data.data.filter((item) => !item.archives);
          setCourseList(activePrograms);
          setAccordionOpen(Array.from({ length: activePrograms.length }, () => false));
          setTimeout(() => {
            setIsLoading(false);
          }, 600);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    getCourseList();
  }, []);

  const trackCourse = async (courseId, checked, week_name, detailsId) => {
    try {
      const reduxState = localStorage.getItem("reduxState");
      const email = JSON.parse(reduxState).loginData.email;
      if (expandedCourseId !== null) {
        const url = `http://13.126.178.112:3000/activeCourse/${email}/${courseId}/${week_name}/${detailsId}`;
        const token = localStorage.getItem("token");
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ actives: checked }),
        });
        setCheckboxStates((prevState) => ({
          ...prevState,
          [detailsId]: checked,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getCourseData = async () => {
      if (expandedCourseId !== null) {
        setCIsLoading(true);
        try {
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
          console.log(data.details);
          setCourseData(data?.details || []);
          setTimeout(() => {
            setCIsLoading(false);
          }, 300);
        } catch (err) {
          setCIsLoading(false);
        }
      }
    };
    getCourseData();
  }, [expandedCourseId, checkboxStates]);

  const handleOpenModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  const handleAccordionChange = (index) => {
    setAccordionOpen((prevOpen) => {
      const newAccordionOpen = prevOpen.map((isOpen, i) => (i === index ? !isOpen : false));
      return newAccordionOpen;
    });
    setExpandedCourseId(courseList[index].course_id);
  };

  const sortWeeks = (weeks) => {
    return weeks.sort((a, b) => {
      const weekA = parseInt(a.week_name.replace(/\D/g, ""), 10);
      const weekB = parseInt(b.week_name.replace(/\D/g, ""), 10);
      return weekA - weekB;
    });
  };
  const [calendarShow, setCalendarShow] = useState(false);
  const onOpenModal = () => {
    setCalendarShow(true);
  };

  const onCloseCalendarModal = () => {
    setCalendarShow(false);
  };
  const [calenderWeek, setCalenderWeek] = useState();
  const [value, onChange] = useState(new Date());
  const [courseId, setCourseId] = useState();
  const scheduleWeek = async () => {
    const formattedDate = moment(value).format("DD-MM-YYYY");
    const reduxState = localStorage.getItem("reduxState");
    const email = JSON.parse(reduxState).loginData.email;
    const token = localStorage.getItem("token");
    console.log(courseId);
    const url = `http://13.126.178.112:3000/datePostCoach/${email}/${courseId}/${calenderWeek}`;
    try {
      const data = await axios.put(
        url,
        {
          week_date: formattedDate,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCalendarShow(false);
      toast.success(`${calenderWeek} scheduled on ${formattedDate}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box mb={3} style={{ minHeight: "60vh" }}>
      <Grid container style={{ position: "relative" }}>
        {isLoading && (
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "70vh",
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
                ACTIVE PROGRAMS
              </MDTypography>
              <ToastContainer style={{ fontSize: "18px" }} />
            </TitleBox>
            <MDBox>
              {courseList.length > 0 ? (
                courseList.map((course, index) => (
                  <Accordion
                    key={index}
                    style={{
                      marginTop: "20px",
                      borderRadius: "5px",
                      backgroundColor: "white",
                      width: "100%",
                    }}
                    onChange={() => handleAccordionChange(index)}
                    expanded={accordionOpen[index] || false}
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
                        <Tooltip title={`Start Date: ${course.date}`} arrow>
                          <CalendarMonthIcon
                            style={{ marginRight: "10px", color: "#A16205", fontWeight: "800" }}
                          />
                        </Tooltip>
                        <div style={{ fontWeight: "500", color: "#00000", fontSize: "16px" }}>
                          {course.course_name?.toUpperCase()}
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <SimpleTreeView>
                        {courseData.length > 0 ? (
                          sortWeeks(courseData).map((weekData, id) => (
                            <TreeItem
                              key={id}
                              itemId={`week-${id}`}
                              label={
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography>{weekData.week_name}</Typography>
                                  <CalendarMonthIcon
                                    style={{
                                      marginRight: "10px",
                                      color: "#A16205",
                                      fontWeight: "800",
                                    }}
                                    onMouseEnter={() => {
                                      onOpenModal();
                                      setCourseId(course.course_id);
                                      setCalenderWeek(weekData?.week_name);
                                    }}
                                  />
                                </div>
                              }
                              classes={{
                                root: classes.customTreeItem,
                                content: `${classes.MuiSelectedContent} .css-1xqquov-MuiTreeItem-content`,
                              }}
                            >
                              {Object.keys(weekData)
                                .filter((key) => key.startsWith("details"))
                                .map((key, i) => {
                                  const details = weekData[key];
                                  return (
                                    <div key={i}>
                                      <div
                                        style={{
                                          padding: "10px 0px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <div
                                          style={{
                                            padding: "10px 20px",
                                            display: "flex",
                                          }}
                                        >
                                          <div>
                                            <div>
                                              <div className="checkbox-wrapper-19">
                                                <input
                                                  type="checkbox"
                                                  id={`cbtest-19-${id}-${i}`}
                                                  checked={
                                                    checkboxStates[details.id] ?? details.active
                                                  }
                                                  onChange={(e) =>
                                                    trackCourse(
                                                      course.course_id,
                                                      e.target.checked,
                                                      weekData.week_name,
                                                      details.id
                                                    )
                                                  }
                                                />
                                                <label
                                                  htmlFor={`cbtest-19-${id}-${i}`}
                                                  className="check-box"
                                                ></label>
                                              </div>
                                            </div>
                                          </div>
                                          {details.headings && (
                                            <div>
                                              {JSON.parse(details.headings).heading.map(
                                                (heading, index) => (
                                                  <Typography
                                                    key={index}
                                                    style={{
                                                      fontSize: "18px",
                                                      color: "black",
                                                      fontWeight: "600",
                                                    }}
                                                  >
                                                    {heading}
                                                  </Typography>
                                                )
                                              )}
                                              <div>
                                                {Array.isArray(
                                                  JSON.parse(details.headings).subheading
                                                ) ? (
                                                  JSON.parse(details.headings).subheading.map(
                                                    (subheading, index) => (
                                                      <Typography
                                                        key={index}
                                                        variant="body2"
                                                        color="black"
                                                      >
                                                        {subheading}
                                                      </Typography>
                                                    )
                                                  )
                                                ) : (
                                                  <Typography variant="body2" color="black">
                                                    {JSON.parse(details.headings).subheading}
                                                  </Typography>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                          <div>
                                            {
                                              <div
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <IconButton
                                                  href={details.PPT}
                                                  download
                                                  target="_blank"
                                                >
                                                  <PictureAsPdfIcon style={{ color: "#1692b4" }} />
                                                </IconButton>
                                                <Typography variant="body2" color="black">
                                                  {`PPT ${i + 1}`}
                                                </Typography>
                                              </div>
                                            }
                                            {details.video && (
                                              <div
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <IconButton
                                                  onClick={() => handleOpenModal(details.video)}
                                                >
                                                  <YouTubeIcon style={{ color: "#1692b4" }} />
                                                </IconButton>
                                                <Typography variant="body2" color="black">
                                                  {`Video ${i + 1}`}
                                                </Typography>
                                              </div>
                                            )}
                                          </div>
                                          <div
                                            style={{
                                              width: "0",
                                              height: "90px",
                                              marginLeft: "30px",
                                              borderLeft: "5px solid black",
                                              transition: "borderColor 0.3s ease",
                                              borderColor: details.active ? "green" : "#A16205",
                                              borderTopLeftRadius: "15px",
                                              borderBottomLeftRadius: "15px",
                                            }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </TreeItem>
                          ))
                        ) : (
                          <div>No Course Data Found</div>
                        )}
                      </SimpleTreeView>
                    </AccordionDetails>
                    <Modal
                      open={calendarShow}
                      onClose={onCloseCalendarModal}
                      aria-labelledby="calendar-modal-title"
                      aria-describedby="calendar-modal-description"
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "white",
                        }}
                      >
                        <Calendar onChange={onChange} value={value} />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Button onClick={onCloseCalendarModal}>Close</Button>
                          <Button
                            onClick={() => {
                              scheduleWeek();
                            }}
                          >
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </Modal>
                  </Accordion>
                ))
              ) : (
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
                <ReactPlayer url={selectedVideo} controls width="100%" height="100%" />
              </Box>
            </Modal>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Programs;
