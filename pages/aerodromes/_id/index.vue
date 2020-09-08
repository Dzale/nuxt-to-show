<template>
    <div>
        <section class="parallax-section single-par list-single-section" data-scrollax-parent="true" style="margin-top: 80px;" id="sec11" >
            <div class="bg par-elem" :style="'background-image:url(' + previewImage + ');'"  data-scrollax="properties: { translateY: '30%' }"></div>
            <div class="overlay"></div>
            <div class="bubble-bg"></div>
            <div class="list-single-header absolute-header fl-wrap">
                <div class="container">
                    <div class="list-single-header-item">
                        <h2 v-if="localAirport">
                            {{localAirport.name}}
                            <div class="oaci">
                                {{$t('pages.airport.code')}} : <span class="oaci-code"> {{localAirport.airportcode}} </span>
                            </div>
                        </h2>
                    </div>
                </div>
            </div>
            <div style="height: 100%; position: absolute; top: -80px;" v-observe-visibility="changeSticky"></div>
        </section>
        <no-ssr>
            <div class="clone" v-if="sticky"></div>
            <div class="visible-lg scroll-nav-wrapper fl-wrap" :class="{'sticky-info': sticky}">
                <div class="container">
                    <nav class="scroll-nav scroll-init">
                        <ul>
                            <li v-for="(item, index) in computedSections">
                                <a      class="airportNav"
                                        :class="{'act-scrlink': index ==0}"
                                        :href="item.id"
                                        :id="item.scroll">
                                    {{$t(item.name)}}
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <a v-if="me && localAirport" href="javascript:{}" @click="prepareToggleAirport(userAirport.WISHLIST)" :class="{'save-btn' : true, 'red' : belongsToWishlist}">  <i class="fa fa-bookmark"  :class="{'gray' : !belongsToWishlist}"></i>{{$t('pages.airport.navigation.item6')}} </a>
                    <a v-if="me && localAirport" href="javascript:{}" @click="prepareToggleAirport(userAirport.FAVORITE)" :class="{'save-btn' : true, 'red' : belongsToFavoritelist}"><i class="fa fa-heart" :class="{'gray' : !belongsToFavoritelist}"></i>{{$t('pages.airport.navigation.item7')}} </a>
                </div>
            </div>

        </no-ssr>

        <section class="gray-bg text-color" id="sec1" v-if="localAirport">
            <div class="container">
                <div class="row hidden-lg favorite-buttons">
                    <div class="col-xs-6">
                        <a v-if="me && localAirport" href="javascript:{}" @click="prepareToggleAirport(userAirport.WISHLIST)" class="listadder" :class="{'save-btn' : true, 'red' : belongsToWishlist}">  <i class="fa fa-bookmark"  :class="{'gray' : !belongsToWishlist}"></i>{{$t('pages.airport.navigation.item6')}} </a>
                    </div>
                    <div class="col-xs-6">
                        <a v-if="me && localAirport" href="javascript:{}" @click="prepareToggleAirport(userAirport.FAVORITE)" class="listadder" :class="{'save-btn' : true, 'red' : belongsToFavoritelist}"><i class="fa fa-heart" :class="{'gray' : !belongsToFavoritelist}"></i>{{$t('pages.airport.navigation.item7')}} </a>
                    </div>
                </div>

                <!-- MOBILE ONLY AIRPORT PAGE -->
                <div class="row visible-xs">

                    <!--ABOUT & EQUIPMENTS-->
                    <div class="list-single-main-item fl-wrap">
                        <div class="row" id="eq-mobile">
                            <div class="col-lg-12">
                                <Equipments :airport="localAirport" />
                            </div>
                        </div>
                    </div>
                    <!--INFORMATIONS-->
                    <div class="row" >
                        <div class="col-lg-12">
                            <Informations :airport="localAirport" id="info-mobile"/>
                        </div>
                    </div>

                    <!--SERVICES-->
                    <div class="row" >
                        <div class="col-lg-12">
                            <Services id="services-mobile" :airport="localAirport" :ads="ads" :premiumAds="premiumAds" :showPremiumAds="showPremiumAds" @changed="searchAds"/>
                        </div>
                    </div>

                    <!-- MAP & CONTACT -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="fl-wrap">
                                <!--MAP-->
                                <Map :airport="localAirport"/>
                                <!--AEROCLUBS-->
                                <Aeroclubs :airport="localAirport"/>
                                <!--WEATHER-->
                                <div class="box-widget-item fl-wrap">
                                    <div class="box-widget-item-header">
                                        <h3>{{$t('pages.airport.weather')}}: </h3>
                                    </div>
                                    <div class="box-widget">
                                        <Weather v-if="localAirport" :item="localAirport"/>
                                    </div>
                                </div>
                                <!--LINKS-->
                                <Links :airport="localAirport"></Links>
                            </div>
                        </div>
                    </div>
                    <!--REVIEWS-->
                    <div class="row" >
                        <div class="col-lg-12 " id="reviews-mobile">
                            <Reviews v-if="reviews && reviews.length>0" :items="reviews" :report=" me ? true : false"/>
                            <CreateReview v-if="me" :airport="localAirport" :user="me" name="mobile"/>
                        </div>
                    </div>
                </div>

                <!-- INFORMATION SECTION NOT SHOWING ON MOBILE-->
                <div class="row hidden-xs">
                    <div class="col-md-8">
                        <!--ABOUT & EQUIPMENTS-->
                        <div class="list-single-main-item fl-wrap">
                            <div class="row" id="eq">
                                <div class="col-lg-12">
                                    <Equipments :airport="localAirport" />
                                </div>
                            </div>
                        </div>
                        <!--INFORMATIONS-->
                        <div class="row" >
                            <div class="col-lg-12">
                                <Informations :airport="localAirport" id="info"/>
                            </div>
                        </div>

                        <!--SERVICES-->
                        <div class="row" >
                            <div class="col-lg-12">
                                <Services id="services" :airport="localAirport" :ads="ads" :premiumAds="premiumAds" :showPremiumAds="showPremiumAds" @changed="searchAds"/>
                            </div>
                        </div>
                        <!--REVIEWS-->
                        <div class="row" >
                            <div class="col-lg-12" id="reviews">
                                <Reviews v-if="reviews && reviews.length>0" :items="reviews" :loggedIn=" me ? true : false"/>
                                <CreateReview v-if="me" :airport="localAirport" :user="me" name="desktop"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="fl-wrap">
                            <!--MAP-->
                            <Map :airport="localAirport"/>
                            <!--AEROCLUBS-->
                            <Aeroclubs :airport="localAirport"/>
                            <!--WEATHER-->
                            <div class="box-widget-item-header">
                                <h3>{{$t('pages.airport.weather')}}: </h3>
                            </div>
                            <Weather v-if="localAirport" :item="localAirport"/>
                            <!--LINKS-->
                            <Links :airport="localAirport"></Links>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="limit-box fl-wrap"></div>

    </div>

