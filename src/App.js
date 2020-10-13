import React, { useState, useEffect} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {  makeStyles,} from "@material-ui/core/styles";
import { coordinates } from "./constants/coordinates"
import Container from "@material-ui/core/Container";
import StatGrid from "./components/StatGrid";
import StatTable from "./components/StatTable";
import Map from "./components/Map"
import useThemeSwitcher from "./components/ThemeSwitcher";
import axios from "axios";
import moment from "moment";
import API_ENDPOINTS from "./constants/api";
import "./dark.css";


function Copyright() {

  
  return (
    <div>
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://offpe.github.io/react-covid19-stats/">
        Covid19 Tracker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
    
    </div>
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
      deaths_total_count: 0,
      confirmed_latest_total_count: 0,
      active_latest_total_count: 0,
      recovered_latest_total_count: 0,
      deaths_latest_total_count: 0,
      last_updated: ""
    },
    state_wise_rows: []
  });

 const [offlineStatus, setOfflineStatus] = useState('');



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
        deaths_total_count: numberWithCommas(
          api_response.data.statewise[0].deaths
        ),
        confirmed_latest_total_count: numberWithCommas(
          api_response.data.statewise[0].deltaconfirmed
        ),
        active_latest_total_count: 0,
        recovered_latest_total_count: numberWithCommas(
          api_response.data.statewise[0].deltarecovered
        ),
        deaths_latest_total_count: numberWithCommas(
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
      let obj = {
        state_ut: current_state.state,
        confirmed: current_state.confirmed,
        active: current_state.active,
        recovered: current_state.recovered,
        deaths: current_state.deaths
      };
    // Patch for countries' coordinates 
      obj['coordinates'] = {
        latitude:
          coordinates.find(f => f.country === current_state.state) !== undefined
            ? coordinates.find(f => f.country === current_state.state).latlng[0]
            : 0,
        longitude:
          coordinates.find(f => f.country === current_state.state) !== undefined
            ? coordinates.find(f => f.country === current_state.state).latlng[1]
            : 0,
            
      }
      response.push(obj);
    }
    return response;
  };

  useEffect(() => {
    setData(appState);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const res = navigator.onLine ? 'online' : 'offline';
    setOfflineStatus(res);
  }, [offlineStatus]);

  useEffect(() => {
    const handler = () => {
      setOfflineStatus('offline');
    }
    window.addEventListener('offline', handler);
    return () => window.removeEventListener('offline', handler);
  }, [offlineStatus]);

  useEffect(() => {
    const handler = () => {
      setOfflineStatus('online');
    };
    window.addEventListener('online', handler);
    return () => window.removeEventListener('online', handler);
  }, [offlineStatus]);

  const classes = useStyles();
  const ThemeSwitcher = useThemeSwitcher();


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
          <Grid className={classes.row} container justify="space-between">
        <Grid className={classes.statsItem} item>
          {ThemeSwitcher}
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
                stattext="deaths"
                totalcount={appState.meta.deaths_total_count}
                latestcount={appState.meta.deaths_latest_total_count}
                className={classes.greyText}
              />
            </Grid>
          </Grid>

          <StatTable rows={appState.state_wise_rows} />
     
          <Map 
            colors={["rgba(5, 155, 247, 0.7)","rgba(233,30,99,0.7)","rgba(53,211,156,0.7)"]}
            data={appState.state_wise_rows}
            fields={["confirmed", "deaths", "recovered"]}
            query={"confirmed"}
          />
        </div>
    
        <Box mt={8}>
          <Copyright />
        </Box>
        
      </Container>
   
  );
}



