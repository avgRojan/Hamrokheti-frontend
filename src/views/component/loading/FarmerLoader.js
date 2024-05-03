import React from "react";
import { CircularProgress } from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5", // Light gray background
  },
  loader: {
    position: "relative",
    width: 100,
    height: 100,
    "& .crop": {
      position: "absolute",
      width: 20,
      height: 40,
      backgroundColor: "#64dd17", // Green color for crops
      borderRadius: "50% 50% 0 0",
      transformOrigin: "50% 100%",
      animation: "$cropAnimation 0.5s infinite alternate",
    },
  },
  "@keyframes cropAnimation": {
    "0%": { transform: "scaleY(0.5) translateY(20px)" },
    "100%": { transform: "scaleY(1) translateY(0)" },
  },
}));

const FarmingLoader = () => {
  const classes = useStyles();

  return (
    <div className={classes.loaderContainer}>
      <div className={classes.loader}>
        <div className="crop"></div>
        <div className="crop" style={{ left: 30 }}></div>
        <div className="crop" style={{ left: 60 }}></div>
        <div className="crop" style={{ left: 90 }}></div>
      </div>
    </div>
  );
};

export default FarmingLoader;
