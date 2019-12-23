const slugify = text => text.replace(/ /g, "-").toLowerCase();

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
