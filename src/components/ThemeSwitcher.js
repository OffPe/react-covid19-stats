import React, {useState, useEffect } from "react";
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
function useThemeSwitcher(){
  const classes = useStyles();
  const[mode, setMode] = useState(() => localStorage.getItem("mode"));

  useEffect(() => {
    if(mode === "dark"){
      document.body.classList.add("dark-mode");
      localStorage.setItem("mode", "dark");
    }else{
      document.body.classList.remove("dark-mode");
      localStorage.setItem("mode", "light");
    }
    
  }, [mode])

  return(
    <div>
      <Box className={classes.themeChange}>
      <Switch
      onClick = {()=> 
        setMode(mode => (mode === "dark" ? "light" : "dark"))
      }
        checked={mode === 'dark'}
        name="mode"
        color="default"
      />
    
    <a 
    className = "cursor-pointer" 
    
    >
      {mode === "dark" ? <WbSunnyIcon className = {classes.themeIcon}/> : <WbSunnyIcon className = {classes.themeIcon}/>}
      </a>
      </Box>
      </div>
  );
  }


export default useThemeSwitcher;