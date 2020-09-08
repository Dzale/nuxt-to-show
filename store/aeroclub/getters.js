import { get } from '~/utils/vuex-helper'
export default {
  getAeroclubs: get('aeroclub'),
  getSelectedAirport: get('selectedAeroclub')
}
