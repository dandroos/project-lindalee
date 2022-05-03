import * as React from "react"

import Page from "../components/Page"
import { Typography } from "@mui/material"
import { connect } from "react-redux"
import { setLanguage } from "../redux/actions"
import text from "../dictionary"

const NotFoundPage = ({ dispatch, language }) => {
  dispatch(setLanguage("es"))
  return (
    <Page title={text.title404[language]}>
      <Typography>{text.body404[language]}</Typography>
    </Page>
  )
}

const stp = s => ({
  language: s.language,
})

export default connect(stp)(NotFoundPage)
