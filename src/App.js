//Gabriel Sanchez
//CS35L
//Assignment 3
//905970079
import { useState } from "react";
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
export default function Board() {
  const [movesNum, setMovesNum] = useState(0);
  const [picked, setPickedUp] = useState(0);
  const [pastMoves, setPastMoves] = useState();
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      if (movesNum >= 6) {
        if (nextSquares[i] === "X") {
          if (picked === 0) {
            setPickedUp(1);
          }
          setPastMoves(i);
          return;
        } else {
          const moves =
            pastMoves !== undefined
              ? AdjacencyOptions(pastMoves).includes(i)
              : false;
          if (squares[4] === "X") {
            if (squares[i] === null && squares[pastMoves] === "X" && moves) {
              nextSquares[i] = "X";
              nextSquares[pastMoves] = null;
              if (calculateWinner(nextSquares) === "X" || pastMoves === 4) {
                setMovesNum(movesNum + 1);
                setSquares(nextSquares);
                setXIsNext(!xIsNext);
                setPickedUp(0);
              }
              return;
            }
          } 
          else if (
            squares[i] == null &&
            squares[pastMoves] === "X" &&
            moves
          ) {

            nextSquares[i] = "X";
            nextSquares[pastMoves] = null;
            setMovesNum(movesNum + 1);
            setSquares(nextSquares);
            setXIsNext(!xIsNext);
            setPickedUp(0);
            return;
          } else {
            return;
          }
        }
      } else {
        if (squares[i]) {
          return;
        }
        nextSquares[i] = "X";
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
        setMovesNum(movesNum + 1);
        return;
      }
    } else {
      if (movesNum >= 6) {
        if (nextSquares[i] === "O") {
          if (picked === 0) {
            setPickedUp(1);
          }
          setPastMoves(i);
          console.log(pastMoves);
          return;
        } else {
          const moves =
            pastMoves !== undefined
              ? AdjacencyOptions(pastMoves).includes(i)
              : false;
          if (squares[4] === "O") {
            if (squares[i] === null && squares[pastMoves] === "O" && moves) {
              console.log("Here");
              nextSquares[i] = "O";
              nextSquares[pastMoves] = null;
              if (calculateWinner(nextSquares) === "O" || pastMoves === 4) {
                setMovesNum(movesNum + 1);
                setSquares(nextSquares);
                setXIsNext(!xIsNext);
                setPickedUp(0);
              }
              return;
            }
          } else if (
            squares[i] == null &&
            squares[pastMoves] === "O" &&
            moves
          ) {
            nextSquares[i] = "O";
            nextSquares[pastMoves] = null;
            setMovesNum(movesNum + 1);
            setSquares(nextSquares);
            setXIsNext(!xIsNext);
            setPickedUp(0);
            return;
          } else {
            return;
          }
        }
      } else {
        if (squares[i]) {
          return;
        }
        nextSquares[i] = "O";
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
        setMovesNum(movesNum + 1);
        return;
      }
    }
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
function AdjacencyOptions(square) {
  const lines = [
    [1, 3, 4],
    [0, 2, 3, 4, 5],
    [1, 4, 5],
    [0, 1, 4, 6, 7],
    [0, 1, 2, 3, 5, 6, 7, 8],
    [1, 2, 4, 7, 8],
    [3, 4, 7],
    [3, 4, 5, 6, 8],
    [4, 5, 7],
  ];
  return lines[square];
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

