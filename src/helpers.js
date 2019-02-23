const k = x => y => x;
const map = f => xs => xs.map(f);
const pipe = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x);
const range = n => m => [...Array(m - n)].map((_, i) => n + i);
const repeat = c => n => map(k(c))(range(0)(n));

export {
  k, map, pipe, range, repeat,
};
