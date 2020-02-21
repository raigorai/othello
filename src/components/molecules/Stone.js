import React from "react";
import { makeStyles } from "@material-ui/core";
import { grey, green, blue } from "@material-ui/core/colors";
import clsx from "clsx";

const useStyle = makeStyles(() => ({
  stone: {
    width: 64,
    height: 64
  },
  black: {
    backgroundColor: grey[900],
    borderRadius: 50
  },
  white: {
    backgroundColor: grey[50],
    borderRadius: 50
  },
  canput: {
    backgroundColor: green[500],
    borderRadius: 50
  }
}));

const Stone = ({ value, canPut, onClick }) => {
  const classes = useStyle();
  const showStone = value => {
    switch (value) {
      case -1:
        return classes.black;
      case 1:
        return classes.white;
      default:
        return canPut ? classes.canput : null;
    }
  };
  return (
    <div
      className={clsx(classes.stone, showStone(value))}
      onClick={() => {
        if (canPut) {
          onClick();
        }
      }}
    />
  );
};

export default Stone;