</template>

<script>
    import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
    import Weather from '~/components/weather/Item'
    import Equipments from '~/components/airport/Equipments'
    import Informations from '~/components/airport/Informations'
    import Links from '~/components/airport/Links'
    import Services from '~/components/airport/Services'
    import Map from '~/components/airport/Map'
    import Aeroclubs from '~/components/airport/Aeroclubs'
    import Reviews from '~/components/airport/Reviews'
    import CreateReview from '~/components/airport/CreateReview'

    export default {
        name: "airport",
        components:{
            Weather,
            Equipments,
            Informations,
            Links,
            Services,
            Map,
            Aeroclubs,
            Reviews,
            CreateReview
        },

        data(){
            return {
                initialLoad: true,
                activeTab:0,
                sticky:false,
                activeTabs:[0],
                ads:[],
                premiumAds:[],
                localAirport: null,
                serverLocalAirport: null,
                lastSearch: null
            }
        },
        head () {
            return this.airport ? {
                title: this.airport.name,
                meta: [
                    {
                        hid: 'og:title',
                        property: 'og:title',
                        content: this.airport.name + ' - FORFLYAWAY'
                    },
                    {
                        hid: 'og:description',
                        property: 'og:description',
                        content: this.description
                    },
                    {
                        hid: 'og:image',
                        property: 'og:image',
                        content: this.airport.image ? this.airport.image.url : 'https://forflyaway.com/images/bg/default.png'
                    },
                    {
                        hid: 'twitter:card',
                        name: 'twitter:card',
                        content: 'summary'
                    },
                    {
                        hid: 'twitter:title',
                        name: 'twitter:title',
                        content: this.airport.name + ' - FORFLYAWAY'
                    },
                    {
                        hid: 'twitter:description',
                        name: 'twitter:description',
                        content:  this.description
                    },
                    {
                        hid: 'twitter:image',
                        name: 'twitter:image',
                        content: this.airport.image ? this.airport.image.url : 'https://forflyaway.com/images/bg/default.png'
                    }
                ],
            } : {};
        },
        async asyncData({ app, params, store, seo }){
            let airport = await store.dispatch('airport/find', params.id);
            let description = "";
            if(airport){
                description = app.i18n.t('pages.airport.about-text', {
                    name: airport.name,
                    code: airport.airportcode,
                    distance: airport.closestlocation.distance.toFixed(),
                    city: airport.closestlocation.city,
                    postcode: airport.closestlocation.postcode,
                    classification: airport.classification == 'Usage restreint' ? 'à usage restreint' : airport.classification == 'Ouvert à la CAP' ? 'ouvert à la circulation aérienne publique' : 'un terrain privé'
                });
            }
            return {
                airport,
                description,
            }
        },
        async mounted(){
            await this.init(this.$route.params.id, false);
        },
        computed:{
            ...mapState({
                'reviews'           : state => state.review.reviews,
                'me'                : state => state.user.me,
            }),
            ...mapGetters({
                'overallRating': "review/overallRating",
            }),
            belongsToWishlist(){
                return this.belongsToList(this.me.wishList, this.localAirport._id)
            },
            belongsToFavoritelist(){
                return this.belongsToList(this.me.favoriteList, this.localAirport._id)
            },
            previewImage(){
                return this.localAirport && this.localAirport.image ? this.imgPath(this.localAirport.image.url) : '/images/bg/default.png';
            },
            showPremiumAds(){
                return (this.localAirport && this.localAirport.experiencesCount && this.localAirport.experiencesCount.premium && this.me) ? true : false;
            },
            computedSections(){
                let sections = [
                    {
                        "name":'pages.airport.navigation.item1',
                        "id":"#eq",
                        "scroll":"eq-scroll",
                        "active": true,
                    },
                    {
                        "name":'pages.airport.navigation.item3',
                        "id":"#info",
                        "scroll":"info-scroll",
                        "active": false,
                    },
                    {
                        "name":'pages.airport.navigation.item4',
                        "id":"#services",
                        "scroll":"services-scroll",
                        "active": false,
                    },
                    {
                        "name":'pages.airport.navigation.item5',
                        "id":"#reviews",
                        "scroll":"reviews-scroll",
                        "active": false,
                    },
                ];
                return sections;

            },
/*            activeTab(){
                return Math.min(this.activeTabs);
            }*/
        },
        methods: {
            changeSticky(isVisible, entry){
                this.sticky = !isVisible;
            },
            ...mapActions({
                find: 'airport/find',
                fetchAds: 'ad/airportAds',
                fetchReviews: 'review/airportReviews',
                toggleAirport: 'user/toggleAirport',
            }),
            ...mapMutations([]),
            async init(id, loaded = false){
                this.localAirport = this.airport ?  { ...this.airport } : await this.find(id);
                if(this.localAirport){
                    await this.searchAds(null);
                    await this.fetchReviews(this.localAirport._id);
                }
                //this.fadeOutLoader();
                this.initialLoad = false;
                fadeOutLoader();
            },
            async searchAds(search){
                let data = search ? search : {};
                this.lastSearch = search ? search : this.lastSearch;

                if(this.localAirport){
                    let result = await this.fetchAds({...data,  airport: this.localAirport._id});
                    this.ads = result && result !== undefined ? result.filter(item => !item.premium) : [];
                    this.premiumAds = result && result !== undefined ? result.filter(item => item.premium) : [];
                }
            },
            async prepareToggleAirport(path){
                let data = {
                    _id     : this.localAirport._id,
                    path    : path,
                    action  : path === this.userAirport.FAVORITE ? (this.belongsToFavoritelist ? this.arrayAction.REMOVE : this.arrayAction.ADD) : (this.belongsToWishlist ? this.arrayAction.REMOVE : this.arrayAction.ADD)
                };
                await this.toggleAirport(data);
            }
        },
        watch:{
            'me': {
                handler:async function (newValue, oldVal){
                    if(!this.initialLoad && oldVal !== newValue){
                        await this.searchAds();
                    }
                },
                immediate: false
            }
        }
    }
