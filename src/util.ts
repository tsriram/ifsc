// TODO: This is the same code we use in gatsby-node.js to create slug, but that's JS
// Find a way to keep this in a single place
const slugifyLib = require("slugify");

const slugifyOptions = {
  lower: true,
  remove: /[^a-zA-Z\d\s]/g
};

export const slugify = (text: string) => slugifyLib(text, slugifyOptions);
