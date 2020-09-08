<template>
    <no-ssr>
        <div class="search-wrapper">
                <GmapAutocomplete
                        ref="autoinput"
                        v-show="!localSearch"
                        :value="searchText"
                        :placeholder="$t('index.search_placeholder')"
                        :class="[ simple ? 'simple-input' : 'search radius-10']"
                        @input="searchText = $event.target.value"
                        @place_changed="placeChanged"
                        select-first-on-enter
                        :options="{
                            types: ['(regions)'],
                            componentRestrictions: {country: 'fr'}
                        }"
                />
            <div class="multiselect" v-show="localSearch" >
                <input ref="input"
                       v-model="searchText"
                       type="text"
                       :placeholder="$t('index.search_placeholder')"
                       tabindex="0"
                       class="radius-10"
                       :class="[simple ? 'simple-input' : 'multiselect__input']">
                <div v-if="airportList && airportList.length>0 && searchText !=='' && localSearch" class="multiselect__content-wrapper" :class="{'simple_content-wrapper' : simple}">
                    <ul class="multiselect__content" id="multiselect-list">
                        <li class="multiselect__element" v-for="(item, index) in airportList" v-if="index<10" >
                            <a :href="item.slug ? '/aerodromes/' + item.slug : 'javascript:{}'">
                                <span class="multiselect__option">{{item.name}} {{item.airportcode ? "(" + item.airportcode + ")" : ''}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </no-ssr>
</template>

<script>
    import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
    export default {
        name: "GeoSearchInput",
        props:{
            redirect:{
                type: Boolean,
                default: true
            },
            text:{
                type: String,
                default: ''
            },
            simple:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                searchText:'',
                localSearch: false,
                airportList:[],
            }
        },
        created(){
            if(this.text){
                //this.localSearch = false;
                this.searchText = this.text
            }
        },
        mounted(){
        },
        computed:{
            ...mapGetters({
                airportSearch      : 'airport/airportSearch',
            }),
            ...mapState({
                'airports'          : state => state.airport.airports,
            }),

        },
        methods: {
            ...mapActions({
                searchAirports  : 'airport/search',
            }),

            async placeChanged(item){
                this.searchText = item.formatted_address;
                if(this.redirect){
                    this.$router.push({name: 'aerodromes', params: {place: item}})
                }else{
                    if(item && item.geometry){
                        this.$emit('geoSearch', item);
                    }
                }
            },
        },
        watch: {
            searchText(keyword){
                if(!keyword){
                    this.airportList = [{name: this.$t('common.no_results')}];
                    this.localSearch = true;
                }
                else if(keyword != ''){
                    keyword = keyword.toUpperCase();
                    this.airportList =  (keyword && this.airports)? this.airports.filter(airport => airport.airportcode.startsWith(keyword)) : [];
                    this.localSearch = this.airportList.length == 0 && keyword != '' ? false : true;
                }
                else {
                    this.airportList = this.airports;
                    this.localSearch = true;
                }
                //console.log(this.searchText);
            },
            localSearch(newVal){
                if(newVal){
                    $('.pac-container').height(0);
                    this.$nextTick(() => this.$refs.input.focus())
                }
                else {
                    $('.pac-container').height('auto');
                    let width = $('#multiselect-list').width();
                    this.$nextTick(() => this.$refs.autoinput.$el.focus());
                    /*setTimeout(() =>  {
                        console.log(width);
                        $('.pac-container').width(width)
                    }, 500);*/
                }
            },
            airports:function(){
                this.airportList = this.airports ? [ ...this.airports ] : [];
            }
        },
    }
</script>

<style scoped>

    /* Tweaking the border radius (client request) */
    .error-wrap .form {
        border-radius: 10px;
        /*box-shadow: 0px 0px 0px 10px rgba(255,255,255,0.2);*/
    }

    .multiselect__option:hover{
        background: #ec616e;
        outline: none;
        color: #fff;
    }
    .search-wrapper{
        width: 100%;
/*        height: 50px;*/
    }
    .radius-10{
        border-radius: 10px;
        font-family: inherit;
        font-size: 12px;
    }
    .radius-25{
        border-radius: 25px;
        font-family: inherit;
        font-size: 12px;
    }
    .multiselect__input{
        width: 100%;
        position: absolute;
        height: 50px;
/*        border-radius: 25px;*/
        border-radius: 10px;
    }
    .multiselect__content-wrapper{
        display: block;
        margin-left: 4%;
        width: 78%;
        margin-top: 50px;
    }
    .multiselect__content{
        display: inline-block;
    }
    .simple-input{
        width: 100%;
        height: 40px;
        font-size: 16px;
        font-family: inherit;
        border-radius: 5px;
        border: 1px solid #EEE;
        padding-left: 10px;
        color: #4A4A4A;
    }
    .simple_content-wrapper {
        /*width: 100%;*/
        margin: unset;
    }
    .multiselect__tags{
        padding: 11px 40px 0 8px;
        height: 46px;
        border: 1px solid #eee;
        background: #f9f9f9;
    }
    .multiselect__select:before {
        top: 75% !important;
    }
    .multiselect__single{
        background: #f9f9f9;
    }
    .multiselect__input{
        background: #f9f9f9 !important;
    }
    @media only screen and  (max-width: 594px) {
        .multiselect__content-wrapper {
            width: 71%;
            margin-top: 29px;
        }
        .multiselect__input{
            border-radius: 5px;
        }
        .radius-10{
            border-radius: 5px;
        }
        .search-submit{
            border-top-right-radius: 5px !important;
            border-bottom-right-radius: 5px !important;
        }
    }
</style>
