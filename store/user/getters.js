import { get } from '~/utils/vuex-helper'

export default {
  username(state){
    return state.me ? (state.me.firstname ? state.me.firstname : state.me.username) : '';
  },
}
