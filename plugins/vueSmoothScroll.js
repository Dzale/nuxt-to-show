import Vue from 'vue'
import vueSmoothScroll from 'vue2-smooth-scroll'
/*Vue.use(vueSmoothScroll);*/

Vue.use(vueSmoothScroll, {
    duration: 500,
    offset: -143,
    container: '#__nuxt',
    updateHistory: true,
});
