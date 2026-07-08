function solution(my_string, queries) {
    const arr = my_string.split('');
    
    queries.forEach(([s, e]) => {
        const sliced = arr.slice(s, e + 1);
        sliced.reverse();
        arr.splice(s, sliced.length, ...sliced);
    });
    
    return arr.join('');
}