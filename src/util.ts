const slugifyLib = require("slugify");
const path = require("path");

const slugifyOptions = {
  lower: true,
  remove: /[^a-zA-Z\d\s]/g
};

export const slugify = (text: string) => slugifyLib(text, slugifyOptions);
