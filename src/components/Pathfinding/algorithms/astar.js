import PriorityQueue from "js-priority-queue";
function isInsideGrid(i,j,grid)
    { 
        return (i >= 0 && i < grid.length && j >= 0 && j < grid[0].length); 
    } 
function euclideanDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
const astar = (grid, startNode, endNode) => {
    
        let arr=grid;
        let visited_nodes=[];
        let shortestPath=[];
        let start_node=startNode;
        let end_node=endNode;
        let pq=new PriorityQueue({
            comparator:function(a,b){
                return a.f - b.f;
            }
        });
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                arr[i][j].distance = Infinity; // g(n)
                arr[i][j].heuristic = euclideanDistance(i, j, end_node[0], end_node[1]); // h(n)
                arr[i][j].f = Infinity; // f(n) = g(n) + h(n)
                arr[i][j].prevNode = null;
                arr[i][j].isVisited = false;
                arr[i][j].isShortestPath = false;
            }
        }
        arr[start_node[0]][start_node[1]].distance=0;
        pq.queue(arr[start_node[0]][start_node[1]]);
        const SQRT2 = Math.SQRT2;
        // 8 directions: right, down, left, up, and diagonals
        let dx = [1, 0, -1, 0, 1, 1, -1, -1];
        let dy = [0, 1, 0, -1, 1, -1, 1, -1];
        // console.log(set.toArray())
        let limit=0;
        
        while(pq.length){
            let cell=pq.dequeue();
            if(arr[cell.row][cell.col].isVisited)continue;
            arr[cell.row][cell.col].isVisited=true;
            visited_nodes.push(cell);
            let flag=0;
            for (let i = 0; i < 8; i++) {
                let x = cell.row + dx[i];
                let y = cell.col + dy[i];
                if (!isInsideGrid(x, y, arr)) continue;
                
                // Check for corner-cutting prevention for diagonal moves
                const isDiagonal = Math.abs(dx[i]) + Math.abs(dy[i]) === 2;
                if (isDiagonal) {
                    // For diagonal movement, check if BOTH adjacent cells are free
                    const adjacent1 = arr[cell.row][y]; // horizontal adjacent
                    const adjacent2 = arr[x][cell.col]; // vertical adjacent
                    if (adjacent1.isWall || adjacent2.isWall) {
                        continue; // Block diagonal movement if either adjacent cell is a wall
                    }
                }
                
                if (!arr[x][y].isVisited && (!arr[x][y].isWall || (x === end_node[0] && y === end_node[1]))) {
                    if(x===end_node[0]&&y===end_node[1]){
                        arr[x][y].isVisited=true;
                        arr[x][y].prevNode=arr[cell.row][cell.col];
                        let node=arr[x][y];
                        while (node !== null) {
                            shortestPath.unshift(node);
                            node = node.prevNode;
                            if (node){ node.isShortestPath = true;
                                node.isVisited=false;
                            }
                        }
                        flag=1;
                        break;
                    }
                    // Cost: 1 for straight, sqrt(2) for diagonal
                    const isDiagonal = Math.abs(dx[i]) + Math.abs(dy[i]) === 2;
                    const gNew = cell.distance + (isDiagonal ? SQRT2 : 1);
                    const hNew = arr[x][y].heuristic;
                    const fNew = gNew + hNew;
                    if (fNew < arr[x][y].f) {
                        arr[x][y].prevNode = cell;
                        arr[x][y].distance = gNew;
                        arr[x][y].f = fNew;
                        pq.queue(arr[x][y]);
                    }
                }
                
            }
            if(flag==1)break;
            
            
        }
        return {visited_nodes,shortestPath};
}
export default astar;
