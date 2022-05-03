import { Box, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { connect } from "react-redux"
import text from "../dictionary"

const Address = ({ language }) => {
  const { title, address } = useStaticQuery(graphql`
    {
      title: site {
        siteMetadata {
          title
        }
      }
      address: file(
        sourceInstanceName: { eq: "admin" }
        name: { eq: "location" }
      ) {
        childMarkdownRemark {
          frontmatter {
            address
          }
        }
      }
    }
  `)

  return (
    <Box py={1}>
      <Typography variant="h4" gutterBottom>
        {title.siteMetadata.title.split(" ")[0]}
        <Box
          component="span"
          sx={{ display: "block", fontSize: "1rem", mt: -0.7 }}
        >
          {title.siteMetadata.title.split(" ").splice(1).join(" ")}
        </Box>
      </Typography>
      {address.childMarkdownRemark.frontmatter.address
        .split(", ")
        .map((i, ind) => (
          <Typography key={ind} display="block">
            {i}
          </Typography>
        ))}
      <Typography display="block">{text.spain[language]}</Typography>
    </Box>
  )
}

const stp = s => ({
  language: s.language,
})

export default connect(stp)(Address)
