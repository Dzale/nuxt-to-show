import mixin from '~/mixins/global-mixin'
import  repos  from '~/utils/repositories'
const filters = mixin.data().strapiFilters;
export default {

    async all({ commit, state, getters ,rootState }){
        var data = await repos.AeroclubRepository.all();
        if(data && data.data && data.data.length > 0){
            commit('setAeroclubs', data.data);
        }
    },

}
