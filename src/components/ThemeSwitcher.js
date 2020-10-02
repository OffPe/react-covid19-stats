import React, { memo } from "react";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { makeStyles } from "@material-ui/core/styles";

const useStyles =  makeStyles(() => ({
  themeChange: {
    position: "absolute",
    top: 5,
    right: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  themeIcon: {
    opacity: .8
  }
}));

const ThemeSwitcher = ({ theme, onThemeChange }) => {
  const classes = useStyles();

  return (
    <Box className={classes.themeChange}>
      <Switch
        checked={theme === 'dark'}
        onChange={onThemeChange}
        name="theme"
        color="default"
      />
      <WbSunnyIcon className={classes.themeIcon} fontSize="small"/>
    </Box>
  )
};

export default memo(ThemeSwitcher);