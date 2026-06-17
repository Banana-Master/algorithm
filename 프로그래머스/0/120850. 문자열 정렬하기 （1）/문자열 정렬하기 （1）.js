function solution(my_string) {
    return [...my_string]
        .filter((x) => !isNaN(x))
        .map(Number)
        .sort((a, b) => a - b);
}