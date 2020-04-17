import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import StatGrid from "./components/StatGrid";

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
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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

export default function App() {
  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <StatGrid
              stattext="Confirmed"
              totalcount="13,031"
              latestcount="+660"
              className={classes.errorText}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <StatGrid
              stattext="Active"
              totalcount="13,031"
              className={classes.primaryText}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <StatGrid
              stattext="Recovered"
              totalcount="13,031"
              latestcount="+660"
              className={classes.successText}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <StatGrid
              stattext="Deceased"
              totalcount="13,031"
              latestcount="+660"
              className={classes.greyText}
            />
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
