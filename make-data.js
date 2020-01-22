const flatMap = require("lodash/flatMap");
const path = require("path");
const fs = require("fs");

const originalDataPath = path.join(__dirname, "src", "data", "original");
const developDataPath = path.join(__dirname, "src", "data", "develop");
const buildDataPath = path.join(__dirname, "src", "data", "build");

try {
  const files = fs.readdirSync(originalDataPath);

  for (const file of files) {
    const readFilePath = path.join(originalDataPath, file);
    const developFilePath = path.join(developDataPath, file);
    const buildFilePath = path.join(buildDataPath, file);

    const fileContent = fs.readFileSync(readFilePath);
    const jsonContent = JSON.parse(fileContent);
    const contentArray = flatMap(jsonContent);

    fs.writeFileSync(buildFilePath, JSON.stringify(contentArray));
    fs.writeFileSync(developFilePath, JSON.stringify(contentArray.slice(0, 1)));
  }
} catch (error) {
  console.error(`Error while reading files: ${error}`);
}
