const { nav } = require("./nav")
const { supportedLanguages } = require("./gatsby-config").siteMetadata
const path = require("path")

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  supportedLanguages.map(language => {
    nav[language].map(i => {
      createPage({
        component: path.resolve("src/templates/temp.js"),
        path: `/${language + i.url}`,
        context: {
          language,
          locationId: i.id,
          title: i.label,
        },
      })
    })
    createPage({
      component: path.resolve("src/templates/home.js"),
      path: `/${language}/`,
      context: {
        language,
        locationId: "home",
      },
    })
    createPage({
      component: path.resolve("src/templates/dogs.js"),
      path: `/${language + nav[language].filter(i => i.id === "dogs")[0].url}`,
      context: {
        title: nav[language].filter(i => i.id === "dogs")[0].label,
        language,
        locationId: "dogs",
      },
    })
    createPage({
      component: path.resolve("src/templates/cats.js"),
      path: `/${language + nav[language].filter(i => i.id === "cats")[0].url}`,
      context: {
        title: nav[language].filter(i => i.id === "cats")[0].label,
        language,
        locationId: "cats",
      },
    })
    createPage({
      component: path.resolve("src/templates/services.js"),
      path: `/${
        language + nav[language].filter(i => i.id === "services")[0].url
      }`,
      context: {
        title: nav[language].filter(i => i.id === "services")[0].label,
        language,
        locationId: "services",
      },
    })
    createPage({
      component: path.resolve("src/templates/about.js"),
      path: `/${language + nav[language].filter(i => i.id === "about")[0].url}`,
      context: {
        title: nav[language].filter(i => i.id === "about")[0].label,
        language,
        locationId: "about",
      },
    })
    createPage({
      component: path.resolve("src/templates/contact.js"),
      path: `/${
        language + nav[language].filter(i => i.id === "contact")[0].url
      }`,
      context: {
        title: nav[language].filter(i => i.id === "contact")[0].label,
        language,
        locationId: "contact",
      },
    })
    createPage({
      component: path.resolve("src/templates/reserve.js"),
      path: `/${language + nav[language].filter(i => i.id === "book")[0].url}`,
      context: {
        title: nav[language].filter(i => i.id === "book")[0].label,
        language,
        locationId: "book",
      },
    })
  })
}
