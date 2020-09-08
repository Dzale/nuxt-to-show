import { set, toggle, clear } from '~/utils/vuex-helper'
import Cookies from 'js-cookie'

export default {
/*    setUser(state, user) {
        state.user = user
        Cookies.set('user', user)
    },*/
    setJwt(state, jwt){
        state.jwt = jwt
        if(jwt && jwt !== 'null'){
            Cookies.set('jwt', jwt)
        }else{
            Cookies.remove('jwt');
        }
    },
}
