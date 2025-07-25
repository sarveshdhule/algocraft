import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/TreeVisualizer.css";

// Helper to generate a full binary tree of given height with random values
function generateFullBinaryTree(height, current = 1, randomize = false) {
  if (height === 0) return null;
  const value = randomize ? Math.floor(Math.random() * 100) + 1 : current;
  return {
    value: value,
    left: generateFullBinaryTree(height - 1, current * 2, randomize),
    right: generateFullBinaryTree(height - 1, current * 2 + 1, randomize)
  };
}

function getTraversalOrder(type, root) {
  const order = [];
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    order.push(node);
    inorder(node.right);
  }
  function preorder(node) {
    if (!node) return;
    order.push(node);
    preorder(node.left);
    preorder(node.right);
  }
  function postorder(node) {
    if (!node) return;
    postorder(node.left);
    postorder(node.right);
    order.push(node);
  }
  function levelorder(node) {
    if (!node) return;
    const queue = [node];
    while (queue.length) {
      const n = queue.shift();
      order.push(n);
      if (n.left) queue.push(n.left);
      if (n.right) queue.push(n.right);
    }
  }
  if (type === "Inorder") inorder(root);
  if (type === "Preorder") preorder(root);
  if (type === "Postorder") postorder(root);
  if (type === "Level-order") levelorder(root);
  return order;
}

const traversalTypes = ["Inorder", "Preorder", "Postorder", "Level-order"];

const TreeVisualizer = () => {
  const history = useHistory();
  const [traversal, setTraversal] = useState("Inorder");
  const [visited, setVisited] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [height, setHeight] = useState(3);
  const [tree, setTree] = useState(() => generateFullBinaryTree(3, 1, false));
  const orderRef = useRef([]);
  const cancelAnimationRef = useRef(false);

  const startTraversal = async () => {
    setAnimating(true);
    setVisited([]);
    cancelAnimationRef.current = false;
    const order = getTraversalOrder(traversal, tree);
    orderRef.current = order;
    for (let i = 0; i < order.length; i++) {
      if (cancelAnimationRef.current) break;
      setVisited(order.slice(0, i + 1));
      await new Promise(res => setTimeout(res, 700));
    }
    setAnimating(false);
  };

  const resetTraversal = () => {
    cancelAnimationRef.current = true;
    setVisited([]);
    setAnimating(false);
  };

  const regenerateTree = () => {
    cancelAnimationRef.current = true;
    setTree(generateFullBinaryTree(height, 1, true)); // Randomize = true
    setVisited([]);
    setAnimating(false);
  };

  function renderTree(node) {
    if (!node) return null;
    const isVisited = visited.includes(node);
    return (
      <div className="tree-node">
        <div className={`node-circle${isVisited ? " highlight" : ""}`}>{node.value}</div>
        {(node.left || node.right) && (
          <svg className="tree-links" width="100%" height="30">
            {node.left && (
              <line 
                x1="50%" y1="0" 
                x2="25%" y2="30" 
                stroke="#2ED327" 
                strokeWidth="2"
              />
            )}
            {node.right && (
              <line 
                x1="50%" y1="0" 
                x2="75%" y2="30" 
                stroke="#2ED327" 
                strokeWidth="2"
              />
            )}
          </svg>
        )}
        <div className="tree-children">
          {renderTree(node.left)}
          {renderTree(node.right)}
        </div>
      </div>
    );
  }

  return (
    <div className="tree-visualizer-container">
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
      <h2>Tree Traversal Visualizer</h2>
      <div className="controls">
        <label style={{marginRight: '1rem', color: '#fff'}}>Tree Height:
          <select
            value={height}
            onChange={e => {
              cancelAnimationRef.current = true;
              setHeight(Number(e.target.value));
              setTree(generateFullBinaryTree(Number(e.target.value), 1, false));
              setVisited([]);
              setAnimating(false);
            }}
            disabled={animating}
            style={{marginLeft: '0.5rem', padding: '0.2rem 0.5rem'}}>
            {[...Array(5)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
        </label>
        <button onClick={regenerateTree} disabled={animating} style={{marginRight: '1rem'}}>Regenerate</button>
        {traversalTypes.map(type => (
          <button
            key={type}
            className={traversal === type ? "active" : ""}
            onClick={() => !animating && setTraversal(type)}
            disabled={animating}
          >
            {type}
          </button>
        ))}
        <button onClick={startTraversal} disabled={animating} className="start-btn">Start</button>
        <button onClick={resetTraversal} disabled={visited.length === 0} className="reset-btn">Reset</button>
      </div>
      <div className="tree-area">
        {renderTree(tree)}
      </div>
    </div>
  );
};

export default TreeVisualizer; 