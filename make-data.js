const slugify = require("slugify");
const path = require("path");
const _ = require("lodash");
const fs = require("fs");

const slugifyOptions = {
  lower: true,
  remove: /[^a-zA-Z\d\s]/g
};

const originalDataPath = path.join(__dirname, "src", "data", "original");
const developDataPath = path.join(__dirname, "src", "data", "develop");
const buildDataPath = path.join(__dirname, "src", "data", "build");

function makeIfscData() {
  try {
    const files = fs.readdirSync(originalDataPath);

    for (const file of files) {
      const readFilePath = path.join(originalDataPath, file);
      const developFilePath = path.join(developDataPath, file);
      const buildFilePath = path.join(buildDataPath, file);

      const fileContent = fs.readFileSync(readFilePath);
      const jsonContent = JSON.parse(fileContent);

      const ifscContentArray = [];
      _.each(jsonContent, ifscObject => {
        const {
          BANK: bank,
          BRANCH: branch,
          CITY: city,
          STATE: state,
          CENTRE: centre
        } = ifscObject;

        const bankSlug = bank && slugify(bank, slugifyOptions);
        const stateSlug = state && slugify(state, slugifyOptions);
        const citySlug = city && slugify(city, slugifyOptions);
        const centreSlug = centre && slugify(centre, slugifyOptions);
        const branchSlug = branch && slugify(branch, slugifyOptions);

        ifscContentArray.push({
          ...ifscObject,
          bankSlug,
          stateSlug,
          citySlug: citySlug || centreSlug,
          branchSlug,
          type: "IfscJson"
        });
      });
      fs.writeFileSync(buildFilePath, JSON.stringify(ifscContentArray));
      fs.writeFileSync(
        developFilePath,
        JSON.stringify(ifscContentArray.slice(0, 5))
      );
    }
  } catch (error) {
    console.error(`Error while reading files: ${error}`);
  }
}

function getLabelAndSlug(text) {
  return {
    label: text,
    slug: slugify(text, slugifyOptions)
  };
}

function makeBankPageData(dataPath) {
  const files = fs.readdirSync(dataPath);
  const bankPageDatafilePath = path.join(dataPath, "bank-page-data.json");
  const bankStatesPageDatafilePath = path.join(
    dataPath,
    "bank-states-page-data.json"
  );
  const bankStateCitiesPageDatafilePath = path.join(
    dataPath,
    "bank-state-cities-page-data.json"
  );
  const bankPageData = [];
  const bankStatesPageData = [];
  const bankStateCitiesPageData = [];

  for (const developFile of files) {
    const readFilePath = path.join(dataPath, developFile);
    const fileContent = fs.readFileSync(readFilePath);
    const jsonContent = JSON.parse(fileContent);
    const states = new Set();
    const stateCities = {};
    const stateCityBranches = {};

    const bank = jsonContent[0].BANK;
    const bankSlug = jsonContent[0].bankSlug;
    for (const ifscObject of jsonContent) {
      const { STATE: state, CITY, CENTRE, BRANCH: branch } = ifscObject;
      const city = CITY || CENTRE;
      if (state) {
        states.add(state);
      }
      if (city) {
        stateCities[state] = stateCities[state] || new Set();
        stateCities[state].add(city);
      }
      if (branch) {
        stateCityBranches[state] = stateCityBranches[state] || {};
        stateCityBranches[state][city] =
          stateCityBranches[state][city] || new Set();
        stateCityBranches[state][city].add(branch);
      }
    }
    bankPageData.push({
      bank,
      bankSlug,
      states: Array.from(states).map(getLabelAndSlug),
      type: "BankStatesJson"
    });

    Object.keys(stateCities).forEach(state => {
      bankStatesPageData.push({
        bank,
        bankSlug,
        state,
        stateSlug: slugify(state, slugifyOptions),
        cities: Array.from(stateCities[state]).map(getLabelAndSlug),
        type: "BankStateCitiesJson"
      });
    });

    Object.keys(stateCityBranches).forEach(state => {
      const stateSlug = slugify(state, slugifyOptions);
      Object.keys(stateCityBranches[state]).forEach(city => {
        bankStateCitiesPageData.push({
          bank,
          bankSlug,
          state,
          stateSlug,
          city,
          citySlug: slugify(city, slugifyOptions),
          branches: Array.from(stateCityBranches[state][city]).map(
            getLabelAndSlug
          ),
          type: "BankStateCityBranchesJson"
        });
      });
    });
  }
  fs.writeFileSync(bankPageDatafilePath, JSON.stringify(bankPageData));
  fs.writeFileSync(
    bankStatesPageDatafilePath,
    JSON.stringify(bankStatesPageData)
  );
  fs.writeFileSync(
    bankStateCitiesPageDatafilePath,
    JSON.stringify(bankStateCitiesPageData)
  );
}

console.time("makeIfscData");
makeIfscData();
console.timeEnd("makeIfscData");

// make bank page data
console.time("makeBankPageData");
makeBankPageData(developDataPath);
makeBankPageData(buildDataPath);
console.timeEnd("makeBankPageData");
