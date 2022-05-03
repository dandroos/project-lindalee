import React from "react"
import Layout from "./src/components/layout"

const wrapWithProvider = ({ props, element }) => {
  return <Layout {...props}>{element}</Layout>
}

export default wrapWithProvider
