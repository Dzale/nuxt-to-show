import { set, toggle, clear } from '~/utils/vuex-helper'
import Cookies from "js-cookie";
import cookieparser from "cookieparser";

export default {
  setMe(state, user) {
    state.me = user;
    //Cookies.set('user', user)
  },
  setSelectedUser: set('selectedUser'),
  setUsers: set('users'),
  setAvatar(state, avatar){
    state.me.avatar = avatar;
  },
}

