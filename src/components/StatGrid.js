import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles"; //"@material-ui/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles((theme) => ({
  content: {
    alignItems: "center",
    display: "flex"
  },
  title: {
    fontWeight: 700
  },
  differenceIcon: {
    marginTop: theme.spacing(3)
    // color: theme.palette.error.dark
  },
  differenceValue: {
    // color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const StatGrid = (props) => {
  const { className, ...rest } = props;
  const { statText, totalCount, latestCount } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {statText}
            </Typography>
            <Typography variant="h3">{totalCount}</Typography>
          </Grid>
          {latestCount ? (
            <Grid item>
              <ArrowUpwardIcon className={classes.differenceIcon} />
              <Typography className={classes.differenceValue} variant="body2">
                {latestCount}
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
    </Card>
  );
};

StatGrid.propTypes = {
  className: PropTypes.string
};

export default StatGrid;
