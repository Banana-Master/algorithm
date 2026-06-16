function solution(hp) {
    const a = ~~(hp / 5);
    const b = ~~((hp % 5) / 3);
    const c = (hp % 5) % 3;
    
    return a + b + c;
}