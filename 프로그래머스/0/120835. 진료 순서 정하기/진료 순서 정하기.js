function solution(emergency) {
    const sortedEmergency = [...emergency].sort((a, b) => b - a);
    return emergency.map(value => sortedEmergency.indexOf(value) + 1);
}