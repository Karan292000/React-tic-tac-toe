import "./styles.css";
import { useState } from "react";

function Square({ id, newstate }) {
  const [status, setStatus] = useState(null);
  const [btn, setBtn] = useState("+");
  const xo = ["O", "X"];
  return (
    <button
      className="color"
      data={xo[status]}
      onClick={(e) => {
        setBtn(xo[status]);
        let nextPlayer = newstate(id);
        setStatus(nextPlayer);
      }}
    >
      {btn}
      {xo[status]}
    </button>
  );
}

export default function App() {
  const [player, setPlayer] = useState(0);
  const [state, setState] = useState(Array(9).fill(null));

  let status = `Player ${player}`;

  let winn = winner(state);
  let result_win = winn === 0 ? "O" : "X";
  if (winn !== null) status = `Player ${result_win} wins`;

  function rendersquare(id) {
    return <Square id={id} newstate={newstate}></Square>;
  }
  function newstate(id) {
    let thePlayer = player;
    state[id] = thePlayer;
    setState(state);
    let nextPlayer = (player + 1) % 2;
    setPlayer(nextPlayer);
    return thePlayer;
  }
  console.log("hi", winn);
  function winner(state) {
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < line.length; i++) {
      const [a, b, c] = line[i];
      if (state[a] === state[b] && state[a] === state[c]) {
        console.log("Hek", state[a]);
        return state[a];
      }
    }
    return null;
  }
  console.log("hi", state);
  return (
    <>
      <div className="game-board">
        <div className="grid-row">
          {rendersquare(0)}
          {rendersquare(1)}
          {rendersquare(2)}
        </div>
        <div className="grid-row">
          {rendersquare(3)}
          {rendersquare(4)}
          {rendersquare(5)}
        </div>
        <div className="grid-row">
          {rendersquare(6)}
          {rendersquare(7)}
          {rendersquare(8)}
        </div>
        <div>
          <h1>{status}</h1>
        </div>
      </div>
    </>
  );
}
