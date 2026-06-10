function solution(a, b, c, d) {
    const dice = [a, b, c, d];
    const counts = new Map();
    
    for (const num of dice) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }
    
    const sorted = [...counts.entries()].sort((x, y) => y[1] - x[1]);
    
    if (sorted.length === 1) {
        const p = sorted[0][0];
        return 1111 * p;
    }
    
    if (sorted.length === 2) {
        const p = sorted[0][0];
        const q = sorted[1][0];
        if (sorted[0][1] === 3) {
            return Math.pow(10 * p + q, 2);
        }
        return (p + q) * Math.abs(p - q);
    }
    
    if (sorted.length === 3) {
        const q = sorted[1][0];
        const r = sorted[2][0];
        return q * r;
    }
    
    return Math.min(...dice);
}