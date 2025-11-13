/** reads a text file and returns it as string */
export function file(path: string) {
  return Deno.readTextFileSync(path);
}

/** returns the lines of a string */
export function lines(string: string) {
  return string.split(/\r?\n/);
}

/** returns the words of a string */
export function words(string: string) {
  return string.split(/\s/);
}

/** safely converts a string to an integer in base 10 */
export function int(string: string) {
  const num = parseInt(string, 10);
  if (Number.isNaN(num)) {
    throw new Error(`cannot convert string '${string}' to a number!`);
  }
  return num;
}
