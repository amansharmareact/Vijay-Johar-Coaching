import FileCopyIcon from "@mui/icons-material/FileCopy";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { toast, ToastContainer } from "react-toastify";
// Material Dashboard 2 React components
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import "./data/SurveyList.css";
import { Box, CircularProgress, Stack } from "@mui/material";
import TitleBox from "components/TitleBox";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import moment from "moment";
function Tables() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openAddSurvey, setOpenAddSurvey] = useState(false);
  const [surveyLink, setSurveyLink] = useState("");
  const [pre, setPre] = useState("ALL");
  const handleOpenAddSurvey = () => {
    setOpenAddSurvey(true);
  };
  const [copySuccess, setCopySuccess] = useState(false);

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
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [surveyName, setSurveyName] = useState("");
  const history = useNavigate();

  const handleSaveSurveyName = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `changeSurveyName/${selectedSurveyId}`,
        { survey_name: surveyName },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.data.status === 401) {
        localStorage.removeItem("token");
        history("/");
      } else {
        toast.success("Survey Name Updated Successfully");
        setIsLoading(false);
        setModal(false);
        setSurveyName("");
        fetchData();
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  const [openSurveyLink, setOpenSurveyLink] = useState(false);
  const handleSubmit = async (e) => {
    setSurveyLink(formData.survey_type);
    formData.survey_type === "PRE"
      ? setLink(`www.app.progrowth.coach/pre-program-form`)
      : formData.survey_type === "MID"
      ? setLink(`www.app.progrowth.coach/pre-program-form`)
      : formData.survey_type === "POST"
      ? setLink(`www.app.progrowth.coach/post-program-form`)
      : " ";
    setIsLoading(true);
    const formDataValues = Object.values(formData);
    if (formDataValues.some((value) => value === "")) {
      toast.error("Please fill in all the fields");
      setIsLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/saveSurvey", formData, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        history("/");
      } else {
        if (data.status !== 200) {
          toast.error("Create a Valid Survey");
          setIsLoading(false);
        } else {
          toast.success("Survey Created Successfully");
          setIsLoading(false);
        }
        setIsLoading(false);
        setOpenAddSurvey(false);
        setOpenSurveyLink(true);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/getAllSurvey", {
        headers: {
          Authorization: token,
        },
      });
      if (pre === "ALL") {
        setData(response.data.data);
        setIsLoading(false);
      } else {
        setData(response.data.data.filter((item) => item?.survey_type === pre));
        setIsLoading(false);
      }
      if (response.status === 401) {
        localStorage.removeItem("token");
        history("/");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
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
    });
  };
  const handleGenerateReport = (link) => {
    window.open(link, "_blank");
  };
  const [link, setLink] = useState("");
  const handleClick = () => {
    navigator.clipboard
      .writeText(link) // Copy the link to the clipboard
      .then(() => {
        toast.success("Link Copied Successfully"); // Show success toast
      })
      .catch((err) => {
        toast.error("Failed to copy the link"); // Show error toast in case of failure
      });
  };

  return (
    <>
      <DashboardLayout>
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
                <Card style={{ width: "100%", height: "70vh" }}>
                  <Stack spacing={2} pt={3} px={4} direction="row">
                    <Button
                      variant="contained"
                      style={{
                        color: "white",
                        backgroundColor: "#1692b4",
                        width: "180px",
                        height: "30px",
                      }}
                      onClick={handleOpenAddSurvey}
                    >
                      Create Survey
                    </Button>
                    <Button
                      color="warning"
                      style={{
                        color: pre === "" ? "white" : "black", // Change text color when active
                        backgroundColor: pre === "" ? "#1692b4" : "white", // Example change background color when active
                        width: "120px",
                        height: "30px",
                      }}
                      variant="contained"
                      onClick={() => {
                        setPre("ALL");
                      }}
                    >
                      All
                    </Button>

                    <Button
                      color="warning"
                      variant="contained"
                      style={{
                        color: pre === "/PRE" ? "white" : "black", // Change text color when active
                        backgroundColor: pre === "/PRE" ? "#1692b4" : "white", // Example change background color when active
                        width: "120px",
                        height: "30px",
                      }}
                      onClick={() => {
                        setPre("PRE");
                      }}
                    >
                      Pre Program
                    </Button>
                    <Button
                      color="warning"
                      variant="contained"
                      style={{
                        color: pre === "/MID" ? "white" : "black", // Change text color when active
                        backgroundColor: pre === "/MID" ? "#1692b4" : "white", // Example change background color when active
                        width: "120px",
                        height: "30px",
                      }}
                      onClick={() => {
                        setPre("MID");
                      }}
                    >
                      Mid Program
                    </Button>
                    <Button
                      color="warning"
                      variant="contained"
                      style={{
                        color: pre === "/POST" ? "white" : "black", // Change text color when active
                        backgroundColor: pre === "/POST" ? "#1692b4" : "white", // Example change background color when active
                        width: "120px",
                        height: "30px",
                      }}
                      onClick={() => {
                        setPre("POST");
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
                              {/* <th className="table-data">Status</th> */}
                              <th className="table-data">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data &&
                              data.map((survey) => (
                                <tr key={survey.id}>
                                  <td className="table-dataa">{survey.survey_name}</td>
                                  <td className="table-dataa">{survey.survey_type}</td>
                                  <td className="table-dataa">{survey.organisation_name}</td>
                                  <td className="table-dataa">{survey.Max_no_of_participants}</td>
                                  <td className="table-dataa">
                                    {moment(survey.surveyStartDate).format("DD/MM/YYYY")}
                                  </td>
                                  <td className="table-dataa">{survey.submission_count}</td>
                                  <td
                                    style={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() => {
                                        handleGenerateReport(survey.pdf_link);
                                      }}
                                      style={{
                                        marginRight: 10,
                                        width: "190px",
                                        color: "white",
                                        marginBottom: 10,
                                        backgroundColor: "#1692b4",
                                        fontWeight: "800",
                                        fontSize: "10px",
                                        lineHeight: "1px",
                                      }}
                                    >
                                      Generate Report
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      style={{
                                        marginRight: 10,
                                        width: "100px",
                                        color: "white",
                                        marginBottom: 10,
                                        backgroundColor: "#1692b4",
                                        fontWeight: "800",
                                        fontSize: "10px",
                                        height: "50px",
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
                                        height: "50px",
                                      }}
                                      onClick={() => {
                                        setSelectedSurveyId(survey._id);
                                        setModal(true);
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
                                  backgroundColor: "#1692b4",
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
      <ToastContainer />

      <Dialog open={openAddSurvey} onClose={handleCloseAddSurvey}>
        <DialogTitle>Create Survey</DialogTitle>
        <DialogContent>
          <>
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
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">हिंदी</MenuItem>
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
                    <MenuItem value="PRE">Pre Program</MenuItem>
                    <MenuItem value="MID">Mid Program</MenuItem>
                    <MenuItem value="POST">Post Program</MenuItem>
                  </Select>
                </FormControl>

                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{
                      marginRight: "8px",
                      marginTop: "20px",
                      color: "white",
                      width: "180px",
                    }}
                  >
                    Create Survey
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleReset}
                    style={{
                      marginTop: "20px",
                      color: "white",
                      backgroundColor: "gray",
                      width: "180px",
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            )}
          </>
        </DialogContent>
      </Dialog>
      <Modal open={openSurveyLink} onClose={() => setOpenSurveyLink(false)}>
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
            Survey Link
          </Typography>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6" component="h2" gutterBottom>
              {formData.survey_type === "PRE" && `www.progrowth.coach/pre-program-form`}
              {formData.survey_type === "MID" && `www.progrowth.coach/mid-program-form`}
              {formData.survey_type === "POST" && `www.progrowth.coach/post-program-form`}
            </Typography>

            <div>
              <IconButton
                color="primary"
                onClick={handleClick}
                style={{
                  marginRight: 10,
                  marginBottom: 10,
                  marginTop: "20px",
                }}
              >
                <FileCopyIcon />
              </IconButton>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Tables;
