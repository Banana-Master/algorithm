function solution(my_string) {
    const arr = [];
    
    let str = '';
    for (let i = my_string.length - 1; i >= 0 ; i--) {
        str = [...my_string][i] + str;
        arr.push(str);
    }
    return arr.sort();
}