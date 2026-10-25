const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const path = require("node:path");
const postcss = require("postcss");
const postcssImport = require("postcss-import");
const postcssNested = require("postcss-nested").default;
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const sourceDirectory = path.resolve(__dirname, "..", "css");
const outputDirectory = path.resolve(__dirname, "..", "css-dist");
const isProduction = process.argv.includes("--production");
const isWatch = process.argv.includes("--watch");
const plugins = [postcssImport(), postcssNested(), autoprefixer()];

if (isProduction) {
  plugins.push(cssnano());
}

async function buildCss() {
  const files = (await fsPromises.readdir(sourceDirectory))
    .filter((file) => file.endsWith(".css"))
    .sort();

  await fsPromises.mkdir(outputDirectory, { recursive: true });

  for (const file of files) {
    const sourcePath = path.join(sourceDirectory, file);
    const outputPath = path.join(outputDirectory, file);
    const css = await fsPromises.readFile(sourcePath, "utf8");
    const result = await postcss(plugins).process(css, {
      from: sourcePath,
      to: outputPath,
    });

    await fsPromises.writeFile(outputPath, result.css);
  }
}

async function main() {
  await buildCss();

  if (!isWatch) {
    return;
  }

  let timer;
  let buildQueue = Promise.resolve();
  const watcher = fs.watch(sourceDirectory, { recursive: true }, (_eventType, filename) => {
    if (filename && path.extname(filename.toString()) !== ".css") {
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      buildQueue = buildQueue.then(buildCss).catch((error) => {
        console.error("CSS rebuild failed:", error);
      });
    }, 100);
  });

  watcher.on("error", (error) => {
    console.error("CSS watch failed:", error);
    process.exitCode = 1;
    watcher.close();
  });
}

main().catch((error) => {
  console.error("CSS build failed:", error);
  process.exitCode = 1;
});
