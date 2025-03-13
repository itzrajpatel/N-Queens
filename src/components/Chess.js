import { useEffect, useState } from "react";
import "./Chess.css";
import Square from "./Square";
import Board from "./Board";
import solvePuzzle from "./Algorithm";

const Chess = () => {
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState(4);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [solutions, setSolutions] = useState(null);

  const [theme, setTheme] = useState("dark");
  function switchTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  function resetBoard() {
    const newBoard = Array.from({ length: boardSize }, (_, row) =>
      Array.from({ length: boardSize }, (_, col) => new Square(row, col))
    );
    setBoard(newBoard);
    setSolutions(null);
  }

  useEffect(resetBoard, [boardSize]);

  function solveNQueen() {
    const resultsAndAnimations = solvePuzzle(board);
    setSolutions(resultsAndAnimations);
  }

  function visualizeSolution(index) {
    if (!solutions) return;
    let animations = solutions.animationsList[index];

    animations.forEach((frame, i) => {
      setTimeout(() => {
        setSolutions((prevSolutions) => {
          const newSolutions = { ...prevSolutions };
          newSolutions.results[index] = frame;
          return newSolutions;
        });
      }, i * animationSpeed);
    });
  }

  return (
    <div className="theme" data-theme={theme}>
      <nav className="navbar navbar-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">N-Queen</span>
          <span className="theme-icon text-warning h4 mb-0" onClick={switchTheme}>
            {theme === "light" ? <i className="bi bi-moon-stars"></i> : <i className="bi bi-brightness-high"></i>}
          </span>
        </div>
      </nav>

      <div className="d-sm-flex p-1 justify-content-around align-items-center text-center input-bar">
        <button className="btn btn-dark mx-auto" onClick={resetBoard}>
          Clear
        </button>

        <div className="form-control m-auto" style={{ maxWidth: 250 }}>
          <label htmlFor="customRange1" className="form-label">
            <span className="text-primary">Animation Delay: </span>
            <span className="font-weight-bold text-success">{`${animationSpeed} ms`}</span>
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="1000"
            step="1"
            id="customRange1"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          />
        </div>

        <div className="form-control m-auto" style={{ maxWidth: 250 }}>
          <label htmlFor="customRange2" className="form-label">
            <span className="text-primary">Size of Board: </span>
            <span className="font-weight-bold text-success">{`${boardSize} x ${boardSize}`}</span>
          </label>
          <input
            type="range"
            className="form-range"
            min="4"
            max="10"
            step="1"
            id="customRange2"
            value={boardSize}
            onChange={(e) => setBoardSize(Number(e.target.value))}
          />
        </div>

        <button className="btn btn-success mx-2 mx-sm-auto" onClick={solveNQueen}>
          Solve
        </button>
      </div>

      {solutions && (
        <div className="text-center mt-5">
          <h5 className="possible-solutions">
            Total Solutions: <span className="solution-count">{solutions.results.length}</span>
          </h5>
        </div>
      )}
      <div className="solutions-container">
        {solutions?.results.map((solution, index) => (
          <div key={index} className="solution-board">
            <Board board={solution} />
            <button className="btn btn-primary visualize-btn mt-3" onClick={() => visualizeSolution(index)}>
              Visualize
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chess;
