import { get } from '~/utils/vuex-helper'
export default {
  getLocate: get('locale'),
  username(state){
    return state.user ? state.user.username : '';
  },
}
