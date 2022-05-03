import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { connect } from "react-redux"
import text from "../dictionary"

const Schedule = ({ language }) => {
  const { morningAfternoon, afternoonEvening } = useStaticQuery(graphql`
    {
      file(sourceInstanceName: { eq: "admin" }, name: { eq: "location" }) {
        childMarkdownRemark {
          frontmatter {
            openingHours {
              afternoonEvening {
                start
                finish
              }
              morningAfternoon {
                start
                finish
              }
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter.openingHours

  const times = `${morningAfternoon.start
    .toString()
    .slice(0, -2)}:${morningAfternoon.start
    .toString()
    .slice(-2)} - ${morningAfternoon.finish
    .toString()
    .slice(0, -2)}:${morningAfternoon.finish.toString().slice(-2)} ${
    text.and[language]
  } ${afternoonEvening.start.toString().slice(0, -2)}:${afternoonEvening.start
    .toString()
    .slice(-2)} - ${afternoonEvening.finish
    .toString()
    .slice(0, -2)}:${afternoonEvening.finish.toString().slice(-2)}`

  return (
    <Box py={1}>
      <Typography variant="h5">{text.openingHours[language]}</Typography>
      <List
        disablePadding
        dense
        sx={{ maxWidth: 400, width: "85%", margin: "auto" }}
      >
        <ListItem>
          <ListItemText
            primary={text.everyDay[language]}
            primaryTypographyProps={{ fontWeight: "bold" }}
            secondary={times}
            secondaryTypographyProps={{
              color: "inherit",
              variant: "caption",
            }}
            sx={{ textAlign: "center" }}
          />
        </ListItem>
      </List>
    </Box>
  )
}

const stp = s => ({
  language: s.language,
})

export default connect(stp)(Schedule)
