function solution(num_list) {
    const result = [0, 0];
    num_list.forEach((x) => {
       x % 2 === 0 ? ++result[0] : ++result[1]; 
    });
    return result;
}