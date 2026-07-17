class VideoPlayer {
    constructor(video_len, pos, op_start, op_end) {
        this.max_time = this.toSeconds(video_len);
        this.current_time = this.toSeconds(pos);
        this.op_start = this.toSeconds(op_start);
        this.op_end = this.toSeconds(op_end);
        
        this.checkOpening();
    }

    toSeconds(timeStr) {
        const [mm, ss] = timeStr.split(':').map(Number);
        return mm * 60 + ss;
    }

    checkOpening() {
        if (this.current_time >= this.op_start && this.current_time <= this.op_end) {
            this.current_time = this.op_end;
        }
    }

    next() {
        this.current_time = Math.min(this.max_time, this.current_time + 10);
        this.checkOpening();
    }

    prev() {
        this.current_time = Math.max(0, this.current_time - 10);
        this.checkOpening();
    }

    getResult() {
        const min = String(Math.floor(this.current_time / 60)).padStart(2, '0');
        const sec = String(this.current_time % 60).padStart(2, '0');
        return `${min}:${sec}`;
    }
}

function solution(video_len, pos, op_start, op_end, commands) {
    const player = new VideoPlayer(video_len, pos, op_start, op_end);
    
    for (const command of commands) {
        player[command]();
    }
    
    return player.getResult();
}