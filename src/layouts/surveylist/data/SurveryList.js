import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./SurveyList.css";
const SurveyList = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(props);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://13.126.178.112:3000/getAllSurvey", {
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

    fetchData();
  }, []);

  return (
    <div style={{ marginBottom: "16px" }}>
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <table className="survey-table">
          <thead>
            <tr>
              <th>Survey Name</th>
              <th>Survey Type</th>
              <th>Organization Name</th>
              <th>Participants</th>
              <th>Created On</th>
              <th>Submission Count</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((survey) => (
              <tr key={survey.id}>
                <td>{survey.survey_name}</td>
                <td>{survey.survey_type}</td>
                <td>{survey.organisation_name}</td>
                <td>{survey.Max_no_of_participants}</td>
                <td>{survey.start_survey_date}</td>
                <td>{survey.survey_questions}</td>
                <td>{survey.language}</td>
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
                      width: "120px",
                      color: "white",
                      marginBottom: 10,
                      backgroundColor: "#237DEA",
                    }}
                  >
                    Feedback Details
                  </Button>
                  {/* Edit Button with Icon */}
                  <Button variant="contained" color="warning">
                    <EditIcon /> Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SurveyList;
