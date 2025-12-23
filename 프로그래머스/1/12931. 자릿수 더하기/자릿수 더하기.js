function solution(n) {
    return `${n}`.split('').map(Number).reduce((a, b) => a + b);
}