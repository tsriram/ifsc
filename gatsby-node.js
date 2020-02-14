const path = require("path");

// This will create pages that enable navigating from home page (with list of banks)
//  --> bank-state page (list of states that the bank is in) --> bank-state-city page
// (list of cities in the state where the bank is in) --> bank-state-city-branch (with list of branches)
// --> individual branch page (which has the acutal IFSC)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const allIfsc = await graphql(`
    query {
      allIfscJson {
        edges {
          node {
            bankSlug
            stateSlug
            citySlug
            branchSlug
            id
          }
        }
      }
    }
  `);

  allIfsc.data.allIfscJson.edges.forEach(({ node }) => {
    const { bankSlug, stateSlug, citySlug, branchSlug } = node;
    if (bankSlug && stateSlug && citySlug && branchSlug) {
      const slug = `${bankSlug}/${stateSlug}/${citySlug}/${branchSlug}-branch`;
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/ifsc.tsx`),
        context: {
          id: node.id
        }
      });
    }
  });

  // create bank (list of states for each bank) pages
  const allBankStates = await graphql(`
    query {
      allBankStatesJson {
        edges {
          node {
            bankSlug
            id
          }
        }
      }
    }
  `);

  allBankStates.data.allBankStatesJson.edges.forEach(({ node }) => {
    createPage({
      path: node.bankSlug,
      component: path.resolve(`./src/templates/bank-page.tsx`),
      context: {
        id: node.id
      }
    });
  });

  // create bank-state (list of cities for each bank-state) pages
  const allBankStateCities = await graphql(`
    query {
      allBankStateCitiesJson {
        edges {
          node {
            bankSlug
            stateSlug
            id
          }
        }
      }
    }
  `);

  allBankStateCities.data.allBankStateCitiesJson.edges.forEach(({ node }) => {
    createPage({
      path: `${node.bankSlug}/${node.stateSlug}`,
      component: path.resolve(`./src/templates/bank-state-page.tsx`),
      context: {
        id: node.id
      }
    });
  });

  // create bank-state-city (list of branches for each bank-state-city) pages
  const allBankStateCityBranches = await graphql(`
    query {
      allBankStateCityBranchesJson {
        edges {
          node {
            bankSlug
            stateSlug
            citySlug
            id
          }
        }
      }
    }
  `);

  allBankStateCityBranches.data.allBankStateCityBranchesJson.edges.forEach(
    ({ node }) => {
      createPage({
        path: `${node.bankSlug}/${node.stateSlug}/${node.citySlug}`,
        component: path.resolve(`./src/templates/bank-state-city-page.tsx`),
        context: {
          id: node.id
        }
      });
    }
  );
};
