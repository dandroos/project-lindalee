import { Box, IconButton } from "@mui/material"
import React from "react"
import ReactCountryFlag from "react-country-flag"
import { connect } from "react-redux"
import { setLanguage, setShowMobileMenu } from "../redux/actions"

const LanguageSelector = ({ dispatch, language, isMobile }) => {
  const handleClick = e => {
    if (isMobile) {
      dispatch(setShowMobileMenu(false))
    }
    const lang = e.currentTarget.getAttribute("lang")
    localStorage.setItem("manohecha_lang_pref", lang)
    dispatch(setLanguage(lang))
  }
  return (
    <Box>
      <IconButton
        lang="en"
        sx={language !== "en" ? { filter: "grayscale(90%)" } : undefined}
        onClick={handleClick}
      >
        <ReactCountryFlag countryCode="gb" svg />
      </IconButton>
      <IconButton
        lang="es"
        sx={language !== "es" ? { filter: "grayscale(90%)" } : undefined}
        onClick={handleClick}
      >
        <ReactCountryFlag countryCode="es" svg />
      </IconButton>
      <IconButton
        lang="de"
        sx={language !== "de" ? { filter: "grayscale(90%)" } : undefined}
        onClick={handleClick}
      >
        <ReactCountryFlag countryCode="de" svg />
      </IconButton>
    </Box>
  )
}

const stp = s => ({
  language: s.language,
  isMobile: s.isMobile,
})
export default connect(stp)(LanguageSelector)
