import { file } from "./helpers.ts";

file("deno.jsonc").lines().forEach((line) => {
  console.log(`-- ${line}`);
});
