import { set, toggle, clear } from '~/utils/vuex-helper'

export default {
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  //toggleShowSignUpModal   : toggle('showSignUpModal'),
  setBurger               : set('burger'),
  setShowSignUpModal      : set('showSignUpModal'),
  setLoginLoading         : set('loginLoading'),
  setRegisterLoading      : set('registerLoading'),
  setFetchLoading         : set('fetchLoading'),
  setCreateLoading        : set('createLoading'),
  setUpdateLoading        : set('updateLoading'),
  setUploadLoading        : set('uploadLoading'),
  setDeleteLoading        : set('deleteLoading'),
  setForgotLoading        : set('forgotLoading'),
  setResetLoading         : set('resetLoading'),
  setRepos                : set('repos'),
}
