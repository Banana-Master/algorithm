function solution(arr) {
    let temp = -1;
    const result = [];
    
    arr.forEach((x) => {
        if (x !== temp) {
            result.push(x);
        }
        temp = x;
    });
    
    return result;
}