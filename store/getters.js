import { get } from '~/utils/vuex-helper'

export default {
  getLocate: get('locale'),
  //getShowSignUpModal: get('showSignUpModal'),

  strapi(state){
    return state.strapi;
  }
}
