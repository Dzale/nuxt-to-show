import { set, toggle, clear } from '~/utils/vuex-helper'

export default {
    setCenter: set('center'),
    setZoom: set('zoom'),
    setInfoWindow: set('infoWindow'),
    setInfoWindowShow: set('infoWindowShow'),
    toggleInfoWindowShow: toggle('infoWindowShow'),
}
