function solution(s) {
    const stack = [];
    const len = s.length;

    for (let i = 0; i < len; i++) {
        const char = s[i];

        if (stack.length > 0 && stack[stack.length - 1] === char) {
            stack.pop();
        } else {
            stack.push(char);
        }
    }

    return Number(stack.length === 0);
}
