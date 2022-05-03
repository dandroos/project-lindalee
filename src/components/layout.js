import * as React from "react"

import { AnimatePresence, motion } from "framer-motion"
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material"
import { setFontsLoaded, setIsMobile, setSiteReady } from "../redux/actions"

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import FontFaceObserver from "fontfaceobserver"
import Footer from "./Footer"
import LanguageRedirect from "./dialogs/LanguageRedirect"
import LanguageUtility from "./LanguageUtility"
import { LocalizationProvider } from "@mui/x-date-pickers"
import Nav from "./Nav"
import SpeedContact from "./SpeedContact"
import Toast from "./Toast"
import { connect } from "react-redux"

const Layout = ({
  language,
  fontsLoaded,
  siteReady,
  location,
  locationId,
  dispatch,
  children,
  drawerWidth,
}) => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))

  React.useEffect(() => {
    dispatch(setIsMobile(isMobile))
    //eslint-disable-next-line
  }, [isMobile])

  React.useEffect(() => {
    const loadFonts = () => {
      var fontA = new FontFaceObserver("meticula")
      var fontB = new FontFaceObserver("meticula-bold")

      Promise.all([fontA.load(), fontB.load()]).then(function () {
        dispatch(setFontsLoaded(true))
      }, loadFonts)
    }
    loadFonts()
    //eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (!siteReady) {
      if (language && fontsLoaded) {
        dispatch(setSiteReady(true))
      }
    }
    //eslint-disable-next-line
  }, [language, fontsLoaded])

  return (
    <>
      <LocalizationProvider locale={language} dateAdapter={AdapterMoment}>
        {siteReady && <LanguageUtility pathname={location.pathname} />}
        {isMobile && <SpeedContact />}
        <LanguageRedirect />
        <Toast />
        <Box display="flex" flexDirection="column">
          <Box component="header">{siteReady && <Nav />}</Box>
          <AnimatePresence exitBeforeEnter>
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={location.pathname}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              width={isMobile ? undefined : `calc(100% - ${drawerWidth}px)`}
              ml={isMobile ? undefined : `${drawerWidth}px`}
            >
              <Box
                component="main"
                pb={locationId === "home" ? 0 : 2}
                minHeight="100vh"
              >
                {isMobile && locationId !== "home" && <Toolbar />}
                {children}
              </Box>
              <Footer />
            </Box>
          </AnimatePresence>
        </Box>
      </LocalizationProvider>
    </>
  )
}

const stp = s => ({
  siteReady: s.siteReady,
  drawerWidth: s.drawerWidth,
  language: s.language,
  fontsLoaded: s.fontsLoaded,
  locationId: s.locationId,
})

export default connect(stp)(Layout)
