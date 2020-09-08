import mixin from '~/mixins/global-mixin'
import {post} from '~/services/strapi-service'
import  repos  from '~/utils/repositories'
const filters = mixin.data().strapiFilters;
export default {

    async all({ commit, state, getters ,rootState }){
        var data = await repos.UserRepository.all();
        if(data){
            commit('setUsers', data.data);
        }
    },
    async find({ commit, state, getters ,rootState }, payload){
        var data = await repos.UserRepository.get(payload);
        if(data){
            if(payload === 'me'){
                commit('setMe', data.data);
            }else{
                commit('setSelectedUser', data.data);
            }
            return data.data;
        }else{
            return null;
        }
    },

    async update({ commit, state, getters ,rootState }, payload){
        var data = await repos.UserRepository.update(payload._id, payload);
        if(data){
            commit('setMe', data.data);
        }
    },

    async uploadAvatar({ commit, state, getters ,rootState }, payload){
        let uploadData = {
            files:      payload.files,
            refId:      payload._id,
            ref:        "user",
            source:     "users-permissions",
            field:      "avatar"
        };
        var data = await repos.UserRepository.uploadAvatar(uploadData);
        if(data){
            commit('setAvatar', data[0]);
        }
    },


    async toggleAirport({ commit, state, getters ,rootState }, payload){
        let favorite = payload.path === mixin.data().userAirport.FAVORITE;
        var data = favorite ? await repos.UserRepository.toggleFavoriteAirport(payload._id, payload.action) : await repos.UserRepository.toggleWishlistAirport(payload._id, payload.action);
        if(data && data.data){
            commit('setMe', data.data);
        }
    },

    async reviews({ commit, state, getters ,rootState }, payload){
        payload && payload._id ? repos.ReviewRepository.buildQuery('author', filters.EQUAL,  payload._id) : null;
        repos.ReviewRepository.buildQuery('_limit', filters.EQUAL, 2)
        repos.ReviewRepository.buildQuery('_sort', filters.EQUAL, "createdAt:DESC")
        var data = await repos.ReviewRepository.all();
        if(data){
            return data.data;
        }else{
            return null;
        }
    },

    async contactUs({ commit, state, getters ,rootState }, payload){
        let data = await repos.UserRepository.contactUs(payload)
    },

}