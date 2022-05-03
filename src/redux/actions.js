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

export const setSiteReady = payload => ({
  type: SET_SITE_READY,
  payload,
})

export const setToast = payload => ({
  type: SET_TOAST,
  payload,
})

export const setFontsLoaded = payload => ({
  type: SET_FONTS_LOADED,
  payload,
})

export const setIsMobile = payload => ({
  type: SET_IS_MOBILE,
  payload,
})

export const setLanguage = payload => ({
  type: SET_LANGUAGE,
  payload,
})

export const setShowMobileMenu = payload => ({
  type: SET_SHOW_MOBILE_MENU,
  payload,
})

export const setLocationId = payload => ({
  type: SET_LOCATION_ID,
  payload,
})

export const setShowLanguageRedirect = payload => ({
  type: SET_SHOW_LANGUAGE_REDIRECT,
  payload,
})

export const setBookingForm = payload => ({
  type: SET_BOOKING_FORM,
  payload,
})
