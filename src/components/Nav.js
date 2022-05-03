import React from "react"
import { connect } from "react-redux"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"

const Nav = ({ isMobile }) => {
  return isMobile ? <MobileNav /> : <DesktopNav />
}

const stp = s => ({
  isMobile: s.isMobile,
})

export default connect(stp)(Nav)
