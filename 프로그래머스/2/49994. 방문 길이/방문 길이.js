const MOVES = {
    U: [0, 1],
    D: [0, -1],
    R: [1, 0],
    L: [-1, 0],
};

function isValidMove(nx, ny) {
    return nx >= -5 && nx <= 5 && ny >= -5 && ny <= 5;
}

function updateLocation(x, y, dir) {
    const [dx, dy] = MOVES[dir];
    return [x + dx, y + dy];
}

function solution(dirs) {
    let x = 0;
    let y = 0;
    
    const visited = new Set();
    for (const dir of dirs) {
        const [nx, ny] = updateLocation(x, y, dir);
        
        if (!isValidMove(nx, ny)) {
            continue;
        }
        visited.add(`${x},${y},${nx},${ny}`);
        visited.add(`${nx},${ny},${x},${y}`);
        
        [x, y] = [nx, ny];
    }
    
    return visited.size / 2;
}
