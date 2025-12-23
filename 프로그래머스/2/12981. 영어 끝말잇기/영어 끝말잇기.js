function solution(n, words) {
    const wordsSet = [];
    for (let i = 0, k = 1; i < words.length; i += n, k++) {
        for (let j = 1; j <= n; j++) {
            if (checkDuplicationHandler(wordsSet, words[i + (j - 1)])) return [j, k];
            
            if (wordsSet.length > 0) {
                const lastWord = wordsSet[wordsSet.length - 1];
                if (!checkWordReplayHandler(lastWord, words[i + (j - 1)])) return [j, k];
            }
            wordsSet.push(words[i + (j - 1)]);
        }
    }
    return [0, 0];
}

const checkDuplicationHandler = (arr, str) => {
    return arr.includes(str);
}

const checkWordReplayHandler = (str1, str2) => {
    return str1.charAt(str1.length - 1) === str2.charAt(0);
}