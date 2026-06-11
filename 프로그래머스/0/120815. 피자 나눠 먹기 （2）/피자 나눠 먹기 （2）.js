function solution(n) {
    const getGcd = (a, b) => b === 0 ? a : getGcd(b, a % b);
    
    return n / getGcd(n, 6);
}