import React, { useState } from "react";
import Centerpane from "../../aequm/components/Centerpane";
import InstructionPage from "./InstructionPage";
import { Box, Button, Grid } from "@mui/material";
function Page() {
  const [page, setPage] = useState(0);
  return (
    <div>
      <Box>
        {page === 0 && <Page1 />}
        {page === 1 && <Page2 />}
        {page === 2 && <Centerpane />}
      </Box>
      <Box>
        <Button
          size="large"
          variant="contained"
          disabled={page === 0}
          onClick={() => setPage(page + 1)}
        >
          Previous
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}

function Page1() {
  return (
    <div>
      <InstructionPage />
    </div>
  );
}
function Page2() {
  return (
    <div>
      <Grid
        container
        rowGap={2}
        className="wrapper__box-price wrap__flex-sm-50 text-center text-md-left d-flex justify-content-between align-items-center"
      >
        <Grid item sm={4} xs={12}>
          <h5 className="semi-bold font__size--14 text__14-1024 color__gray-1">
            Country
          </h5>
          <h4 className="bold font__size--18 text__18-1024 text__18-xs mb-0">
            <select
              id="Country"
              name="Country"
              //ref={countryRef}
              //onChange={countryUpdate}
            >
              <option value="US">United States of America</option>
              <option value="UK">United Kingdom</option>
            </select>
          </h4>
        </Grid>
        <Grid item sm={4} xs={12}>
          <h5 className="semi-bold font__size--14 text__14-1024 color__gray-1">
            Requirement
          </h5>
          <h4 className="bold font__size--18 text__18-1024 text__18-xs mb-0">
            <select
              //ref={requirementRef}
              id="Country"
              name="Country"
              //onChange={updateRequirments}
            >
              <option value="passport">Passport</option>
              <option value="visa">Visa</option>
              <option value="passport + visa">Passport + Visa</option>
            </select>
          </h4>
        </Grid>
      </Grid>
    </div>
  );
}
export default Page;
