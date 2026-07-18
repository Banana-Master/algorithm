function solution(my_string, m, c) {
    return [...my_string].filter((x, i) => i % m === c - 1).join('');
}