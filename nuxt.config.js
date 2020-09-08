import webpack from 'webpack'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  //process.env.npm_package_name ||
  head: {
    //title:  'FORFLYAWAY : Générateur d’aventures réservé aux pilotes d’aviation légère',
    titleTemplate:  '%s - FORFLYAWAY',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css' }
      /*{ rel: "stylesheet", href:"https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css", integrity:"sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS", crossorigin: "anonymous"},*/
    ],
    script: [
      { type: "text/javascript", src: '/js/jquery.min.js'},
      { type: "text/javascript", src: '/js/plugins.js' },
      { type: "text/javascript", src: '/js/scripts.js' },
      { type: 'text/javascript', src: 'https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js', 'data-cfasync':'false' },
      { type: 'text/javascript', src: '/js/cookieconsent.js', body: true }

    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    //'~/assets/css/bootstrap.min.css',
    //'~/vueperslides/dist/vueperslides.css',
    /*{ src: '~/assets/css/bootstrap.min.css', lang: 'css' },*/
    { src: 'vue-multiselect/dist/vue-multiselect.min.css', lang: 'css' },
    { src: 'vue-slider-component/theme/default.css', lang: 'css' },
    { src: 'vue-wysiwyg/dist/vueWysiwyg.css', lang: 'css' },
    '~/assets/css/reset.css',
    '~/assets/css/plugins.css',
    '~/assets/css/style.css',
    '~/assets/css/color.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~/plugins/analytics.js", ssr: false },
    '~/plugins/i18n.js',
    '~/plugins/globalComponents.js',
    '~/plugins/globalMixin.js',
    '~/plugins/repos.js',
    '~/plugins/axios.js',
    { src: "~/plugins/datepicker", ssr: false },//in use
    { src: "~/plugins/multiselect", ssr: false },//in use
/*    { src: "~/plugins/resize", ssr: false },*/
/*    { src: "~/plugins/vueSmoothScroll", ssr: false },//in use*/
/*    { src: "~/plugins/vueper", ssr: false },*/
    { src: "~/plugins/vueCarousel", ssr: false },//in use
    { src: "~/plugins/slider", ssr: false },//in use
    { src: "~/plugins/googleMaps", ssr: true },//in use
    { src: '~/plugins/localStorage.js', ssr: false },//in use
    { src: '~/plugins/toggle.js', ssr: false },//in use
    { src: '~/plugins/starRating.js', ssr: false },//in use
    { src: '~/plugins/wysiwyg.js', ssr: false },//in use
    { src: '~/plugins/multipleImageUpload.js', ssr: false },//in use
    { src: '~/plugins/checkView.js', ssr: false },//in use
    { src: '~/plugins/vueObserveVisibility.js', ssr: false },//in use
  ],

  router: {
    middleware: ['i18n', 'burger', 'resetLoaders'],
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/sentry',
    '@nuxtjs/axios',
    'nuxt-izitoast',
    'nuxt-seo',
    ['nuxt-validate', {
      lang: 'fr',
    }]
  ],
  sentry: {
    dsn: 'https://13d07682c7434eda80bf39c26ab75a40@sentry.io/1774455',
    config: {}, // Additional config
  },
  seo: {
    // Module options
    /*name: 'FORFLYAWAY',
    title: 'Générateur d’aventures réservé aux pilotes d’aviation légère',
    templateTitle: '%name% : %title%',
    description: 'Notre plateforme met en relation les pilotes d’aviation légère européens voyageant par les airs dans le cadre de leurs loisirs avec les professionnels du Tourisme situés près des aérodromes du Territoire.'*/
  },
  /*
  **Nuxt.js izitoast configuration
 */
  izitoast: {
    position: 'topRight',
    transitionIn: 'bounceInLeft',
    transitionOut: 'fadeOutRight',
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    },
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    transpile: [/^vue2-google-maps($|\/)/],
  },
  env: {
    //BASE INFO
    APP_NAME: 'Forflyaway',
    LANG: 'fr',

    //API'S INFO
    //apiUrl: process.env.API_URL || 'http://localhost:1337',
    publicUrl: process.env.PUBLIC_URL || 'https://forflyaway.com',
    apiUrl: process.env.API_URL || 'https://api.forflyaway.com',
    weatherApiUrl: 'https://api.darksky.net/forecast/' + process.env.WEATHER_API_KEY + '/',
    darkSky: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + process.env.WEATHER_API_KEY + '/',

    //API KEYS
    GOOGLE_MAP_API_KEY: 'AIzaSyCDPqDywtXKNEHz16GVNbJBAuTj7zf0ROc',
    WEATHER_API_KEY: '2ed8144738966b4582286a4b0abbeb0b',

    //REQUEST TYPES
    _POST: 'POST',
    _GET: 'GET',
    _PUT: 'PUT',
    _DELETE: 'DELETE',
  }
}
