function solution(babbling) {
	const babb = ['aya', 'ye', 'woo', 'ma'];
	let result = 0;

	babbling.forEach((word) => {
		let x = word;
		let z = '';

		for (let y = 0; y < babb.length; y++) {
			if (z === babb[y]) continue;

			if (x.startsWith(babb[y])) {
				x = x.slice(babb[y].length);
				z = babb[y];
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
