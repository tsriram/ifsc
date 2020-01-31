const slugify = require("slugify");
const path = require("path");

const slugifyOptions = {
  lower: true,
  remove: /[^a-zA-Z\d\s]/g
};

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === "IfscJson") {
    const { createNodeField } = actions;
    const { BANK: bank, BRANCH: branch, CITY: city, STATE: state } = node;

    const bankSlug = bank && slugify(bank, slugifyOptions);
    const stateSlug = state && slugify(state, slugifyOptions);
    const citySlug = city && slugify(city, slugifyOptions);
    const branchSlug = branch && slugify(branch, slugifyOptions);

    if (!(bankSlug && stateSlug && citySlug && branchSlug)) {
      return;
    }

    let slug = "";
    if (bankSlug) {
      slug += bankSlug;
    }
    createNodeField({
      node,
      name: `bankSlug`,
      value: bankSlug
    });

    if (stateSlug) {
      slug += `/${stateSlug}`;
      createNodeField({
        node,
        name: `stateSlug`,
        value: stateSlug
      });
    }

    if (citySlug) {
      slug += `/${citySlug}`;
      createNodeField({
        node,
        name: `citySlug`,
        value: citySlug
      });
    }

    if (branchSlug) {
      slug += `/${branchSlug}-branch`;
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const bankPages = {};
  const bankStatePages = {};
  const bankStateCityPages = {};

  const allIfsc = await graphql(`
    query {
      allIfscJson {
        edges {
          node {
            id
            fields {
              slug
              bankSlug
              stateSlug
              citySlug
            }
          }
        }
      }
    }
  `);

  allIfsc.data.allIfscJson.edges.forEach(({ node }) => {
    const { slug, bankSlug, stateSlug, citySlug } = node.fields || {};
    if (bankSlug && stateSlug && citySlug && slug) {
      const bankStatePagePath = `${bankSlug}/${stateSlug}`;
      const bankStateCityPagePath = `${bankStatePagePath}/${citySlug}`;

      if (!bankPages[bankSlug]) {
        createPage({
          path: bankSlug,
          component: path.resolve(`./src/templates/bank-page.tsx`),
          context: {
            bankSlug
          }
        });
        bankPages[bankSlug] = true;
      }

      if (!bankStatePages[bankStatePagePath]) {
        createPage({
          path: bankStatePagePath,
          component: path.resolve(`./src/templates/bank-state-page.tsx`),
          context: {
            bankSlug: bankSlug,
            stateSlug: stateSlug
          }
        });
        bankStatePages[bankStatePagePath] = true;
      }

      if (!bankStateCityPages[bankStateCityPagePath]) {
        createPage({
          path: bankStateCityPagePath,
          component: path.resolve(`./src/templates/bank-state-city-page.tsx`),
          context: {
            bankSlug: bankSlug,
            stateSlug: stateSlug,
            citySlug: citySlug
          }
        });
        bankStateCityPages[bankStateCityPagePath] = true;
      }

      createPage({
        path: slug,
        component: path.resolve(`./src/templates/ifsc.tsx`),
        context: {
          id: node.id
        }
      });
    }
  });
};
