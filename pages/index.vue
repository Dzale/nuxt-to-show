<template>

  <div>
    <section class="section-header">
      <div class="row bg-image" style="margin-top: 56%">
        <video width=100%  preload="auto" autoplay loop muted="muted" volume="0">
          <source src="/videos/splash.mp4" type="video/mp4">
        </video>
      </div>
      <div class="bg-text">
        <div class="container">
          <div class="intro-item fl-wrap">
            <p class="overtitle">{{$t('index.overtitle')}}</p>
            <h2>{{$t('index.title')}}</h2>
          </div>
          <div class="error-wrap">
            <div class="clearfix"></div>
            <div class="main-search-input-wrap">
              <div class="form">
                <GeoSearchInput/>
                <button class="search-submit primary-red" id="submit_btn"  @click="goToSearchAirports">{{$t('index.search')}} </button>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Separator title="index.separator.title11"  title1="index.separator.title12" subtitle="index.separator.subtitle1"></Separator>
    <section id="sec2">
        <div class="row">
          <div class="col-lg-12">
            <Gallery/>
          </div>
  <!--        <div class="col-lg-12">
            <a href="javascript:{}" class="btn primary-red">{{$t('index.gallery.btn_see_all_destination')}}</a>
          </div>-->
        </div>
    </section>

    <Separator title="index.separator.title2"  subtitle="index.separator.subtitle2"/>
    <no-ssr>
      <section id="sec3" v-if="premiumAirports && premiumAirports.length>0">
        <div class="row">
          <div class="sp50">
            <AirportCarousel v-if="premiumAirports && premiumAirports.length>0" :items="premiumAirports"/>
          </div>
        </div>
      </section>
    </no-ssr>

    <section id="sec4">
      <div class="row hidden">
        <div class="sp50">
          <SponsorsGallery/>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
  import Gallery from '~/components/gallery/home/locations/List'
  import SponsorsGallery from '~/components/gallery/home/sponsors/List'
  import GeoSearchInput from '~/components/UI/GeoSearchInput'
  export default {
    components:{
      Gallery,
      SponsorsGallery,
      GeoSearchInput
    },
    head() {
      return {
        title: this.$t('meta.home.title'),
        meta: [
          { 
              hid: 'description',
              name: 'description',
              content: this.$t('meta.home.desc')
          },
          {
              hid: 'og:title',
              property: 'og:title',
              content: this.$t('meta.home.title')
          },
          {
              hid: 'og:description',
              property: 'og:description',
              content: this.$t('meta.home.desc')
          },
          {
              hid: 'og:image',
              property: 'og:image',
              content: 'https://forflyaway.com/images/all/ffa-homepage.png'
          },
          {
              hid: 'twitter:card',
              name: 'twitter:card',
              content: 'summary'
          },
          {
              hid: 'twitter:title',
              name: 'twitter:title',
              content: this.$t('meta.home.title')
          },
          {
              hid: 'twitter:description',
              name: 'twitter:description',
              content: this.$t('meta.home.desc')
          },
          {
              hid: 'twitter:image',
              name: 'twitter:image',
              content: 'https://forflyaway.com/images/all/ffa-homepage.png'
          }
        ]
      }
    },
  data(){
    return {

    }
  },
  async created(){

  },
  async mounted(){
      this.$nextTick(async () => {
        await this.all();
        fadeOutLoader();
      })
  },
  computed:{
    ...mapGetters({
        premiumAirports: 'airport/premiumAirports'
    }),
    ...mapState({
      'airports'      : state => state.airport.airports,
      'burger'        : state => state.burger,
    }),
    ...mapGetters([]),
  },
  methods: {
    ...mapActions({
      me:'auth/me',
      all: 'airport/all',
    }),
    ...mapMutations({

    }),
    goToSearchAirports(){
      this.$router.push({name: 'aerodromes'});
    },

  }
}
</script>
<style scoped>

  .overtitle {
    color: white;
    font-size: 15px;
    letter-spacing: 2px;
  }
  .sp50{
    padding: 0px 50px;
  }
  .btn{
    padding: 13px 32px;
    position: relative;
    top: 20px;
    border-radius: 30px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 11px;
  }
  #sec2, #sec3, #sec4 {
    padding: 0px 0px 40px 0px;
  }
  .bg-image {
    /* Full height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  /* Position text in the middle of the page/image */
  .bg-text {
    background-color: transparent; /* Fallback color */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 80%;
    padding: 20px;
    text-align: center;
    margin-top: 40px;
  }
  #submit_btn{
    font-size: 12px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  /* Tweaking the border radius (client request) */
  .error-wrap .form {
    border-radius: 10px;
    /*box-shadow: 0px 0px 0px 10px rgba(255,255,255,0.2);*/
  }
  @media only screen and  (max-width: 594px) {
    #submit_btn{
      border-top-right-radius: 5px !important;
      border-bottom-right-radius: 5px !important;
    }
    .section-header{
      padding-bottom: 20px
    }
  }


</style>

