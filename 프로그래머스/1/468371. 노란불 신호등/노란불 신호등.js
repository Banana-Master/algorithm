function solution(signals) {
    const periods = signals.map(signal => signal.reduce((a, b) => a + b, 0));
    
    const maxLimit = periods.reduce((acc, cur) => lcm(acc, cur), periods[0]);
    
    for (let i = 1; i <= maxLimit; i++) {
        const a = signals.map((signal) => signalColor(signal, i));
        
        if (yellowCheck(a)) return i;
    }
    
    return -1;
}

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

const signalColor = (signal, n) => {
    const full = signal.reduce((a, b) => a + b, 0);
    let remain = n % full;
    if (remain === 0) remain = full;
    
    let time = signal[0];
    if (time >= remain) return "GREEN";
    
    time += signal[1];
    if (time >= remain) return "YELLOW";
    
    return "RED";    
}

const yellowCheck = (arr) => {
    return arr.every(color => color === "YELLOW");
}