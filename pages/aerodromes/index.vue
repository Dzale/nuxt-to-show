<template>
    <div>
        <section id="sec2"><!-- style="padding-left: 20px;padding-right: 20px;"-->
            <div>
                <div class="col-xs-12 hidden-lg" style="padding: 0px;">
                    <AirportMap
                            style="height:300px;width:100%;position: unset"
                            :radius="advancedSearch.radius"
                            show-radius
                            @changedCenter="changedCenter"
                            :items="airports"
                            :placeLocation="placeLocation"/>
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-12 col-lg-6" style="border-right: 1px solid #eee; min-height: 700px">
                    <div class="container">
                        <div class="row search-container" style="padding: 20px;">
                            <div class="col-lg-12">
                                <CustomTitle title="pages.airports.result" :customLabel="searchText"/>
                                <GeoSearchInput :text="searchText" :redirect="false" @geoSearch="doSearch" :simple="true"/>
                                <div class="row">
                                    <div class="col-xs-6" style="margin-top: 40px;">
                                        <a href="javascript:{}" class="left" :class="{'selected' : asVisible}" @click="asVisible = !asVisible">
                                            <span><i :class="[asVisible ? 'fa fa-minus' : 'fa fa-plus']"> </i></span> 
                                            {{$t('pages.airports.more_filters')}}
                                        </a>
                                    </div>
        <!--                                    <div class="col-xs-6">
                                        <loading-button @click="doSearch" btnClass="round-btn primary-red no-border" style="float: right;" :disabled="false" text="pages.airports.update" :loading="false"/>
                                    </div>-->
                                </div>
                            </div>
                        </div>
                        <div class="row advanced-search-container search-container" style="padding: 0px 20px;" v-if="asVisible">
                            <div class="col-md-12" style="padding: 0px 20px;">
                                <div class="hidden-listing-filter fl-wrap" style="display: block;">
                                    <div class=" fl-wrap filter-tags">
                                        <CustomTitle title="pages.airports.filter_title"/>
                                        <input id="check-a" type="checkbox" v-model="advancedSearch.a" name="check">
                                        <label for="check-a">{{$t('pages.airports.checkboxes.item1')}}</label>
                                        <input id="check-b" type="checkbox" v-model="advancedSearch.b" name="check">
                                        <label for="check-b">{{$t('pages.airports.checkboxes.item2')}}</label>
                                        <!-- <input id="check-c" type="checkbox" v-model="advancedSearch.c" name="check">
                                        <label for="check-c">{{$t('pages.airports.checkboxes.item3')}}</label> -->
                                        <!-- <input id="check-d" type="checkbox" v-model="advancedSearch.d" name="check">
                                        <label for="check-d">{{$t('pages.airports.checkboxes.item4')}}</label> -->
                                    </div>
                                    <div class=" fl-wrap filter-tags">
                                        <CustomTitle title="pages.airports.distance" :customLabel="advancedSearch.radius + 'km'"/>
                                        <VueSlider :max="200" v-model="advancedSearch.radius" :tooltip="'none'" @drag-end="doSearch"></VueSlider>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div v-if="airports" class="col-xs-12 col-md-12">
                                <template v-for="(item, index) in airports">
                                    <div class="row airport-row" v-if="index%2 == 0" :key="index">
                                        <div class="col-xs-12 col-md-6" >
                                            <AirportPanel  :item="airports[index]" :tail="false" :close="false"/>
                                        </div>
                                        <div class="col-xs-12 col-md-6" v-if="index+1 <airports.length">
                                            <AirportPanel  :item="airports[index+1]" :tail="false" :close="false"/>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="col-xs-12 col-md-12 list-single-main-item-title" v-if="airports && airports.length == 0">
                                <h3 class="text-center" style="padding: 30px">
                                    <span>{{$t('common.no_results')}}</span>
                                </h3>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-6 visible-lg" style="padding: 0px;">
                    <AirportMap
                            :radius="advancedSearch.radius"
                            show-radius
                            @changedCenter="changedCenter"
                            :items="airports"
                            :placeLocation="placeLocation"/>
                </div>
            </div>

