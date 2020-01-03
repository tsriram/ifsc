/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path:
          process.env.gatsby_executing_command === "develop"
            ? `${__dirname}/src/data/develop`
            : `${__dirname}/src/data/build`
      }
    },
    {
      resolve: `gatsby-transformer-csv`,
      options: {
        typeName: "IfscCsv"
      }
    },
    `gatsby-plugin-sass`
    // {
    //   resolve: `gatsby-plugin-schema-snapshot`,
    //   options: {
    //     path: `schema.gql`,
    //     include: {
    //       plugins: [`gatsby-transformer-csv`]
    //     },
    //     update: process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT
    //   }
    // }
  ]
};
