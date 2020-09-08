import mixin from '~/mixins/global-mixin'
import  repos  from '~/utils/repositories'
const filters = mixin.data().strapiFilters;
export default {

    async airportReviews({ commit, state, getters ,rootState }, payload){
        repos.ReviewRepository.buildQuery('aerodrome', filters.IN, payload)
        var data = await repos.ReviewRepository.all();
        if(data && data.data){
            commit('setReviews', data.data);
        }
    },

    async store({ commit, state, getters ,rootState }, payload){
        var data = await repos.ReviewRepository.store(payload);
        if(data && data.data){
            commit('pushReview', data.data);
            //return data.data;
        }
    },

    async find({ commit, state, getters ,rootState }, payload){
        return ;
        var data = await repos.ReviewRepository.get(payload);
        if(data && data.data){
            let airport = data.data.length > 0 ? data.data[0] : data.data;
        }
    },


}
