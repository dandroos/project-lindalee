import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material"
import { Email, Phone } from "mdi-material-ui"
import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import ReactCountryFlag from "react-country-flag"
import { connect } from "react-redux"
import text from "../dictionary"

const NavContact = ({ language }) => {
  const { phoneNumber_en, phoneNumber_es, emailAddress } =
    useStaticQuery(graphql`
      {
        file(sourceInstanceName: { eq: "admin" }, name: { eq: "contact" }) {
          childMarkdownRemark {
            frontmatter {
              phoneNumber_en
              phoneNumber_es
              emailAddress
            }
          }
        }
      }
    `).file.childMarkdownRemark.frontmatter

  const theme = useTheme()

  return (
    <List
      dense
      sx={{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
      }}
      disablePadding
    >
      <ListItemButton
        sx={{ py: 0 }}
        component="a"
        href={`tel:34${phoneNumber_en}`}
      >
        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
          <Phone />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <>
              <Typography variant="body2">
                {text.phoneUs[language]}
                <ReactCountryFlag
                  style={{ marginLeft: 10 }}
                  countryCode="gb"
                  svg
                />
              </Typography>
            </>
          }
          secondary={
            <Typography variant="caption" color={theme.palette.primary.light}>
              +34{" "}
              {`${phoneNumber_en.substr(0, 3)} ${phoneNumber_en.substr(
                3,
                3
              )} ${phoneNumber_en.substr(6, 3)}`}
            </Typography>
          }
          sx={{ mb: 0 }}
          // sx={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "space-between",
          // }}
        />
      </ListItemButton>
      <Divider />
      <ListItemButton
        component="a"
        href={`tel:34${phoneNumber_es}`}
        target="_blank"
        sx={{ py: 0 }}
      >
        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
          <Phone />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <>
              <Typography variant="body2">
                {text.phoneUs[language]}
                <ReactCountryFlag
                  style={{ marginLeft: 10 }}
                  countryCode="es"
                  svg
                />
                <ReactCountryFlag
                  style={{ marginLeft: 10 }}
                  countryCode="gb"
                  svg
                />
              </Typography>
            </>
          }
          secondary={
            <Typography variant="caption" color={theme.palette.primary.light}>
              +34{" "}
              {`${phoneNumber_es.substr(0, 3)} ${phoneNumber_es.substr(
                3,
                3
              )} ${phoneNumber_es.substr(6, 3)}`}
            </Typography>
          }
          sx={{ mb: 0 }}
          // sx={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "space-between",
          // }}
        />
      </ListItemButton>
      <Divider />
      {/* <ListItemButton
        component="a"
        href={`https://wa.me/34${phoneNumber_es}`}
        target="_blank"
        sx={{ py: 0 }}
      >
        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
          <Whatsapp />
        </ListItemIcon>
        <ListItemText
          primary="WhatsApp"
          secondary={`+34 ${phoneNumber_es.substr(
            0,
            3
          )} ${phoneNumber_es.substr(3, 3)} ${phoneNumber_es.substr(6, 3)}`}
          secondaryTypographyProps={{
            variant: "caption",
            color: theme.palette.primary.light,
          }}
          sx={{ mb: 0 }}
          // sx={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "space-between",
          // }}
        />
      </ListItemButton>
      <Divider /> */}
      <ListItemButton
        component="a"
        href={`mailto:${emailAddress}`}
        target="_blank"
        sx={{ py: 0 }}
      >
        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
          <Email />
        </ListItemIcon>
        <ListItemText
          primary={text.emailUs[language]}
          secondary={emailAddress}
          secondaryTypographyProps={{
            variant: "caption",
            color: theme.palette.primary.light,
          }}
          sx={{ mb: 0 }}
          // sx={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "space-between",
          // }}
        />
      </ListItemButton>
    </List>
  )
}

const stp = s => ({
  language: s.language,
})

export default connect(stp)(NavContact)
