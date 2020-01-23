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

    let slug = "";
    if (bankSlug) {
      slug += bankSlug;
    }
    if (stateSlug) {
      slug += `/${stateSlug}`;
    }
    if (citySlug) {
      slug += `/${citySlug}`;
    }
    if (branchSlug) {
      slug += `/${branchSlug}-branch`;
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug
    });

    createNodeField({
      node,
      name: `bankSlug`,
      value: bankSlug
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // create pages to list states for each bank
  const bankPages = await graphql(`
    query {
      allIfscJson {
        edges {
          node {
            fields {
              bankSlug
            }
          }
        }
      }
    }
  `);

  bankPages.data.allIfscJson.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.bankSlug,
      component: path.resolve(`./src/templates/bank-page.tsx`),
      context: {
        bankSlug: node.fields.bankSlug
      }
    });
  });

  // create pages for all individual IFSC
  const allIfsc = await graphql(`
    query {
      allIfscJson {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  allIfsc.data.allIfscJson.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/ifsc.tsx`),
      context: {
        id: node.id
      }
    });
  });
};
