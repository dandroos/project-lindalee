import React from "react"
import { Drawer } from "@mui/material"
import NavMenu from "./NavMenu"
import { connect } from "react-redux"

const DesktopNav = ({ drawerWidth }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        elevation: 10,
        sx: { borderRight: "none", width: drawerWidth },
      }}
    >
      <NavMenu />
    </Drawer>
  )
}

const stp = s => ({
  drawerWidth: s.drawerWidth,
})

export default connect(stp)(DesktopNav)
