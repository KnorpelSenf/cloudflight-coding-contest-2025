import * as h from "./helpers.ts";

const path = Deno.args[0];

const lines = h.file(path).lines().filter(Boolean);

console.log(lines.map(solveProblem).unlines());

// Main Problem Solver

function solveProblem(problemInput: string): string {
  const paces = problemInput.words().map(h.int);

  const { pos, time } = paces.map(splitPace).reduce(
    (acc, curr) => {
      return {
        pos: acc.pos + curr.pos,
        time: acc.time + curr.time,
      };
    },
    { pos: 0, time: 0 },
  );

  return [pos, time].map(String).unwords();
}

// Problem Helper

function splitPace(pace: number): { pos: number; time: number } {
  return {
    pos: Math.sign(pace),
    time: pace === 0 ? 1 : Math.abs(pace),
  };
}
