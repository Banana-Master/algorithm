function solution(schedules, timelogs, startday) {
  let result = 0;

  for (let i = 0; i < schedules.length; i++) {
    const limit = toMinutes(schedules[i]) + 10;
    let ok = true;

    for (let j = 0; j < 7; j++) {
      const day = ((startday - 1 + j) % 7) + 1;
      if (day === 6 || day === 7) continue;

      const logTime = toMinutes(timelogs[i][j]);
      if (logTime > limit) {
        ok = false;
        break;
      }
    }

    if (ok) result++;
  }

  return result;
}


const toMinutes = (time) => {
    const h = Math.floor(time / 100);
    const m = time % 100;
    return h * 60 + m;
};