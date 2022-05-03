import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import { connect } from "react-redux"
import { nav } from "../../nav"
import { setShowMobileMenu } from "../redux/actions"
import LanguageSelector from "./LanguageSelector"
import NavContact from "./NavContact"

const NavMenu = ({ dispatch, isMobile, language }) => {
  const theme = useTheme()
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent={isMobile ? "center" : "space-between"}
      py={2}
      bgcolor="primary.main"
    >
      <Box component={Link} to={`/${language}/`} sx={{ cursor: "pointer" }}>
        <StaticImage
          src="../images/logo-with-text2.png"
          alt="Manohecha logo"
          width={220}
          quality="100"
          placeholder="none"
        />
      </Box>
      <Box width="100%" my={2.5}>
        <List disablePadding>
          {nav[language].map((i, ind) => (
            <ListItemButton
              key={ind}
              sx={{
                my: 0,
                py: 0.2,
                backgroundColor: i.highlight
                  ? theme.palette.success.light
                  : undefined,
                ":hover": {
                  backgroundColor: i.highlight
                    ? theme.palette.success.main
                    : undefined,
                },
                color: i.highlight
                  ? theme.palette.success.contrastText
                  : undefined,
              }}
              component={Link}
              to={`/${language + i.url}`}
              activeStyle={{
                backgroundColor: i.highlight
                  ? theme.palette.success.main
                  : theme.palette.primary.light,
              }}
              onClick={() => isMobile && dispatch(setShowMobileMenu(false))}
            >
              <ListItemText
                primary={i.label}
                primaryTypographyProps={{
                  align: "center",
                  variant: "button",
                  sx: { mb: -0.5 },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
      {!isMobile && (
        <Box width="100%">
          <NavContact />
        </Box>
      )}
      <Box>
        <LanguageSelector />
      </Box>
    </Box>
  )
}

const stp = s => ({
  language: s.language,
  isMobile: s.isMobile,
  siteReady: s.siteReady,
})

export default connect(stp)(NavMenu)
