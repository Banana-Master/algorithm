function solution(babbling) {
    const babb = ["aya", "ye", "woo", "ma"];
    let result = 0;
    
    babbling.forEach((word) => {
        let x = word;

        for (let y = 0; y < babb.length; y++) {
            if (x.startsWith(babb[y])) {
                x = x.slice(babb[y].length);
                y = -1;
                continue;
            }
        }

        if (x.length === 0) {
            result++;
        }
    });

    return result;
}
