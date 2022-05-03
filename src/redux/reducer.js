import {
  SET_BOOKING_FORM,
  SET_FONTS_LOADED,
  SET_IS_MOBILE,
  SET_LANGUAGE,
  SET_LOCATION_ID,
  SET_SHOW_LANGUAGE_REDIRECT,
  SET_SHOW_MOBILE_MENU,
  SET_SITE_READY,
  SET_TOAST,
} from "./types"

const initialState = {
  siteReady: false,
  fontsLoaded: false,
  isMobile: null,
  language: null,
  showMobileMenu: false,
  locationId: null,
  showLanguageRedirect: {
    open: false,
  },
  bookingForm: false,
  toast: {
    open: false,
    msg: "",
    severity: "success",
  },
  drawerWidth: 260, //doesn't change
}

export const reducer = (state = initialState, { type, payload }) => {
  const newState = Object.assign({}, state)
  console.log(type, payload)
  switch (type) {
    case SET_SITE_READY:
      newState.siteReady = payload
      break
    case SET_FONTS_LOADED:
      newState.fontsLoaded = payload
      break
    case SET_IS_MOBILE:
      newState.isMobile = payload
      break
    case SET_LANGUAGE:
      newState.language = payload
      break
    case SET_SHOW_MOBILE_MENU:
      newState.showMobileMenu = payload
      break
    case SET_LOCATION_ID:
      newState.locationId = payload
      break
    case SET_SHOW_LANGUAGE_REDIRECT:
      newState.showLanguageRedirect = payload
      break
    case SET_BOOKING_FORM:
      newState.bookingForm = payload
      break
    case SET_TOAST:
      newState.toast = payload
      break
    default:
      break
  }

  return newState
}
