import * as h from "./helpers.ts";

const path = Deno.args[0];

const lines = h.file(path).lines().filter(Boolean);

console.log(lines.map(pacePyramid).unlines());

// Main Problem Solver

function* generator(sign: number = 1) {
  yield 5 * sign;
  yield 4 * sign;
  yield 3 * sign;
  yield 2 * sign;
  while (true) {
    yield 1 * sign;
  }
}

function pacePyramid(line: string) {
  const [distance, time] = line.words().map(h.int);
  const gen = generator(Math.sign(distance));
  const acceleration = Array.from(
    { length: Math.floor(Math.abs(distance) / 2) },
    () => undefined,
  ).map(() => gen.next().value);
  const center = Math.abs(distance) % 2 === 1 ? [gen.next().value] : [];
  const deceleration = acceleration.slice().reverse();

  return [0, ...acceleration, ...center, ...deceleration, 0].map(String)
    .unwords();
}

// function solveProblem2(problemInput: string): string {
//   const paces = problemInput.words().map(h.int);

//   const { pos, time } = paces.map(splitPace).reduce(
//     (acc, curr) => {
//       return {
//         pos: acc.pos + curr.pos,
//         time: acc.time + curr.time,
//       };
//     },
//     { pos: 0, time: 0 },
//   );

//   return [pos, time].map(String).unwords();
// }

// Problem Helper

function splitPace(pace: number): { pos: number; time: number } {
  return {
    pos: Math.sign(pace),
    time: pace === 0 ? 1 : Math.abs(pace),
  };
}
