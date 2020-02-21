import React, { useState } from "react";
import { cloneDeep } from "lodash";

import { Grid, makeStyles } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import Stone from "../molecules/Stone";

const useStyles = makeStyles(() => ({
  squere: {
    padding: 8,

    backgroundColor: green[800],
    border: "solid",
    borderWidth: 3,
    borderColor: grey[900]
  }
}));

const B = -1;
const W = 1;

const Othello = () => {
  const [board, setBoard] = useState([
    //0 1  2  3  4  5  6  7
    [0, 0, 0, 0, 0, 0, 0, 0], // 0
    [0, 0, 0, 0, 0, 0, 0, 0], // 1
    [0, 0, 0, 0, 0, 0, 0, 0], // 2
    [0, 0, 0, B, W, 0, 0, 0], // 3
    [0, 0, 0, W, B, 0, 0, 0], // 4
    [0, 0, 0, 0, 0, 0, 0, 0], // 5
    [0, 0, 0, 0, 0, 0, 0, 0], // 6
    [0, 0, 0, 0, 0, 0, 0, 0] // 7
  ]);
  const [region, setRegion] = useState([
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [3, 2],
    [3, 5],
    [4, 2],
    [4, 5],
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 5]
  ]);
  const [current, setCurrent] = useState(B);

  const isSpace = (x, y) => {
    return board[y][x] === 0;
  };

  const isBorW = (x, y) => {
    return board[y][x] === current;
  };

  const checkRegion = (x, y) => {
    return region.find(r => r[0] === x && r[1] === y);
  };

  const outsideCheck = (x, y) => {
    return x < 0 || x > 7 || y < 0 || y > 7;
  };

  const nextXY = (x, y, i, direction) => {
    switch (direction) {
      case "T":
        return [x, y - i];
      case "TR":
        return [x + i, y - i];
      case "R":
        return [x + i, y];
      case "BR":
        return [x + i, y + i];
      case "B":
        return [x, y + i];
      case "BL":
        return [x - i, y + i];
      case "L":
        return [x - i, y];
      case "TL":
        return [x - i, y - i];
      default:
        return [x, y];
    }
  };

  const flipLine = (x, y, direction) => {
    let isDifferent = false;
    let isSame = false;
    const target = [];

    for (let i = 1; ; i++) {
      const [_x, _y] = nextXY(x, y, i, direction);
      if (outsideCheck(_x, _y) || isSpace(_x, _y)) {
        break;
      }

      if (isBorW(_x, _y)) {
        isSame = true;
        break;
      }
      target.push([_x, _y]);
      isDifferent = true;
    }
    if (isDifferent && isSame) {
      return target;
    }
    return [];
  };

  const isPut = (x, y) => {
    if (!checkRegion(x, y)) {
      return false;
    }
    return ["T", "TR", "R", "BR", "B", "BL", "L", "TL"].find(
      direction => flipLine(x, y, direction).length
    );
  };

  const culcRegion = (x, y) => {
    const targetRegion = ["T", "TR", "R", "BR", "B", "BL", "L", "TL"]
      .map(direction => {
        const [_x, _y] = nextXY(x, y, 1, direction);
        if (outsideCheck(_x, _y)) {
          return null;
        }
        if (isSpace(_x, _y)) {
          return [_x, _y];
        }
        return null;
      })
      .filter(Boolean);
    const cloneRegion = cloneDeep(region).filter(
      r => !(r[0] === x && r[1] === y)
    );

    targetRegion.forEach(target => {
      if (
        !cloneRegion.find(
          clone => target[0] === clone[0] && target[1] === clone[1]
        )
      ) {
        cloneRegion.push(target);
      }
    });
    return cloneRegion;
  };

  const put = (x, y) => {
    const filipStone = ["T", "TR", "R", "BR", "B", "BL", "L", "TL"]
      .map(direction => flipLine(x, y, direction))
      .filter(result => result.length)
      .flat();

    const cloneBoard = cloneDeep(board);
    filipStone.forEach(t => {
      cloneBoard[t[1]][t[0]] = current;
    });
    cloneBoard[y][x] = current;

    setRegion(culcRegion(x, y));
    setBoard(cloneBoard);
    setCurrent(current * -1);
  };

  const classes = useStyles();
  return board.map((row, y) => (
    <Grid container key={`row${y}`}>
      {row.map((value, x) => (
        <Grid item className={classes.squere} key={`item${x}${y}`}>
          <Stone
            value={value}
            isPut={isPut(x, y)}
            onClick={() => {
              put(x, y);
            }}
          />
        </Grid>
      ))}
    </Grid>
  ));
};

export default Othello;
