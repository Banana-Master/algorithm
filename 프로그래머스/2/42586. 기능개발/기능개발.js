function solution(progresses, speeds) {
    const answer = [];
    
    let days = progresses.map((progress, i) => 
        Math.ceil((100 - progress) / speeds[i])
    );
    
    let maxDay = days[0];
    let count = 0;
    
    for (let i = 0; i < days.length; i++) {
        if (days[i] <= maxDay) {
            count++;
        } else {
            answer.push(count);
            maxDay = days[i];
            count = 1;
        }
    }
    
    answer.push(count);
    
    return answer;
}