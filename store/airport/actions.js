import mixin from '~/mixins/global-mixin'
import  repos  from '~/utils/repositories'
const filters = mixin.data().strapiFilters;
export default {

    async all({ commit, state, getters ,rootState }){
        var data = await repos.AirportRepository.all();
        if(data && data.data && data.data.length > 0){
            commit('setAirports', data.data);
        }
    },

    async search({ commit, state, getters ,rootState }, payload){
        repos.AirportRepository.buildQuery('name', filters.CONTAINSS, payload)
        var data = await repos.AirportRepository.all();
        if(data && data.data && data.data.length > 0){
            commit('setAirports', data.data);
        }
    },

    async geoSearch({ commit, state, getters ,rootState }, payload){
        var data =  (payload && payload !== undefined && payload.geometry && payload.geometry !== undefined) ?
            await repos.AirportRepository.geoSearch(payload)
            : await repos.AirportRepository.all();
        return (data && data.data && data.data.length > 0) ? data.data : [];
    },

    async find({ commit, state, getters ,rootState }, payload){
        //console.log('FIND', repos.AirportRepository);
        var data = await repos.AirportRepository.get(payload);
        if(data && data.data){
            let airport = data.data.length > 0 ? data.data[0] : data.data;
            commit('setSelectedAirport', airport);
            return airport;
        }
    },


}
