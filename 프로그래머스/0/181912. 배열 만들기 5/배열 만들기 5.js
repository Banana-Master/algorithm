function solution(intStrs, k, s, l) {
    const result = [];
    
    intStrs.forEach((n) => {
        const cn = Number(n.slice(s, s + l));
        if (k < cn) {
            result.push(cn);
        }
    });
    
    return result;
}