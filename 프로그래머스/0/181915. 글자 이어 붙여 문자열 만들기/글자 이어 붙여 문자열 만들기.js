function solution(my_string, index_list) {
    let result = '';
    
    index_list.forEach((n) => {
       result += my_string[n];
    });
    
    return result;
}