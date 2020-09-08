import { get } from '~/utils/vuex-helper'
export default {
  getCenter: get('center'),
  getInfoWindow: get('infoWindow'),
  getInfoWindowShow: get('infoWindowShow'),
}
