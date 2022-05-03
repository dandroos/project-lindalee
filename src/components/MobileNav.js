import {
  AppBar,
  Box,
  Dialog,
  Fab,
  IconButton,
  Portal,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material"
import { graphql, navigate, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Close, Paw } from "mdi-material-ui"
import React from "react"
import { connect } from "react-redux"
import { setShowMobileMenu } from "../redux/actions"
import NavMenu from "./NavMenu"

const MobileNav = ({ dispatch, language, isOpen }) => {
  const { title } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `).site.siteMetadata

  const handleClose = () => {
    dispatch(setShowMobileMenu(false))
  }

  return (
    <>
      <Portal>
        <Dialog open={isOpen} fullScreen TransitionComponent={Slide}>
          <Fab
            sx={{ position: "absolute", top: 15, right: 15 }}
            onClick={handleClose}
            color="secondary"
          >
            <Close />
          </Fab>
          <NavMenu />
        </Dialog>
      </Portal>
      <AppBar>
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            onClick={() => navigate(`/${language}/`)}
            sx={{ cursor: "pointer" }}
          >
            <Box mr={1}>
              <StaticImage
                src="../images/logo-without-text3.png"
                alt="Manohecha logo"
                width={50}
                quality={99}
                placeholder="none"
              />
            </Box>
            <Typography variant="h5" variantMapping={{ h5: "h1" }}>
              {title.split(" ")[0]}
              <Typography
                variant="button"
                component="span"
                display="block"
                sx={{
                  lineHeight: "normal",
                  mt: -0.65,
                }}
              >
                {title.split(" ").splice(1).join(" ")}
              </Typography>
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => dispatch(setShowMobileMenu(true))}
          >
            <Paw />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  )
}

const stp = s => ({
  language: s.language,
  isOpen: s.showMobileMenu,
})

export default connect(stp)(MobileNav)
