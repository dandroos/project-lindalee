const { primary } = require("./palette")

module.exports = {
  siteMetadata: {
    title: `Manohecha Hotel Canino & Felino`,
    description: `The best pet hotel in Fuerteventura.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
    supportedLanguages: ["es", "en", "de"],
  },
  plugins: [
    `gatsby-plugin-site-wrapper`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-mui-emotion`,
    // `gatsby-plugin-mui-pickers`,
    `gatsby-plugin-redux`,
    `gatsby-plugin-image`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        custom: {
          families: ["meticula-bold"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `admin`,
        path: `${__dirname}/content/admin`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-leaflet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `manohecha-hotel`,
        short_name: `manohecha`,
        start_url: `/`,
        background_color: primary,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
