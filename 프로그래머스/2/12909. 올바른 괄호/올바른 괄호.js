function solution(s){
    const bracket = s.split("");
    const tempStack = [];
    
    for (const b of bracket) {
        if (b === '(') {
            tempStack.push(true);
        } else {
            const result = tempStack.pop();
            if (result === undefined) return false;
        }
    }

    return tempStack.length === 0;
}