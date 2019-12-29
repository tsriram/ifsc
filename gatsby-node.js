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
      name: `bankSlug`,
      value: bankSlug
    });

    createNodeField({
      node,
      name: `stateSlug`,
      value: stateSlug
    });

    createNodeField({
      node,
      name: `citySlug`,
      value: citySlug
    });

    createNodeField({
      node,
      name: `slug`,
      value: slug
    });

    createNodeField({
      node,
      name: `branchSlug`,
      value: branchSlug
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allIfscCsv {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  result.data.allIfscCsv.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/ifsc.tsx`),
      context: {
        slug: node.fields.slug
      }
    });
  });
};
