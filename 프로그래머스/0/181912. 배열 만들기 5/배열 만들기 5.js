function solution(intStrs, k, s, l) {
    const result = [];
    
    intStrs.forEach((n) => {
        const cn = Number(n.split('').slice(s, s + l).join(''));
        if (k < cn) {
            result.push(cn);
        }
    });
    
    return result;
}