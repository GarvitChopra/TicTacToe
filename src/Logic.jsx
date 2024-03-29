import React, { useState, useEffect } from 'react';
import './App.css';

const Logic = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isBlueTurn, setIsBlueTurn] = useState(true);
  
  const [blueScore, setBlueScore] = useState(() => {
    const storedScore = localStorage.getItem('blueScore');
    return storedScore ? parseInt(storedScore) : 0;
  });
  const [redScore, setRedScore] = useState(() => {
    const storedScore = localStorage.getItem('redScore');
    return storedScore ? parseInt(storedScore) : 0;
  });

  useEffect(() => {
    localStorage.setItem('blueScore', blueScore.toString());
    localStorage.setItem('redScore', redScore.toString());
  }, [blueScore, redScore]);

  const checkWinner = () => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== null)) {
      return 'draw';
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || checkWinner()) return;

    const newBoard = [...board];
    newBoard[index] = isBlueTurn ? 'X' : 'O';
    setBoard(newBoard);

    setIsBlueTurn(!isBlueTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
  };

  const handleScore = (winner) => {
    if (winner === 'X') {
      setBlueScore(blueScore + 1);
    } else if (winner === 'O') {
      setRedScore(redScore + 1);
    }
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      if (winner !== 'draw') {
        handleScore(winner);
      }
    }
    // eslint-disable-next-line
  }, [board]);

  return (
    <div className="App">
      <h1 className='heading'>Tic-Tac-Toe</h1>
      <div className="scoreboard">
        <div className="blue-score">Blue: {blueScore}</div>
        <div className="red-score">Red: {redScore}</div>
      </div>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className={`cell ${cell}`} onClick={() => handleClick(index)} style={{ color: cell === 'X' ? 'blue' : cell === 'O' ? 'red' : 'inherit' }}>
            {cell}
          </div>
        ))}
      </div>
      {checkWinner() && (
        <div className="winner">
          {checkWinner() === 'draw' ? (
            <h2>Match draw!</h2>
          ) : (
            <h2>{checkWinner() === 'X' ? 'Blue' : 'Red'} wins!</h2>
          )}
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Logic;
