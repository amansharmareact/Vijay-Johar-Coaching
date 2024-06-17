import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useState, useEffect } from "react";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Card from "./Card";
import TitleBox from "components/TitleBox";
import MDTypography from "components/MDTypography";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const reduxState = localStorage.getItem("reduxState");
      const email = JSON.parse(reduxState).loginData.email;
      const response = await fetch(`http://13.126.178.112:3000/CoachDashboard/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData.data);
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
    <DashboardLayout>
      <DashboardNavbar style={{ position: "sticky" }} />
      <MDBox py={3} style={{ height: "70vh" }}>
        <Grid container>
          <TitleBox>
            <MDTypography variant="h6" color="black" backgroundColor="red">
              DASHBOARD
            </MDTypography>
          </TitleBox>
          <Grid
            item
            xs={12}
            pt={5}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}
          >
            <Grid item xs={12} md={6} lg={3} style={{ cursor: "pointer" }}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Total Number of Courses"
                  count={data?.TotalProgram}
                />
              </MDBox>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/active-programs");
              }}
            >
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Active Programs"
                  count={data?.ActiveProgram?.length}
                />
              </MDBox>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/archive-programs");
                console.log("psyhesssss");
              }}
            >
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Archieve Programs"
                  count={data?.CompletedProgram?.length}
                />
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
