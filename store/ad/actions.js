import mixin from '~/mixins/global-mixin'
import  repos  from '~/utils/repositories'
import Form from "../../services/Form";
const filters = mixin.data().strapiFilters;
const adType = mixin.data().adType;
const adsPhotoType = mixin.data().adsPhotoType;
export default {

    async all({ commit, state, getters ,rootState }){
        var data = await repos.AdRepository.all();
        if(data && data.data && data.data.length > 0){
            commit('setAds', data.data);
        }
    },

    async airportAds({ commit, state, getters ,rootState }, payload){
        repos.AdRepository.clearQuery();
        repos.AdRepository.buildQuery('aerodromes', filters.IN, payload.airport)
        //payload.premium !== undefined ? repos.AdRepository.buildQuery('premium', '', payload.premium) : ''
        payload.type !== '' && payload.type !== undefined ? repos.AdRepository.buildQuery('type', '', payload.type): '';
        var data = await repos.AdRepository.all();
        if(data && data.data){
            //commit('setAds', data.data);
            return Array.isArray(data.data) ? ( data.data.length > 0 ? data.data : []) : data.data;
        }
    },

    async count({ commit, state, getters ,rootState }){
        var data = {};
        var result = {};
        data = await repos.AdRepository.count(adType.HOTELS);
        if(data && data.data){
            result.hotels = data.data;
        }
        data = await repos.AdRepository.count(adType.RESTAURANTS);
        if(data && data.data){
            result.restaurants = data.data;
        }
        data = await repos.AdRepository.count(adType.TRANSPORTS);
        if(data && data.data){
            result.transports = data.data;
        }
        data = await repos.AdRepository.count(adType.ATTRACTIONS);
        if(data && data.data){
            result.attractions = data.data;
        }
        return result;
    },

    async find({ commit, state, getters ,rootState }, payload){
        var data = await repos.AdRepository.get(payload);
        //console.log('Find Action', data.data);
        if(data && data.data){
            let ad = Array.isArray(data.data) ? ( data.data.length > 0 ? data.data[0] : null) : data.data;
            //commit('setSelectedAd', ad);
            return ad;
        }
    },

    async create({ commit, state, getters ,rootState }, payload){
        let uploadData = {
            data: JSON.stringify(payload.data),
            "files[cover]":payload.files.cover,
            "files[cover][ref]":"experience",
            "files[cover][field]":adsPhotoType.COVER,
            "files[photos]":payload.files.photos,
            "files[photos][ref]":"experience",
            "files[photos][field]":adsPhotoType.PHOTOS,

        };
        var data = await repos.AdRepository.store(Form.prepare(uploadData));
        if(data && data.data){
            let ad = data.data.length > 0 ? data.data[0] : data.data;
            //commit('setSelectedAd', ad);
            return ad;
        }
    },


}