<!--                    <div class="row" style="margin-top: 20px;">
                        <div class="container">
                            <div class="row" >-->

        </section>
    </div>

</template>

<script>
    import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
    import GeoSearchInput from '~/components/UI/GeoSearchInput'
    export default {
        name: "airports",
        components:{
            GeoSearchInput
        },
        head() {
            return {
                title: this.$t('meta.airport.title'),
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('meta.airport.desc') }
                ]
            }
        },
        data(){
            return {
                airports: [],
                endPagination: 4,
                searchText:'',
                asVisible:false,
                placeLocation:null,
                advancedSearch:{
                    radius:50,
                    a: false,
                    b: false,
                    c: false,
                    // d: false,
                    classification: [],
                    geometry: null
                },
                place: null
            }
        },
        async mounted(){
            await this.doSearch(this.$route.params.place);
        },
        computed:{
            ...mapState({
/*                'airports'      : state => state.airport.airports,*/
            }),
            ...mapGetters(['']),
            computedClassification(){
                let result = [];
                if(this.advancedSearch.a){
                    result.push(this.airportClassification.a);
                }
                if(this.advancedSearch.b){
                    result.push(this.airportClassification.b);
                }
                if(this.advancedSearch.c){
                    result.push(this.airportClassification.c);
                }
                return result;
            }
        },
        methods: {
            ...mapActions({
                all                 : 'airport/all',
                geoSearchAirports   : 'airport/geoSearch',
            }),
            async doSearch(place){
                if(place && place !== undefined){
                    if(place && place.formatted_address){
                        this.searchText = place.formatted_address;
                    }
                    else if(place && place.name){
                        this.searchText = place.name;
                    }
                    this.place = place;
/*                    this.placeLocation = {lat: place.lat, lng: place.lng};
                    this.advancedSearch.geometry = {lat: place.lng, lon: place.lat};*/
                    this.placeLocation = place.geometry.location;
                    this.advancedSearch.geometry = this.parseGeometry(place);
                }else{
                    this.searchText = this.dafaultPlace.formatted_address;
                    if(this.advancedSearch.geometry){
                        this.advancedSearch.geometry = this.advancedSearch.geometry;
                    }else{
                        this.placeLocation = this.dafaultPlace.geometry.location;
                        this.advancedSearch.geometry = {
                            lat: this.placeLocation.lat,
                            lon: this.placeLocation.lng,
                        };
                    }
                }
                this.advancedSearch.classification = this.computedClassification;
                this.airports = await this.geoSearchAirports(this.advancedSearch);
                fadeOutLoader();
            },
            async changedCenter(center){
                if(center){
                    this.placeLocation = center;
                    this.advancedSearch.geometry = {lat: center.lat(), lon: center.lng()};
                    this.advancedSearch.classification = this.computedClassification;
                    this.airports = await this.geoSearchAirports(this.advancedSearch);
                }
            },
        },
        watch:{
            'advancedSearch.a'(){
                this.doSearch();
            },
            'advancedSearch.b'(){
                this.doSearch();
            },
            'advancedSearch.c'(){
                this.doSearch();
            },
        }

    }
</script>
<style>
    body .pac-container{
        margin-left: unset;
    }

</style>
<style scoped>
    .sp50{
        padding: 0px 50px;
    }
    .selected{
        color: #ec616e;
    }
    .left{
        float: left;
    }
    .search-container{
        background: white;
        border-bottom: 1px solid #EAEAEA;
    }
    .search-container:not(.advanced-search-container) .container{
        z-index: 6;
    }
    .airport-item{
        padding: 0px;
        position: relative;
    }
    .airport-row{
        margin-top: 30px;
    }

</style>
