const yangkkochi = 12_000;
const drink = 2_000;

function solution(n, k) {
    return n * yangkkochi + (k - parseInt(n / 10)) * drink;
}