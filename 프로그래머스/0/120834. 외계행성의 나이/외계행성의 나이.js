function solution(age) {
    return [...`${age}`].map((x) => String.fromCharCode(97 + Number(x))).join('');
}