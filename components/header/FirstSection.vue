<template>
    <div>
        <section class="scroll-con-sec hero-section" data-scrollax-parent="true" id="sec1" :class="{'mt80' : search}" >
            <div class="bg" :data-bg="img" :style="'background-image:url(' + img +');'" data-scrollax="properties: { translateY: '200px' }"></div>
            <div class="overlay"></div>
            <div v-if="bubble" class="bubble-bg"></div>
            <div class="hero-section-wrap fl-wrap">
                <div class="container" v-if="search">
                    <div v-if="!errorPage" class="intro-item fl-wrap">
                        <h2>{{$t('index.title')}}</h2>
                    </div>
                    <div class="error-wrap">
                        <h2 v-if="errorPage">404</h2>
                        <p v-if="errorPage">We're sorry, but the Page you were looking for, couldn't be found.</p>
                        <div class="clearfix"></div>
                        <div class="main-search-input-wrap">
                            <div class="form">
                                <GeoSearchInput/>
                                <button class="search-submit primary-red" id="submit_btn"  @click="goToSearchAirports">{{$t('index.search')}}</button>
                            </div>
                            <div class="clearfix"></div>
                            <p v-if="errorPage">Or</p>
                            <a v-if="errorPage" href="/" class="btn  big-btn  color-bg flat-btn">Back to Home Page<i class="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
    import GeoSearchInput from '~/components/UI/GeoSearchInput'
    export default {
        name: "FirstSection",
        components:{
            GeoSearchInput
        },
        props:{
            img:{
                type: String,
                required: true,
            },
            search:{
                type: Boolean,
                required: false,
            },
            bubble:{
                type: Boolean,
                required: false,
            },
            errorPage:{
                type: Boolean,
                required: false,
            },
        },
        data(){
            return{
                airportList:[],
            }
        },
        mounted(){

        },
        computed:{
            ...mapGetters({

            }),
            ...mapState({

            }),

        },
        methods: {
            ...mapActions({
                searchAirports  : 'airport/search',
            }),
            goToSearchAirports(){
                this.$router.push({name: 'aerodromes'})
            },
        },

    }
</script>

<style scoped>

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
    }


</style>