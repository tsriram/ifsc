const slugify = require("slugify");
const path = require("path");

const slugifyOptions = {
  lower: true,
  remove: /[*+~.()'"!:@#\,]/g
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
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const progress = reporter.createProgress(`ifsc/gatsby-node.js`);
  console.time("(ifsc) total exports.createPages");
  console.time("(ifsc) initial graphql query");
  progress.setStatus("initial graphl query");
  const { createPage } = actions;
  const result = await graphql(`
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

  console.timeEnd("(ifsc) initial graphql query");

  console.time("(ifsc) created pages");

  progress.start();
  progress.total = result.data.allIfscJson.edges.length - 1;
  let start = Date.now();
  progress.setStatus(
    "Calling createPage for " + result.data.allIfscJson.edges.length + " pages"
  );

  result.data.allIfscJson.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/ifsc.tsx`),
      context: {
        id: node.id
      }
    });
    progress.tick(1);
  });

  progress.setStatus(
    "Called createPage for " +
      (result.data.allIfscJson.edges.length - 1) +
      " pages at " +
      (result.data.allIfscJson.edges.length - 1) /
        ((Date.now() - start) / 1000) +
      " pages/s"
  );
  progress.done();
  console.timeEnd("(ifsc) created pages");
  console.timeEnd("(ifsc) total exports.createPages");
  progress.setStatus("createPages finished");
};
