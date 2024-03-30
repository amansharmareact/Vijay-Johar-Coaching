import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SimpleTreeView, SimpleTreeViewRoot } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
const Programs = () => {
  return (
    <MDBox mb={3}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Card>
            <MDBox p={2}>
              <MDTypography variant="h5">My Programs</MDTypography>
            </MDBox>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  CRYSTAL CROP PROTECTION - LOL - AJIT SHANKADHAR
                </AccordionSummary>
                <AccordionDetails>
                  <SimpleTreeView>
                    <TreeItem itemId="program-overview" label="Program Overview">
                      <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
                      <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
                      <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
                    </TreeItem>
                    <TreeItem itemId="pre-program" label="Pre-Program Preparation">
                      <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
                      <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
                    </TreeItem>
                    <TreeItem itemId="week-1" label="Week 1">
                      <TreeItem itemId="pickerssdc-community" label="@mui/x-date-pickers" />
                      <TreeItem itemId="pickersasdc-pro" label="@mui/x-date-pickers-pro" />
                    </TreeItem>
                    <TreeItem itemId="week-2" label="Week 2">
                      <TreeItem itemId="pickers-comcdsmunity" label="@mui/x-date-pickers" />
                      <TreeItem itemId="pickers-prsdco" label="@mui/x-date-pickers-pro" />
                    </TreeItem>
                    <TreeItem itemId="week-3" label="Week 3">
                      <TreeItem itemId="pickers-cssommunity" label="@mui/x-date-pickers" />
                      <TreeItem itemId="pickers-aapro" label="@mui/x-date-pickers-pro" />
                    </TreeItem>
                    <TreeItem itemId="week-4" label="Week 4">
                      <TreeItem itemId="pickers-cvgbjnommunity" label="@mui/x-date-pickers" />
                      <TreeItem itemId="pickers-pfcvghbjnro" label="@mui/x-date-pickers-pro" />
                    </TreeItem>
                    <TreeItem itemId="week-5" label="Week 5">
                      <TreeItem itemId="pickers-gvhbnjcommunity" label="@mui/x-date-pickers" />
                      <TreeItem itemId="pickers-pghjkro" label="@mui/x-date-pickers-pro" />
                    </TreeItem>
                    <TreeItem itemId="week-6" label="Week 6">
                      <TreeItem itemId="pickers-commfghjkunity" label="@mui/x-date-pickers" />
                      <TreeItem itemId="pickers-ghjpro" label="@mui/x-date-pickers-pro" />
                    </TreeItem>
                  </SimpleTreeView>
                </AccordionDetails>
              </Accordion>
            </div>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Programs;
