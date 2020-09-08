import { get } from '~/utils/vuex-helper'
export default {
  getAds: get('ads'),
  getSelectedAd: get('selectedAd'),
}
