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
import "./data/SurveyList.css";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState, useEffect } from "react";
// Data
import { Box, CircularProgress, Stack } from "@mui/material";
import TitleBox from "components/TitleBox";
function Tables() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openAddSurvey, setOpenAddSurvey] = useState(false);
  const [pre, setPre] = useState("");
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
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [surveyName, setSurveyName] = useState("");
  const handleSaveSurveyName = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://13.126.178.112:3000/updateSurveyById/${selectedSurveyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },

          body: JSON.stringify({ survey_name: surveyName }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      toast.success("Survey Name Updated Successfully");
      setIsLoading(false);
      setModal(false);
      const timer = setTimeout(() => {
        fetchData();
      }, 200); // Fetch data after one second

      return () => clearTimeout(timer);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
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
  const fetchData = async () => {
    console.log(pre);
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://13.126.178.112:3000/getAllSurvey${pre}`, {
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
  }, [pre]);
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
          <MDBox pt={5} pb={3}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TitleBox>
                  <MDTypography variant="h6" color="black" backgroundColor="red">
                    SURVEY LIST
                  </MDTypography>
                </TitleBox>
                <Card>
                  <Stack spacing={2} pt={3} px={4} direction="row">
                    <Button
                      variant="contained"
                      style={{ color: "white", backgroundColor: "#237DEA" }}
                      onClick={handleOpenAddSurvey}
                    >
                      Create Survey
                    </Button>
                    <Button
                      color="warning"
                      style={{ color: "black" }}
                      variant="contained"
                      onClick={() => {
                        setPre("");
                      }}
                    >
                      All
                    </Button>

                    <Button
                      color="warning"
                      variant="contained"
                      style={{ color: "black" }}
                      onClick={() => {
                        setPre("/Pre");
                      }}
                    >
                      Pre Program
                    </Button>
                    <Button
                      color="warning"
                      variant="contained"
                      style={{ color: "black" }}
                      onClick={() => {
                        setPre("/Mid");
                      }}
                    >
                      Mid Program
                    </Button>
                    <Button
                      color="warning"
                      variant="contained"
                      style={{ color: "black" }}
                      onClick={() => {
                        setPre("/Post");
                      }}
                    >
                      Post Program
                    </Button>
                  </Stack>
                  <MDBox pt={3} style={{ height: "100%" }}>
                    <div style={{ marginBottom: "16px" }}>
                      <ToastContainer />

                      {isLoading ? (
                        <div style={{ textAlign: "center" }}>
                          <CircularProgress />
                        </div>
                      ) : (
                        <table className="survey-table">
                          <thead>
                            <tr>
                              <th className="table-data">Survey Name</th>
                              <th className="table-data">Survey Type</th>
                              <th className="table-data">Organization Name</th>
                              <th className="table-data">Participants</th>
                              <th className="table-data">Created On</th>
                              <th className="table-data">Submission Count</th>
                              <th className="table-data">Status</th>
                              <th className="table-data">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((survey) => (
                              <tr key={survey.id}>
                                <td className="table-dataa">{survey.survey_name}</td>
                                <td className="table-dataa">{survey.survey_type}</td>
                                <td className="table-dataa">{survey.organisation_name}</td>
                                <td className="table-dataa">{survey.Max_no_of_participants}</td>
                                <td className="table-dataa">{survey.start_survey_date}</td>
                                <td className="table-dataa">{survey.survey_questions}</td>
                                <td className="table-dataa">{survey.language}</td>
                                <td
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {" "}
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                      marginRight: 10,
                                      width: "150px",
                                      color: "white",
                                      marginBottom: 10,
                                      backgroundColor: "#237DEA",
                                      fontWeight: "800",
                                      fontSize: "10px",
                                      lineHeight: "1px",
                                    }}
                                  >
                                    Generate Report
                                  </Button>
                                  {/* Feedback Details Button */}
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{
                                      marginRight: 10,
                                      width: "100px",
                                      color: "white",
                                      marginBottom: 10,
                                      backgroundColor: "#237DEA",
                                      fontWeight: "800",
                                      fontSize: "10px",
                                    }}
                                  >
                                    Feedback Details
                                  </Button>
                                  {/* Edit Button with Icon */}
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    style={{
                                      marginRight: 10,
                                      width: "80px",
                                      color: "black",
                                      marginBottom: 10,
                                      fontWeight: "800",
                                      fontSize: "10px",
                                      lineHeight: "1px",
                                    }}
                                    onClick={() => {
                                      setSelectedSurveyId(survey.id);
                                      setModal(true);
                                      console.log(survey);
                                    }}
                                  >
                                    <EditIcon /> Edit
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <Modal open={modal} onClose={() => setModal(false)}>
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                boxShadow: 24,
                                p: 4,
                                borderRadius: "15px",
                              }}
                            >
                              <Typography variant="h6" component="h2" gutterBottom>
                                Edit Survey Name
                              </Typography>
                              <TextField
                                label="Survey Name"
                                variant="outlined"
                                value={surveyName}
                                onChange={(e) => setSurveyName(e.target.value)}
                                fullWidth
                                autoFocus
                                style={{ marginTop: "20px" }}
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveSurveyName}
                                style={{
                                  marginRight: 10,
                                  width: "100px",
                                  color: "white",
                                  marginBottom: 10,
                                  backgroundColor: "#237DEA",
                                  fontWeight: "800",
                                  fontSize: "12px",
                                  marginTop: "20px",
                                }}
                              >
                                Save
                              </Button>
                            </Box>
                          </Modal>
                        </table>
                      )}
                    </div>
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
                  style={{ height: "42px" }}
                />
                <TextField
                  fullWidth
                  label="Survey Start Date"
                  name="surveyStartDate"
                  type="date"
                  value={formData.surveyStartDate}
                  onChange={handleChange}
                  margin="normal"
                  style={{ height: "42px" }}
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
                  style={{ height: "42px" }}
                />
                <TextField
                  fullWidth
                  label="Max Number of Participants"
                  name="Max_no_of_participants"
                  type="number"
                  value={formData.Max_no_of_participants}
                  onChange={handleChange}
                  margin="normal"
                  style={{ height: "42px" }}
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
