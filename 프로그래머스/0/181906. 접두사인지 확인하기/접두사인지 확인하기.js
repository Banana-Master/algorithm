function solution(my_string, is_prefix) {
    return Number(my_string.slice(0, is_prefix.length) === is_prefix);
}