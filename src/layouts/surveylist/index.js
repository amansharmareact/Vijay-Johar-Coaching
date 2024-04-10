/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
// Data
import SurveyList from "../surveylist/data/SurveryList.js";
import { Box, CircularProgress, Stack } from "@mui/material";
function Tables() {
  const [isLoading, setIsLoading] = useState(false);
  const [openAddSurvey, setOpenAddSurvey] = useState(false);
  const [pre, setPre] = useState("");
  const [mid, setMid] = useState("");
  const [post, setPost] = useState("");
  const handleOpenAddSurvey = () => {
    setOpenAddSurvey(true);
  };

  const handleCloseAddSurvey = () => {
    setOpenAddSurvey(false);
  };
  const [formData, setFormData] = useState({
    organisation_name: "",
    surveyStartDate: "",
    survey_name: "",
    Max_no_of_participants: "",
    language: "",
    survey_type: "",
    survey_questions: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    setIsLoading(true);
    const formDataValues = Object.values(formData);
    if (formDataValues.some((value) => value === "")) {
      toast.error("Please fill in all the fields");
      setIsLoading(false);

      return; // Exit the function early if any field is empty
    }
    var url = "http://13.126.178.112:3000/createSurvey";
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data.status);
      if (data.status !== 200) {
        toast.error("Create a Valid Survey");
      } else {
        toast.success("Survey Created Successfully");
      }
      setIsLoading(false);
      setOpenAddSurvey(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleReset = () => {
    setFormData({
      organisation_name: "",
      surveyStartDate: "",
      survey_name: "",
      Max_no_of_participants: "",
      language: "",
      survey_type: "",
      survey_questions: "",
    });
  };
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
          <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                      SURVEY LIST
                    </MDTypography>
                  </MDBox>
                  <Stack spacing={2} pt={3} px={4} direction="row">
                    <Button
                      variant="contained"
                      style={{ color: "white", backgroundColor: "#237DEA" }}
                      onClick={handleOpenAddSurvey}
                    >
                      Create Survey
                    </Button>
                    <Button style={{ color: "white", backgroundColor: "#237DEA" }}>All</Button>

                    <Button
                      color="primary"
                      style={{ color: "white", backgroundColor: "#237DEA" }}
                      onClick={() => {
                        setPre("pre");
                      }}
                    >
                      Pre Program
                    </Button>
                    <Button
                      color="primary"
                      style={{ color: "white", backgroundColor: "#237DEA" }}
                      onClick={() => {
                        setMid("mid");
                      }}
                    >
                      Mid Program
                    </Button>
                    <Button
                      color="primary"
                      style={{ color: "white", backgroundColor: "#237DEA" }}
                      onClick={() => {
                        setPost("post");
                      }}
                    >
                      Post Program
                    </Button>
                  </Stack>
                  <MDBox pt={3} style={{ height: "100%" }}>
                    <SurveyList pre={pre} mid={mid} post={post} />
                    {/* <DataTable
                      table={{ columns: columns, rows: rows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    /> */}
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        )}

        <Footer />
      </DashboardLayout>
      <Dialog open={openAddSurvey} onClose={handleCloseAddSurvey}>
        <DialogTitle>Create Survey</DialogTitle>
        <DialogContent>
          <>
            <ToastContainer />

            {isLoading ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "70vh",
                  width: "70vh",
                }}
              >
                <CircularProgress color="primary" size={50} />
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Organisation Name"
                  name="organisation_name"
                  value={formData.organisation_name}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Survey Start Date"
                  name="surveyStartDate"
                  type="date"
                  value={formData.surveyStartDate}
                  onChange={handleChange}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Survey Name"
                  name="survey_name"
                  value={formData.survey_name}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Max Number of Participants"
                  name="Max_no_of_participants"
                  type="number"
                  value={formData.Max_no_of_participants}
                  onChange={handleChange}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal" style={{ height: "42px" }}>
                  <InputLabel id="language-label" style={{ fontSize: "14px", height: "42px" }}>
                    Language
                  </InputLabel>
                  <Select
                    style={{ height: "100px" }}
                    labelId="language-label"
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="spanish">हिंदी</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" style={{ height: "42px" }}>
                  <InputLabel id="survey-type-label" style={{ fontSize: "14px", height: "42px" }}>
                    Survey Type
                  </InputLabel>
                  <Select
                    labelId="survey-type-label"
                    id="surveyType"
                    name="survey_type"
                    value={formData.survey_type}
                    style={{ height: "100px" }}
                    onChange={handleChange}
                  >
                    <MenuItem value="pre">Pre Program</MenuItem>
                    <MenuItem value="mid">Mid Program</MenuItem>
                    <MenuItem value="post">Post Program</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" style={{ height: "42px" }}>
                  <InputLabel id="survey-type-label" style={{ fontSize: "14px", height: "42px" }}>
                    Survey Questions
                  </InputLabel>
                  <Select
                    labelId="survey-type-label"
                    id="surveyType"
                    name="survey_questions"
                    style={{ height: "100px" }}
                    value={formData.survey_questions}
                    onChange={handleChange}
                  >
                    <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
                    <MenuItem value="shortAnswer">Short Answer</MenuItem>
                    <MenuItem value="ratingScale">Rating Scale</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginRight: "8px", marginTop: "20px", color: "white" }}
                >
                  Create Survey
                </Button>
                <Button
                  variant="contained"
                  onClick={handleReset}
                  style={{ marginTop: "20px", color: "white", backgroundColor: "gray" }}
                >
                  Reset
                </Button>
              </form>
            )}
          </>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Tables;
