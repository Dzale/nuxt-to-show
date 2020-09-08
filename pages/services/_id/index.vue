<template>
    <div v-if="localAd">
        <section class="parallax-section single-par list-single-section mt80" data-scrollax-parent="true" id="sec1">
            <div class="bg par-elem " :style="'background-image:url(' + computedImage + ');'" data-scrollax="properties: { translateY: '30%' }"></div>
            <div class="overlay"></div>
            <div class="bubble-bg"></div>
            <div class="list-single-header absolute-header fl-wrap">
                <div class="container" style="color: white">
                    <div class="row ad-distance" >
                        <span>{{$t('pages.ad.distance', { distance: localAd.airportDistance })}}</span>
                    </div>
                    <div class="row" >
                        <div class="ad-name">
                            <h2>{{localAd.name}}</h2>
                        </div>
                    </div>
                    <div class="row" >
                        <div class="ad-cost">
                            <h3>{{$t('pages.ad.pricing', { price: localAd.pricing })}}</h3>
                        </div>
                    </div>
                    <div class="row" >
                        <div>
                            <a :href="localAd.website" target="_blank" class="primary-btn" >{{$t('pages.ad.reserve')}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="scroll-nav-wrapper fl-wrap">
            <div class="container">
                <nav class="scroll-nav scroll-init header-wrapper">
                    <div class="row">
                        <img src="/images/icons/home.svg" class="size20">
                        <span class="">{{localAd.address}}</span>
                        <img src="/images/icons/Iphone.svg" class="size20">
                        <span class="">{{localAd.phone}}</span>
                    </div>

                </nav>
            </div>
        </div>
        <section class="gray-bg text-color" id="sec2">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="box-widget-item fl-wrap">
                            <div class="box-widget">
                                <div class="box-widget-content">
                                    <div class="row">
                                        <div class="col-xs-12 mt30 align-left">
                                            <div class="list-single-main-item-title">
                                                <h3>{{$t('pages.ad.description')}} :</h3>
                                            </div>
                                            <p class="justify" v-html="localAd.description"></p>
                                        </div>
                                    </div>
                                    <div v-if="localAd.termsAndConditions" class="row">
                                        <div class="col-xs-12 mt30 align-left">
                                            <div class="list-single-main-item-title">
                                                <h3>{{$t('pages.ad.conditions')}} :</h3>
                                            </div>
                                            <p class="justify" v-html="localAd.termsAndConditions"></p>
                                        </div>
                                    </div>
                                    <div v-if="localAd.welcomeOffer" class="row">
                                        <div class="col-xs-12 mt30 align-left">
                                            <div class="list-single-main-item-title">
                                                <h3>{{$t('pages.ad.welcomeOffer')}} :</h3>
                                            </div>
                                            <p class="justify" v-html="localAd.welcomeOffer"></p>
                                        </div>
                                    </div>
                                    <!-- <Time :item="localAd" /> -->
                                    <div class="row" >
                                        <div class="col-xs-12 mt30 align-left">
                                            <a :href="localAd.website" target="_blank" class="primary-btn" >{{$t('pages.ad.reserve')}}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <Map :ad="localAd"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
    import Map from '~/components/ads/Map'
    import Time from '~/components/ads/Time'

    export default {
        name: "index",
        components:{
            Map,
            Time
        },
        head () {
            if(this.localAd){
                return {
                    title: this.localAd.name,
                    meta: [
                        { 
                            hid: 'description',
                            name: 'description',
                            content: this.localAd.excerpt
                        },
                        {
                            hid: 'og:title',
                            property: 'og:title',
                            content: this.localAd.name +' - FORFLYAWAY'
                        },
                        {
                            hid: 'og:description',
                            property: 'og:description',
                            content: this.localAd.excerpt
                        },
                        {
                            hid: 'og:image',
                            property: 'og:image',
                            content: this.localAd.photos && this.localAd.photos.length > 0 ? this.localAd.photos[0].url : 'https://forflyaway.com/images/all/ibis.jpg'
                        },
                        {
                            hid: 'twitter:title',
                            name: 'twitter:title',
                            content: this.localAd.name +' - FORFLYAWAY'
                        },
                        {
                            hid: 'twitter:description',
                            name: 'twitter:description',
                            content: this.localAd.excerpt
                        },
                        {
                            hid: 'twitter:image',
                            name: 'twitter:image',
                            content: this.localAd.photos && this.localAd.photos.length > 0 ? this.localAd.photos[0].url : 'https://forflyaway.com/images/all/ibis.jpg'
                        }
                    ],
                }
            }
        },
        async asyncData({ app, params, store , redirect }){
            let localAd = await store.dispatch('ad/find', params.id);
            if(!localAd || localAd === undefined){
                redirect('/');
            }
            return {
                localAd
            }
        },
/*        data(){
            return {
                //localAd: null,
            }
        },*/
        mounted(){
            fadeOutLoader();
        },
        computed:{
            ...mapState({
                'fetchingLoad'      : state => state.user.selectedUser,
            }),
            ...mapGetters([]),
            computedImage(){
                //return this.localAd && this.localAd.photos && this.localAd.photos.length>0 ? (  process.env.apiUrl + '/' + this.localAd.photos[0].url) : '/images/all/ibis.jpg'
                return this.localAd && this.localAd.cover? (  process.env.apiUrl + '/' + this.localAd.cover.url) : (this.localAd && this.localAd.photos && this.localAd.photos.length>0 ? (  process.env.apiUrl + '/' + this.localAd.photos[0].url) : '/images/all/ibis.jpg')
            }
        },
        methods: {
            ...mapActions({
                find: 'ad/find',
                update: 'ad/update',
            }),
        },
    }
</script>

<style scoped>
    .ad-distance{
        padding: 30px;
        font-weight: 600;
        font-size: 18px;
    }
    .ad-name{
/*        padding: 30px;*/
        width: 100%;
        color: #fff;
        font-size: 46px;
        font-weight: 900;
    }

    .ad-cost{
        padding: 30px;
        width: 100%;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
    }
    .ad-cost span{
        font-size: 46px;
        font-weight: 900;
    }
    .header-wrapper{
        padding: 30px;
        float: left;
        color: #21345F
    }
    .size20{
        height: 20px;
        width: 20px;
    }
    .header-wrapper span{
        margin-right: 50px;
    }
    .justify{
        text-align: justify;
    }
    .mt30{
        margin-top: 30px;
    }

</style>
