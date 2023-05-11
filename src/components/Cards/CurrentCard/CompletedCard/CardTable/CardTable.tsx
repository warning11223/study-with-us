import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "common/hooks";
import { selectCards } from "features/cards/cardsSelectors";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton/IconButton";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import { useState } from "react";

type Props = {
  setSort: (value: string) => void
}

export const CardTable: React.FC<Props> = ({ setSort }) => {
  const cards = useAppSelector(selectCards);
  const [clicked, setClicked] = useState(false);

  const onSortHandler = () => {
    setClicked(!clicked);
    setSort(clicked ? "0grade" : "1grade");
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: "24px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
            <TableCell>Question</TableCell>
            <TableCell align="right">Answer</TableCell>
            <TableCell align="right">
              Last Updated
              <IconButton onClick={onSortHandler}>
                {
                  clicked ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                }
              </IconButton>
            </TableCell>
            <TableCell align="right">Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((card) => (
            <TableRow
              key={card._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {card.question}
              </TableCell>
              <TableCell align="right">{card.answer}</TableCell>
              <TableCell align="right">{card.updated.toString().substring(0, 10)}</TableCell>
              <TableCell align="right">
                {
                  Array.from('12345').map((item, index) => {
                    return <GradeRoundedIcon
                              key={index}
                              style={{cursor: 'pointer'}}
                              onClick={() => console.log(index + 1)}
                           />;
                  })
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};