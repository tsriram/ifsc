const slugify = text => text.replace(/ /g, "-").toLowerCase();
const path = require("path");

const getSlug = (bank, branch, city, state) => {
  return `${slugify(bank)}-${slugify(branch)}-${slugify(city)}-${slugify(
    state
  )}-ifsc`;
};

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === "IfscCsv") {
    const { createNodeField } = actions;
    const { BANK, BRANCH, CITY, STATE } = node;
    const slug = getSlug(BANK, BRANCH, CITY, STATE);

    createNodeField({
      node,
      name: `slug`,
      value: slug
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
