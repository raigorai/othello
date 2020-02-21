import React from "react";
import { makeStyles } from "@material-ui/core";
import { grey, green } from "@material-ui/core/colors";
import clsx from "clsx";

const useStyle = makeStyles(() => ({
  stone: {
    width: 64,
    height: 64,
    borderRadius: 50
  },
  black: {
    backgroundColor: grey[900]
  },
  white: {
    backgroundColor: grey[50]
  },
  isPut: {
    backgroundColor: green[500]
  }
}));

const Stone = ({ value, isPut, onClick }) => {
  const classes = useStyle();
  const showStone = value => {
    switch (value) {
      case -1:
        return classes.black;
      case 1:
        return classes.white;
      default:
        return isPut ? classes.isPut : null;
    }
  };
  return (
    <div
      className={clsx(classes.stone, showStone(value))}
      onClick={() => {
        if (isPut) {
          onClick();
        }
      }}
    />
  );
};

export default Stone;
