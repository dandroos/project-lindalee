import detectBrowserLanguage from "detect-browser-language"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { connect } from "react-redux"
import { setLanguage, setLocationId } from "../redux/actions"

const IndexPage = ({ dispatch }) => {
  const { supportedLanguages } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          supportedLanguages
        }
      }
    }
  `).site.siteMetadata
  React.useEffect(() => {
    dispatch(setLocationId("home"))
    const storedLangPref = localStorage.getItem("manohecha_lang_pref")
    if (storedLangPref) {
      dispatch(setLanguage(storedLangPref))
    } else {
      const browserLang = detectBrowserLanguage().substr(0, 2)
      console.log(browserLang)
      if (supportedLanguages.includes(browserLang)) {
        dispatch(setLanguage(browserLang))
      } else {
        dispatch(setLanguage("es"))
      }
    }
    //eslint-disable-next-line
  }, [])
  return null
}

export default connect()(IndexPage)
