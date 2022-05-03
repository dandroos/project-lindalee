import { Email, Phone, Whatsapp } from "mdi-material-ui"
import {
  Fab,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import ReactCountryFlag from "react-country-flag"
import { connect } from "react-redux"
import text from "../dictionary"

const SpeedContact = ({ language }) => {
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
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Menu
        MenuListProps={{ dense: true, disablePadding: true }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ zIndex: 5001 }}
      >
        <MenuItem
          divider
          component="a"
          href={`tel:34${phoneNumber_en}`}
          target="_blank"
        >
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2">
                {text.phoneUs[language]}
                <ReactCountryFlag
                  countryCode="gb"
                  svg
                  style={{ marginLeft: 10 }}
                />
              </Typography>
            }
            secondary={
              <Typography variant="caption">
                +34{" "}
                {`${phoneNumber_en.substr(0, 3)} ${phoneNumber_en.substr(
                  3,
                  3
                )} ${phoneNumber_en.substr(6, 3)}`}
              </Typography>
            }
          />
        </MenuItem>
        <MenuItem
          divider
          component="a"
          href={`tel:34${phoneNumber_es}`}
          target="_blank"
        >
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2">
                {text.phoneUs[language]}
                <ReactCountryFlag
                  countryCode="es"
                  svg
                  style={{ marginLeft: 10 }}
                />
                <ReactCountryFlag
                  countryCode="gb"
                  svg
                  style={{ marginLeft: 10 }}
                />
              </Typography>
            }
            secondary={
              <Typography variant="caption">
                +34{" "}
                {`${phoneNumber_es.substr(0, 3)} ${phoneNumber_es.substr(
                  3,
                  3
                )} ${phoneNumber_es.substr(6, 3)}`}
              </Typography>
            }
          />
        </MenuItem>
        <MenuItem
          divider
          component="a"
          href={`https://wa.me/34${phoneNumber_es}`}
          target="_blank"
        >
          <ListItemIcon>
            <Whatsapp />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<Typography variant="body2">WhatsApp</Typography>}
            secondary={
              <Typography variant="caption">
                +34{" "}
                {`${phoneNumber_es.substr(0, 3)} ${phoneNumber_es.substr(
                  3,
                  3
                )} ${phoneNumber_es.substr(6, 3)}`}
              </Typography>
            }
          />
        </MenuItem>
        <MenuItem component="a" href={`mailto:${emailAddress}`} target="_blank">
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2">{text.emailUs[language]}</Typography>
            }
            secondary={
              <Typography variant="caption">{emailAddress}</Typography>
            }
          />
        </MenuItem>
      </Menu>
      <Fab
        color="secondary"
        sx={{ position: "fixed", bottom: 15, right: 15, zIndex: 5000 }}
        size="medium"
        onClick={e => setAnchorEl(e.target)}
      >
        <Phone />
      </Fab>
    </>
  )
}

const stp = s => ({
  language: s.language,
})

export default connect(stp)(SpeedContact)
