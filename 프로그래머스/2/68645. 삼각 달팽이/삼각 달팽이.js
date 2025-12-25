function solution(n) {
    const triangle = [];
    let total = 0;

    for (let i = 1; i <= n; i++) {
        triangle.push(Array(i).fill(0));
        total += i;
    }

    let col = 0, row = 0;
    let dCol = 1, dRow = 0;

    for (let num = 1; num <= total; num++) {
        triangle[col][row] = num;

        const nextCol = col + dCol;
        const nextRow = row + dRow;

        if (
            nextCol < 0 ||
            nextRow < 0 ||
            nextCol >= triangle.length ||
            nextRow >= triangle[nextCol].length ||
            triangle[nextCol][nextRow] !== 0
        ) {
            if (dCol === 1 && dRow === 0) {
                dCol = 0; dRow = 1;
            } else if (dCol === 0 && dRow === 1) {
                dCol = -1; dRow = -1;
            } else {
                dCol = 1; dRow = 0;
            }
        }

        col += dCol;
        row += dRow;
    }

    return triangle.flat();
}
