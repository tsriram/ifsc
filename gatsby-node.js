const slugify = text => text.replace(/ /g, "-").toLowerCase();
const path = require("path");

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === "IfscCsv") {
    const { createNodeField } = actions;
    const { bank, branch, city, state } = node;

    const bankSlug = slugify(bank);
    const stateSlug = slugify(state);
    const citySlug = slugify(city);
    const branchSlug = slugify(branch);

    const slug = `${bankSlug}/${stateSlug}/${citySlug}/${branchSlug}-branch`;

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
      allIfscCsv {
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
  progress.total = result.data.allIfscCsv.edges.length - 1;
  let start = Date.now();
  progress.setStatus(
    "Calling createPage for " + result.data.allIfscCsv.edges.length + " pages"
  );

  result.data.allIfscCsv.edges.forEach(({ node }) => {
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
      (result.data.allIfscCsv.edges.length - 1) +
      " pages at " +
      (result.data.allIfscCsv.edges.length - 1) /
        ((Date.now() - start) / 1000) +
      " pages/s"
  );
  progress.done();
  console.timeEnd("(ifsc) created pages");
  console.timeEnd("(ifsc) total exports.createPages");
  progress.setStatus("createPages finished");
};
