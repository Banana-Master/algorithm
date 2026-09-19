function isValidMove(nx, ny) {
    return nx >= -5 && nx <= 5 && ny >= -5 && ny <= 5;
}

function updateLocation(x, y, dir) {
    const dirObj = {
        "U": [x, y + 1],
        "D": [x, y - 1],
        "R": [x + 1, y],
        "L": [x - 1, y]
    }
    return dirObj[dir];
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
