function solution(numbers) {
    const result = [];
    
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < i; j++) {
            result.push(numbers[i] + numbers[j]);
        }
    }
    return [...new Set(result)].sort((a, b) => a - b);
}