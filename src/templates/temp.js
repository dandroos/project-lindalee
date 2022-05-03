import React, { useEffect } from "react"
import { connect } from "react-redux"
import Page from "../components/Page"
import { setLanguage, setLocationId } from "../redux/actions"

const Temp = ({ dispatch, pageContext }) => {
  console.log(pageContext)
  useEffect(() => {
    console.log(pageContext.language)
    dispatch(setLocationId(pageContext.locationId))
    dispatch(setLanguage(pageContext.language))
    //eslint-disable-next-line
  }, [])
  return <Page title={pageContext.title}>{pageContext.title}</Page>
}

export default connect()(Temp)
