/** reads a text file and returns it as string */
export function file(path: string) {
  const contents = Deno.readTextFileSync(path);
  const eol = contents.indexOf("\n");
  return contents.slice(eol + 1);
}

/** returns the lines of a string */
export function lines(string: string) {
  return string.split(/\r?\n/);
}

/** returns the words of a string */
export function words(string: string) {
  return string.split(/\s/);
}

interface UnlinesOptions {
  trailingLine?: boolean;
}

/** returns the full file from lines */
export function unlines(words: string[], opts?: UnlinesOptions) {
  const trail = opts?.trailingLine ?? false;
  return words.join("\n") + (trail ? "\n" : "");
}

/** ruturn the lines from words */
export function unwords(words: string[]) {
  return words.join(" ");
}

/** safely converts a string to an integer in base 10 */
export function int(string: string) {
  const num = parseInt(string, 10);
  if (Number.isNaN(num)) {
    throw new Error(`cannot convert string '${string}' to a number!`);
  }
  return num;
}

declare global {
  interface String {
    lines(): string[];
    words(): string[];
  }
  type StringArray<T> = T extends string ? {
      unlines(opts?: UnlinesOptions): string;
      unwords(): string;
    }
    : never;

  interface Array<T> {
    unlines: StringArray<T>["unlines"];
    unwords: StringArray<T>["unwords"];
  }
}

String.prototype.lines = function () {
  return lines(this.toString());
};

String.prototype.words = function () {
  return words(this.toString());
};

Array.prototype.unlines = function (opts?: UnlinesOptions) {
  return unlines(this as string[], opts);
};

Array.prototype.unwords = function () {
  return unwords(this as string[]);
};
