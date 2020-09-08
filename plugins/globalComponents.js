import Vue from 'vue'
import LoadingButton from '~/components/UI/LoadingButton'
import NuxtInput from '~/components/UI/NuxtInput'
import NuxtTextarea from '~/components/UI/NuxtTextarea'
import BadgeIcon from '~/components/UI/BadgeIcon'
import Separator from '~/components/UI/Separator'
import VueAvatar from '~/components/UI/VueAvatar'
import CustomTitle from '~/components/UI/CustomTitle'
import SearchSelect from '~/components/UI/SearchSelect'
import NuxtMultiselect from '~/components/UI/NuxtMultiselect'
import AirportPanel from '~/components/airport/AirportPanel'
import FirstSection from '~/components/header/FirstSection'
import AirportMap from '~/components/map/AirportMap'
import AddressMap from '~/components/map/AddressMap'
import AirportCarousel from '~/components/airport/AirportCarousel'
import AdCarousel from '~/components/ads/AdCarousel'
import AdPanel from '~/components/ads/AdPanel'

Vue.component('loading-button', LoadingButton)
Vue.component('nuxt-input', NuxtInput)
Vue.component('nuxt-textarea', NuxtTextarea)
Vue.component('BadgeIcon', BadgeIcon)
Vue.component('AirportPanel', AirportPanel)
Vue.component('FirstSection', FirstSection)
Vue.component('AirportMap', AirportMap)
Vue.component('AddressMap', AddressMap)
Vue.component('AirportCarousel', AirportCarousel)
Vue.component('AdCarousel', AdCarousel)
Vue.component('Separator', Separator)
Vue.component('VueAvatar', VueAvatar)
Vue.component('SearchSelect', SearchSelect)
Vue.component('CustomTitle', CustomTitle)
Vue.component('AdPanel', AdPanel)
Vue.component('NuxtMultiselect', NuxtMultiselect)