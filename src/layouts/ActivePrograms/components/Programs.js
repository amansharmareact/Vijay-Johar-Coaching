import { Box, Card, CircularProgress, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SimpleTreeView, SimpleTreeViewRoot } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
const Programs = () => {
  const [courseList, setCourseList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const getCourseData = async (values) => {
    // setLoginValues(values);
    var url = `http://13.126.178.112:3000/getCoursebyId/${expandedCourseId}`;

    try {
      const token = localStorage.getItem("token");
      if (expandedCourseId !== null) {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const dataa = await response.json();
        console.log(dataa.data.details);
        setCourseData(dataa.data.details);
      }
    } catch (err) {
      // setIsLoading(false);
      // toast.error(`Wrong Email or Password`, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
  };
  const getCourseList = async (values) => {
    // setLoginValues(values);
    setIsLoading(true);
    var url = "http://13.126.178.112:3000/getAllCourse";

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data) {
        // Redirect or do something after successful login
        setCourseList(data);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCourseList();
  }, []);
  useEffect(() => {
    getCourseData();
  }, [expandedCourseId]);
  return (
    <MDBox mb={3}>
      <Grid container>
        {isLoading ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
              width: "100%",
            }}
          >
            <CircularProgress color="primary" size={50} />
          </Box>
        ) : (
          <Grid item xs={12} lg={12}>
            <MDBox p={2}>
              <MDTypography variant="h3">My Programs</MDTypography>
            </MDBox>
            <div>
              {courseList &&
                Object.entries(courseList).map((item, index) => (
                  <Accordion
                    key={index}
                    style={{ marginTop: "20px", borderRadius: "10px", backgroundColor: "#C4E4FF" }}
                    onChange={() => {
                      setExpandedCourseId(item[1].course_id);
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      {item[1].course_name}
                    </AccordionSummary>
                    <AccordionDetails>
                      <SimpleTreeView>
                        {courseData.map((weekData, weekIndex) => (
                          // <TreeItem
                          //   key={`week-${weekData}`}
                          //   nodeId={`week-${weekData}`}
                          //   label={`Week ${weekData + 1}`}
                          // >
                          //   <TreeItem
                          //     key={`ppt-${weekData}`}
                          //     nodeId={`ppt-${weekData}`}
                          //     label={weekData.PPT || "PPT: N/A"}
                          //   />
                          //   <TreeItem
                          //     key={`headings-${weekData}`}
                          //     nodeId={`headings-${weekData}`}
                          //     label={`Headings: ${weekData.headings}`}
                          //   />
                          //   <TreeItem
                          //     key={`video-${weekData}`}
                          //     nodeId={`video-${weekData}`}
                          //     label={`Video: ${weekData.video || "N/A"}`}
                          //   />
                          //   <TreeItem
                          //     key={`date-${weekData}`}
                          //     nodeId={`date-${weekData}`}
                          //     label={`Date: ${weekData.date}`}
                          //   />
                          //   <TreeItem
                          //     key={`time-${weekData}`}
                          //     nodeId={`time-${weekData}`}
                          //     label={`Time: ${weekData.time}`}
                          //   />
                          // </TreeItem>
                          <div key={weekIndex}>{weekData.weeks}</div>
                        ))}
                      </SimpleTreeView>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
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
    </MDBox>
  );
};

export default Programs;
