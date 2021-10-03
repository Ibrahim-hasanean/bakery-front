import React from "react";
import { Box, Paper, makeStyles, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyle = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexWrap: "wrap",
    padding: "30px",
    justifyContent: "space-around",
    width: "100%",
    "& > :not(style)": {
      m: 1,
      width: 128,
      height: 100,
    },
  },
  papers: {
    backgroundColor: "#283593",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 10px",
  },
}));

const Boxes = ({ SummaryData, style, loading }) => {
  const classes = useStyle();

  return (
    <Box className={classes.box}>
      {SummaryData.map((data, index) => (
        <Paper
          style={{ background: style?.background || "#283593" }}
          key={index}
          className={classes.papers}
          elevation={2}
        >
          <Typography variant="h6">{data.title}</Typography>
          <Typography variant="h6">
            {data.value ||
              (data.value === 0 || !loading ? (
                0
              ) : (
                <span>
                  <CircularProgress size="20px" color="inherit" />
                </span>
              ))}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Boxes;
