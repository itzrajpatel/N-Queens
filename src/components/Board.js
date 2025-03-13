// import "./Board.css";

// const Board = ({ board }) => {
//   let squareBG = ["lavenderblush", "#85c1e9"];

//   const totalWidth = (window.innerWidth > 425) ? 400 : (window.innerWidth-50);
//   const squareSizeStyle = {
//     width: totalWidth / board.length,
//     height: totalWidth / board.length,
//   };
//   const queenSizeStyle = {
//     fontSize: (totalWidth/1.6) / board.length,
//   };

//   function getColor(square) {
//     // queen placed animation
//     if (square.isActive && square.hasQueen) return "#6610f2";
//     // traverse possible queen positions
//     else if (square.isActive) return "orange";
//     else return squareBG[square.background];
//   }

//   return (
//     <div className="container main-board">
//       {board.map((row, rowIndex) => (
//         <div key={rowIndex} className="row">
//           {row.map((col, colIndex) => {
//             return (
//               <div
//                 key={colIndex}
//                 style={{ ...squareSizeStyle, backgroundColor: getColor(col) }}
//                 className="square"
//                 id={`square-${rowIndex}-${colIndex}`}
//               >
//                 {col.hasQueen && (
//                   <div className="w-100 h-100 d-flex align-items-center justify-content-center">
//                     <i
//                       style={queenSizeStyle}
//                       className="fas fa-chess-queen text-danger"
//                     ></i>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Board;

import "./Board.css";

const Board = ({ board }) => {
  let squareBG = ["lavenderblush", "#85c1e9"];

  const totalWidth = window.innerWidth > 425 ? 400 : window.innerWidth - 50;
  const squareSize = totalWidth / board.length;
  const queenSize = (totalWidth / 1.6) / board.length;

  function getColor(square) {
    if (square.isActive && square.hasQueen) return "#6610f2";
    else if (square.isActive) return "orange";
    return squareBG[square.background];
  }

  return (
    <div className="board-container">
      {/* Top Column Labels (1, 2, 3...) */}
      <div className="row">
        <div className="label-corner"></div>
        {board[0].map((_, colIndex) => (
          <div key={colIndex} className="column-label" style={{ width: squareSize }}>
            {colIndex + 1} {/* 1, 2, 3... */}
          </div>
        ))}
      </div>

      {/* Chess Board with Row Labels (1, 2, 3...) */}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {/* Left Row Numbers */}
          <div className="row-label" style={{ height: squareSize }}>{rowIndex + 1}</div>

          {row.map((square, colIndex) => (
            <div
              key={colIndex}
              style={{ width: squareSize, height: squareSize, backgroundColor: getColor(square) }}
              className="square"
            >
              {square.hasQueen && (
                <div className="queen-container">
                  <i className="fas fa-chess-queen text-danger" style={{ fontSize: queenSize }}></i>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
