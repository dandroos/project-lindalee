import Provider from "./Provider"
import React from "react"

export const wrapRootElement = ({ element }) => {
  return <Provider>{element}</Provider>
}