</script>

<style scoped>

    .listadder { font-size: 0.6em; }    
    #element {
        margin-top: 1000px;
    }
    .gray{
        color: #ededed !important;
    }

    .red {
        color: #ec616e !important;
    }

    .download{
        border: none;
        border-radius: 35px;
        height: 60px;
        padding: 20px;
        color: white;
        font-weight: 600;
        background: #ec616e;
    }
    .download:hover{
        background: #b92e3b;
    }
    .airport-name{
        font-size: 30px;
        font-weight: 900;
        margin-bottom: 10px;
    }
    .oaci{
        font-size: 20px;
        font-weight: 200;
    }
    .oaci-code {
        font-size: 20px;
        font-weight: 500;
    }
    .mt5{
        margin-top: 5px;
    }
    .sticky-info{
        top: 80px;
        height: 63px;
        position: fixed;
        z-index: 100;
    }
    .clone{
        height: 62px;
        background-color: transparent;
        width: 100%;
        float: left;
    }
    .observe-visibility-sm-item{
        height: 10%;
        position: absolute;
/*        background-color: yellow;*/
        width: 100%;
    }

    .observe-visibility-lg-item{
        height: 40%;
        position: absolute;
        top: 30%;
    }
    .top20{
        top: 20%;
    }
    .top40{
        top: 40%;
    }
    #sec1{
        padding: 20px 0;
    }
    .favorite-buttons{
        font-size: 30px;
        margin-bottom: 20px;
    }

</style>