import { login, logout, register, get, post, forgot, reset, } from '~/services/strapi-service'
export default {
    logout({ commit, state, getters ,rootState }){
        //commit('setUser', null);
        commit('user/setMe', null, { root: true });
        logout();
    },
    async login({ dispatch, state, rootState }, payload){
        return dispatch('authenticate', {data: payload, 'action': 'login'});
    },
    async register({ dispatch, state, rootState }, payload){
        return dispatch('authenticate', {data: payload, 'action': 'register'});
    },

    async forgot({ dispatch, state, rootState }, payload){
        return dispatch('authenticate', {data: payload, 'action': 'forgot'});
    },

    async reset({ dispatch, state, rootState }, payload){
        return dispatch('authenticate', {data: payload, 'action': 'reset'});
    },


    async authenticate({ commit, state, rootState }, payload){
        let response = null;
        switch (payload.action) {
            case "login":
                response = await login( payload.data );
                break;
            case "register":
                response = await register( payload.data );
                break;
            case "forgot":
                response = await forgot( payload.data );
                break;
            case "reset":
                response = await reset( payload.data );
                break;
        }
        if(response){
            commit('setShowSignUpModal', false, { root: true });
        }
        return response;
    },

}
