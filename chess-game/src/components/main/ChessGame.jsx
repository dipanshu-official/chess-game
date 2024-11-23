import React, { useState } from 'react';

// Initial board setup
const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const pieceSymbols = {
  r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟',
  R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙',
};

const ChessGame = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleSquareClick = (row, col) => {
    if (selectedPiece) {
      // Move logic: move selected piece to the clicked square
      const newBoard = board.map((row) => [...row]);
      newBoard[row][col] = newBoard[selectedPiece.row][selectedPiece.col];
      newBoard[selectedPiece.row][selectedPiece.col] = '';
      setBoard(newBoard);
      setSelectedPiece(null);
    } else if (board[row][col] !== '') {
      // Select piece
      setSelectedPiece({ row, col });
    }
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => {
      return row.map((piece, colIndex) => {
        const isDark = (rowIndex + colIndex) % 2 === 1;
        const isSelected = selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex;

        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-16 h-16 flex items-center justify-center
                        ${isDark ? 'bg-gray-700' : 'bg-gray-300'}
                        ${isSelected ? 'border-4 border-yellow-500' : ''}`}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
          >
            {piece && <span className="text-4xl">{pieceSymbols[piece]}</span>}
          </div>
        );
      });
    });
  };

  return (
    <div className="grid grid-cols-8 grid-rows-8 border-4 border-black">
      {renderBoard()}
    </div>
  );
};

export default ChessGame;
