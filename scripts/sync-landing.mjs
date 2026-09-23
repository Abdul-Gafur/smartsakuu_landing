import { readFile, writeFile, mkdir } from "node:fs/promises";

// index.html is the editable source. The public copy is a generated artifact.
const source = new URL("../index.html", import.meta.url);
const output = new URL("../public/index.html", import.meta.url);
const html = await readFile(source, "utf8");
await mkdir(new URL("../public/", import.meta.url), { recursive: true });
await writeFile(output, html.replaceAll("./public/assets/", "./assets/"));
console.log("SmartSakuu landing page available at /index.html");
