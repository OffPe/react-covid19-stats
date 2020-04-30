import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import StatGrid from "./components/StatGrid";
import StatTable from "./components/StatTable";
import axios from "axios";
import moment from "moment";
import API_ENDPOINTS from "./constants/api";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://covid19-tracker.surge.sh/">
        Covid19 Tracker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  row: {
    marginBottom: theme.spacing(3)
  },
  primaryText: {
    color: theme.palette.primary.main
  },
  successText: {
    color: theme.palette.success.main
  },
  errorText: {
    color: theme.palette.error.main
  },
  greyText: {
    color: theme.palette.grey.main
  }
}));

const numberWithCommas = (count) => {
  return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function App() {
  const [appState, setAppState] = useState({
    meta: {
      confirmed_total_count: 0,
      active_total_count: 0,
      recovered_total_count: 0,
      deceased_total_count: 0,
      confirmed_latest_total_count: 0,
      active_latest_total_count: 0,
      recovered_latest_total_count: 0,
      deceased_latest_total_count: 0,
      last_updated: ""
    },
    state_wise_rows: []
  });

  const setData = async () => {
    let api_response;
    try {
      api_response = await axios.get(API_ENDPOINTS.DATA);
    } catch (error) {
      console.log("Error:", error);
      return;
    }

    setAppState({
      meta: {
        confirmed_total_count: numberWithCommas(
          api_response.data.statewise[0].confirmed
        ),
        active_total_count: numberWithCommas(
          api_response.data.statewise[0].active
        ),
        recovered_total_count: numberWithCommas(
          api_response.data.statewise[0].recovered
        ),
        deceased_total_count: numberWithCommas(
          api_response.data.statewise[0].deaths
        ),
        confirmed_latest_total_count: numberWithCommas(
          api_response.data.statewise[0].deltaconfirmed
        ),
        active_latest_total_count: 0,
        recovered_latest_total_count: numberWithCommas(
          api_response.data.statewise[0].deltarecovered
        ),
        deceased_latest_total_count: numberWithCommas(
          api_response.data.statewise[0].deltadeaths
        ),
        last_updated: moment(
          api_response.data.statewise[0].lastupdatedtime,
          "DD/MM/YYYY hh:mm:ss"
        ).fromNow()
      },
      state_wise_rows: frame_state_wise_data(api_response.data.statewise)
    });
  };

  const frame_state_wise_data = (data = []) => {
    let response = [];
    if (!data.length) return response;
    data.splice(0, 1); //1st index contains the meta.
    // console.log("data:::", data);
    for (let i = 0; i < data.length; i++) {
      let current_state = data[i];
      response.push({
        state_ut: current_state.state,
        confirmed: current_state.confirmed,
        active: current_state.active,
        recovered: current_state.recovered,
        deceased: current_state.deaths
      });
    }
    return response;
  };

  useEffect(() => {
    setData(appState);
  }, []);

  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid className={classes.row} container justify="space-between">
          <Grid className={classes.statsItem} item>
            <Typography display="inline" variant="h4" color="primary">
              Covid19 Tracker
              <Typography display="inline" variant="caption" color="primary">
                (India)
              </Typography>
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Typography display="inline" variant="caption" color="primary">
              Last updated
              <br />
            </Typography>
            <Typography display="inline" variant="subtitle2" color="primary">
              {appState.meta.last_updated}
            </Typography>
          </Grid>
        </Grid>

        <Grid className={classes.row} container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={6}>
            <StatGrid
              stattext="Confirmed"
              totalcount={appState.meta.confirmed_total_count}
              latestcount={appState.meta.confirmed_latest_total_count}
              className={classes.errorText}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={6}>
            <StatGrid
              stattext="Active"
              totalcount={appState.meta.active_total_count}
              latestcount={appState.meta.active_latest_total_count}
              className={classes.primaryText}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={6}>
            <StatGrid
              stattext="Recovered"
              totalcount={appState.meta.recovered_total_count}
              latestcount={appState.meta.recovered_latest_total_count}
              className={classes.successText}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={6}>
            <StatGrid
              stattext="Deceased"
              totalcount={appState.meta.deceased_total_count}
              latestcount={appState.meta.deceased_latest_total_count}
              className={classes.greyText}
            />
          </Grid>
        </Grid>

        <StatTable rows={appState.state_wise_rows} />
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
