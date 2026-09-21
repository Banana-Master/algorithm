function solution(a, b) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    
    const length = max - min + 1;
    const numbers = Array.from({ length }, (_, i) => min + i);
    
    return numbers.reduce((acc, cur) => acc + cur, 0);
}