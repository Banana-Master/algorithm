function solution(my_string, n) {
    return my_string.split('').map((x) => x.repeat(n)).join('');
}