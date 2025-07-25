import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/BacktrackingVisualizer.css";
import { solveNQueensWithSteps, solveWordSearchWithSteps, solveRatMazeWithSteps } from "./algorithms";

const algorithms = [
  { name: "N-Queens", description: "Place N queens on NxN chessboard - all solutions" },
  { name: "Word Search", description: "Find word in 2D grid with backtracking" },
  { name: "Rat in a Maze", description: "Find path from start to end with backtracking" }
];

const BacktrackingVisualizer = () => {
  const history = useHistory();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("N-Queens");
  const [board, setBoard] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [boardSize, setBoardSize] = useState(4);
  const [customWord, setCustomWord] = useState("HELLO");
  const [solutions, setSolutions] = useState([]);
  const [backtrackingSteps, setBacktrackingSteps] = useState([]);
  const [currentBacktrackStep, setCurrentBacktrackStep] = useState(0);
  const [solutionBoards, setSolutionBoards] = useState([]);
  const [currentSolutionStep, setCurrentSolutionStep] = useState(0);
  const cancelAnimationRef = useRef(false);
  const [initialMaze, setInitialMaze] = useState(null);

  // Initialize board based on algorithm
  const initializeBoard = () => {
    if (selectedAlgorithm === "N-Queens") {
      setBoard(Array(boardSize).fill().map(() => Array(boardSize).fill('.')));
    } else if (selectedAlgorithm === "Word Search") {
      const grid = [
        ['H', 'E', 'L', 'L', 'O'],
        ['W', 'O', 'R', 'L', 'D'],
        ['A', 'L', 'G', 'O', 'X'],
        ['C', 'R', 'A', 'F', 'T'],
        ['Y', 'Z', 'M', 'N', 'P']
      ];
      setBoard(grid);
    } else if (selectedAlgorithm === "Rat in a Maze") {
      const maze = [
        [1, 0, 0, 0],
        [1, 1, 0, 1],
        [0, 1, 0, 0],
        [1, 1, 1, 1]
      ];
      setBoard(maze);
    }
    setSolutions([]);
    setBacktrackingSteps([]);
    setCurrentBacktrackStep(0);
    setCurrentStep(0);
    setSolutionBoards([]);
    setCurrentSolutionStep(0);
  };

  // Generate solution boards for all solutions, step by step
  const generateAllSolutionBoards = (solutions) => {
    if (!solutions.length) return [];
    const n = solutions[0].length;
    const maxSteps = n;
    // For each step, for each solution, show queens up to that step
    const allSteps = [];
    for (let step = 0; step <= maxSteps; step++) {
      const boardsAtStep = solutions.map(solution => {
        const tempBoard = Array(n).fill().map(() => Array(n).fill('.'));
        let queensPlaced = 0;
        for (let row = 0; row < n; row++) {
          for (let col = 0; col < n; col++) {
            if (solution[row][col] === 'Q' && queensPlaced < step) {
              tempBoard[row][col] = 'Q';
              queensPlaced++;
            }
          }
        }
        return tempBoard;
      });
      allSteps.push(boardsAtStep);
    }
    return allSteps;
  };

  const startVisualization = async () => {
    setAnimating(true);
    cancelAnimationRef.current = false;
    if (selectedAlgorithm === "N-Queens") {
      const { solutions: nQueensSolutions } = solveNQueensWithSteps(boardSize);
      setSolutions(nQueensSolutions);
      const allBoards = generateAllSolutionBoards(nQueensSolutions);
      setSolutionBoards(allBoards);
      // Animate all boards in sync
      for (let step = 0; step < allBoards.length; step++) {
        if (cancelAnimationRef.current) break;
        setCurrentSolutionStep(step);
        setBoard(allBoards[step][0]); // Just to keep the board state for rendering
        await new Promise(res => setTimeout(res, 1000));
      }
    } else if (selectedAlgorithm === "Word Search") {
      const { solutions: wordSolutions, steps } = solveWordSearchWithSteps(board, customWord);
      setSolutions(wordSolutions);
      setBacktrackingSteps(steps);
      for (let i = 0; i < steps.length; i++) {
        if (cancelAnimationRef.current) break;
        setCurrentBacktrackStep(i);
        await new Promise(res => setTimeout(res, 600));
      }
    } else if (selectedAlgorithm === "Rat in a Maze") {
      const { solutions: mazeSolutions, steps } = solveRatMazeWithSteps(board);
      setSolutions(mazeSolutions);
      setBacktrackingSteps(steps);
      for (let i = 0; i < steps.length; i++) {
        if (cancelAnimationRef.current) break;
        setCurrentBacktrackStep(i);
        await new Promise(res => setTimeout(res, 600));
      }
    }
    setAnimating(false);
  };

  const resetVisualization = () => {
    cancelAnimationRef.current = true;
    if (selectedAlgorithm === "Rat in a Maze" && initialMaze) {
      setBoard(initialMaze.map(row => [...row]));
    } else {
      initializeBoard();
    }
    setSolutions([]);
    setBacktrackingSteps([]);
    setCurrentBacktrackStep(0);
    setCurrentStep(0);
    setAnimating(false);
  };

  // Helper to generate a random letter grid for Word Search
  const generateRandomGrid = (size = 5) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array(size).fill().map(() =>
      Array(size).fill().map(() => letters[Math.floor(Math.random() * letters.length)])
    );
  };

  // Helper to generate a random maze for Rat in a Maze
  const generateRandomMaze = (size = 4) => {
    // Ensure start and end are open
    const maze = Array(size).fill().map(() => Array(size).fill(1));
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if ((i !== 0 || j !== 0) && (i !== size - 1 || j !== size - 1)) {
          maze[i][j] = Math.random() < 0.7 ? 1 : 0; // 70% open, 30% wall
        }
      }
    }
    return maze;
  };

  // Regenerate handlers
  const handleRegenerate = () => {
    if (selectedAlgorithm === "Word Search") {
      const grid = generateRandomGrid(5);
      setBoard(grid);
      setSolutions([]);
      setBacktrackingSteps([]);
      setCurrentBacktrackStep(0);
      setCurrentStep(0);
    } else if (selectedAlgorithm === "Rat in a Maze") {
      const maze = generateRandomMaze(4);
      setBoard(maze);
      setInitialMaze(maze.map(row => [...row]));
      setSolutions([]);
      setBacktrackingSteps([]);
      setCurrentBacktrackStep(0);
      setCurrentStep(0);
    }
  };

  // Initialize board when component mounts or algorithm changes
  React.useEffect(() => {
    initializeBoard();
    if (selectedAlgorithm === "Rat in a Maze") {
      const maze = generateRandomMaze(4);
      setBoard(maze);
      setInitialMaze(maze.map(row => [...row]));
    }
  }, [selectedAlgorithm, boardSize]);

  // Render a single chessboard
  const renderChessBoard = (board, highlightStep) => {
    return (
      <div className="board" style={{margin: 8}}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => {
              let cellClass = "cell";
              let cellContent = cell;
              if (cell === 'Q') {
                cellClass += " queen";
                cellContent = "♕";
                // Highlight the most recently placed queen
                if (highlightStep && highlightStep.row === rowIndex && highlightStep.col === colIndex) {
                  cellClass += " placing";
                }
              }
              return <div key={colIndex} className={cellClass}>{cellContent}</div>;
            })}
          </div>
        ))}
      </div>
    );
  };

  // For N-Queens, render all boards in a grid
  const renderAllChessBoards = () => {
    if (!solutionBoards.length) return null;
    const step = currentSolutionStep;
    const boardsAtStep = solutionBoards[step];
    return (
      <div className="nqueens-grid">
        {boardsAtStep.map((b, idx) => {
          // Find the last queen placed for this step
          let highlight = null;
          let queens = [];
          for (let r = 0; r < b.length; r++) {
            for (let c = 0; c < b.length; c++) {
              if (b[r][c] === 'Q') queens.push({row: r, col: c});
            }
          }
          if (queens.length > 0 && step > 0) highlight = queens[queens.length - 1];
          return (
            <div key={idx} className="nqueens-board-container">
              <div className="nqueens-board-label">Solution {idx + 1}</div>
              {renderChessBoard(b, highlight)}
            </div>
          );
        })}
      </div>
    );
  };

  // Render a single cell for other algorithms
  const renderCell = (value, row, col) => {
    let cellClass = "cell";
    let cellContent = value;
    if (selectedAlgorithm === "Word Search") {
      if (backtrackingSteps[currentBacktrackStep]) {
        const step = backtrackingSteps[currentBacktrackStep];
        // Highlight the current visiting cell
        if (step.row === row && step.col === col) {
          if (step.type === 'visit') {
            cellClass += ' visiting';
          } else if (step.type === 'backtrack') {
            cellClass += ' backtracking';
          }
        }
        // Highlight the current path so far
        if (step.path && step.path.some(([r, c]) => r === row && c === col)) {
          cellClass += ' path';
        }
      }
    } else if (selectedAlgorithm === "Rat in a Maze") {
      if (value === 0) {
        cellClass += " wall";
        cellContent = "█";
      } else if (backtrackingSteps[currentBacktrackStep]) {
        const step = backtrackingSteps[currentBacktrackStep];
        if (step.path && step.path.some(([r, c]) => r === row && c === col)) {
          const pathIndex = step.path.findIndex(([r, c]) => r === row && c === col);
          if (pathIndex !== -1) {
            cellClass += " path";
            if (step.type === 'visit') {
              cellClass += " visiting";
            } else if (step.type === 'backtrack') {
              cellClass += " backtracking";
            }
            if (pathIndex === 0) {
              cellContent = "S";
            } else if (pathIndex === step.path.length - 1 && step.type === 'solution') {
              cellContent = "E";
            } else {
              cellContent = "●";
            }
          }
        }
      }
    }
    return (
      <div key={`${row}-${col}`} className={cellClass}>{cellContent}</div>
    );
  };

  return (
    <div className="backtracking-visualizer-container">
      <div style={{textAlign: 'left', marginBottom: '1rem'}}>
        <button 
          onClick={() => history.push('/')}
          style={{
            background: '#333',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
      <h2>Backtracking Algorithm Visualizer</h2>
      <div className="controls">
        <button onClick={resetVisualization} className="reset-btn" style={{marginRight: '1rem'}}>Reset</button>
        <label style={{marginRight: '1rem', color: '#fff'}}>Algorithm:
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            disabled={animating}
            style={{marginLeft: '0.5rem', padding: '0.2rem 0.5rem'}}>
            {algorithms.map(algo => (
              <option key={algo.name} value={algo.name}>{algo.name}</option>
            ))}
          </select>
        </label>
        {selectedAlgorithm === "N-Queens" && (
          <label style={{marginRight: '1rem', color: '#fff'}}>Board Size:
            <select
              value={boardSize}
              onChange={(e) => setBoardSize(Number(e.target.value))}
              disabled={animating}
              style={{marginLeft: '0.5rem', padding: '0.2rem 0.5rem'}}>
              {[4, 5, 6, 7, 8].map(size => (
                <option key={size} value={size}>{size}x{size}</option>
              ))}
            </select>
          </label>
        )}
        {selectedAlgorithm === "Word Search" && (
          <>
            <label style={{marginRight: '1rem', color: '#fff'}}>Word:
              <input
                type="text"
                value={customWord}
                onChange={(e) => setCustomWord(e.target.value.toUpperCase())}
                disabled={animating}
                style={{marginLeft: '0.5rem', padding: '0.2rem 0.5rem', background: '#333', color: '#fff', border: '1px solid #555'}}
                maxLength={10}
              />
            </label>
            <button onClick={handleRegenerate} disabled={animating} style={{marginRight: '1rem'}}>Regenerate</button>
          </>
        )}
        {selectedAlgorithm === "Rat in a Maze" && (
          <button onClick={handleRegenerate} disabled={animating} style={{marginRight: '1rem'}}>Regenerate</button>
        )}
        <button onClick={startVisualization} disabled={animating} className="start-btn">Start</button>
      </div>
      {selectedAlgorithm === "N-Queens" ? (
        <>
          <div className="nqueens-info">
            {solutionBoards.length > 0 && (
              <p><strong>Step {currentSolutionStep + 1} / {solutionBoards.length}:</strong> Placing queen {currentSolutionStep} of {boardSize} on all boards</p>
            )}
            {solutions.length > 0 && (
              <p><strong>Found {solutions.length} solution(s)</strong></p>
            )}
          </div>
          {renderAllChessBoards()}
        </>
      ) : (
        <div className="board-container">
          <div className="board">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="board-row">
                {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedAlgorithm !== "N-Queens" && (
        <div className="info-panel">
          <div className="step-info">
            {backtrackingSteps[currentBacktrackStep] && (
              <p><strong>Step {currentBacktrackStep + 1}/{backtrackingSteps.length}:</strong> {backtrackingSteps[currentBacktrackStep].message}</p>
            )}
          </div>
          {solutions.length > 0 && (
            <div className="solutions-info">
              <p><strong>Found {solutions.length} path(s)</strong></p>
            </div>
          )}
        </div>
      )}
      <div className="description">
        <p>{algorithms.find(a => a.name === selectedAlgorithm)?.description}</p>
      </div>
    </div>
  );
};

export default BacktrackingVisualizer; 