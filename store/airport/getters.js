import { get } from '~/utils/vuex-helper'
export default {
  getAirports: get('airport'),
  getSelectedAirport: get('selectedAirport'),
  getSelectedAirportPosition(state){
    return this.getPosition(state.selectedAirport);
  },
  airportSearch(state){
    return keyword => state.airports.filter(airport => airport.airportcode.startsWith(keyword.toUpperCase()))
  },
  premiumAirports(state){
    return state.airports && state.airports.length >0? state.airports.filter(airport => airport.experiencesCount.premium > 0) :[]
  }
}
