const collatz = (num, answer) => {
    if (num === 1) return answer;
    if (answer >= 500) return - 1;
    
    if (num % 2 === 0) {
        return collatz(Math.floor(num / 2), answer + 1);
    } else {
        return collatz(num * 3 + 1, answer + 1);
    }
}

function solution(num) {
    return collatz(num, 0);
}

