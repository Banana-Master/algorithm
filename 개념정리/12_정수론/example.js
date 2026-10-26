// 1) 소수 판별: 2 ~ √n 까지만 나눠 본다 O(√N)
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// 2) 에라토스테네스의 체: n 이하의 모든 소수
function sieve(n) {
  const isP = new Array(n + 1).fill(true);
  isP[0] = isP[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (!isP[i]) continue;
    for (let j = i * i; j <= n; j += i) isP[j] = false; // i*i 부터 지워도 충분
  }
  const primes = [];
  for (let x = 2; x <= n; x++) if (isP[x]) primes.push(x);
  return primes;
}

// 3) 유클리드 호제법
function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

// 4) 약수 구하기 O(√N)
function divisors(n) {
  const small = [];
  const large = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      small.push(i);
      if (i !== n / i) large.push(n / i);
    }
  }
  return [...small, ...large.reverse()];
}

console.log(Array.from({ length: 20 }, (_, i) => i).filter(isPrime)); // [2,3,5,7,11,13,17,19]
console.log(sieve(30));          // [2,3,5,7,11,13,17,19,23,29]
console.log(gcd(48, 18));        // 6
console.log(lcm(4, 6));          // 12
console.log([2, 6, 8, 14].reduce(lcm)); // 168  (N개의 최소공배수)
console.log(divisors(36));       // [1,2,3,4,6,9,12,18,36]

// 큰 수는 BigInt: 숫자 뒤에 n
console.log(2 ** 53 + 1);        // 9007199254740992  <- 정밀도 깨짐
console.log(2n ** 53n + 1n);     // 9007199254740993n
