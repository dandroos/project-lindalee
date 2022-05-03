import { useEffect } from "react"
import { connect } from "react-redux"
import { setLanguage, setShowLanguageRedirect } from "../redux/actions"
import detectBrowserLanguage from "detect-browser-language"
import { navigate, graphql, useStaticQuery } from "gatsby"
import { nav } from "../../nav"

const LanguageUtility = ({ pathname, dispatch, language, locationId }) => {
  const { supportedLanguages } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          supportedLanguages
        }
      }
    }
  `).site.siteMetadata

  useEffect(() => {
    const storedLangPref = localStorage.getItem("manohecha_lang_pref")
    if (storedLangPref) {
      dispatch(setLanguage(storedLangPref))
    } else {
      const browserLang = detectBrowserLanguage().substr(0, 2)
      if (
        supportedLanguages.includes(browserLang) &&
        language !== browserLang
      ) {
        if (!localStorage.getItem("manohecha_lang_redirect")) {
          dispatch(
            setShowLanguageRedirect({
              open: true,
              redirectLang: browserLang,
            })
          )
        }
      } else {
        if (!language) {
          dispatch(setLanguage("es"))
        }
      }
    }
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (locationId) {
      const url = `/${
        language +
        nav[language].filter(i => {
          return locationId === i.id
        })[0].url
      }`

      if (url !== pathname) {
        navigate(url)
      }
    }
    //eslint-disable-next-line
  }, [language])

  return null
}

const stp = s => ({
  language: s.language,
  locationId: s.locationId,
})

export default connect(stp)(LanguageUtility)
