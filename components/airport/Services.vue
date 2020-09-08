<template>
    <div class="list-single-main-item fl-wrap" id="info">
        <div class="list-single-main-item-title">
            <h3>{{$t('pages.airport.services')}}:</h3>
        </div>
        <div class="row service-block" >
            <div class="col-md-2 col-xs-6 col-md-offset-1 pl5 pr5" @click="filter(1, '')" ><div class="service-item" :class="{'selected' : selected === 1 }"> {{$t('pages.airport.service-items.item1')}}</div></div>
            <div class="col-md-2 col-xs-6 pl5 pr5" @click="filter(2, adType.HOTELS)" ><div class="service-item" :class="{'selected' : selected === 2 }"> {{$t('pages.airport.service-items.item2')}}</div></div>
            <div class="col-md-2 col-xs-6 pl5 pr5" @click="filter(3, adType.RESTAURANTS)" ><div class="service-item" :class="{'selected' : selected === 3 }"> {{$t('pages.airport.service-items.item3')}}</div></div>
            <div class="col-md-2 col-xs-6 pl5 pr5" @click="filter(4, adType.TRANSPORTS)" ><div class="service-item" :class="{'selected' : selected === 4 }"> {{$t('pages.airport.service-items.item4')}}</div></div>
            <div class="col-md-2 col-xs-6 pl5 pr5" @click="filter(5, adType.ATTRACTIONS)" ><div class="service-item" :class="{'selected' : selected === 5 }"> {{$t('pages.airport.service-items.item5')}}</div></div>
        </div>
        <AdsPanel v-if="airport.experiencesCount.premium > 0" :items="premiumAds" :blur="!showPremiumAds" title="pages.airport.premium_ads"/>

        <AdsPanel :items="ads" title="pages.airport.non_premium_ads" />

    </div>
</template>

<script>
    import  AdsPanel from  './AdsPanel'
    export default {
        name: "Services",
        components:{
            AdsPanel
        },
        props:{
            airport:{
                type: Object,
                required: true
            },
            ads:{
                type: Array,
                default: []
            },
            premiumAds:{
                type: Array,
                default: []
            },
            showPremiumAds:{
                type: Boolean,
                default: true
            }
        },
        data(){
            return{
                selected: 1,
                search:{
                    type: ''
                }
            }
        },
        methods:{
            filter(index, type){
                this.selected = index;
                this.search.type = type;
                this.$emit('changed', this.search);
            }
        },
        watch:{

        }
    }
</script>

<style scoped>
/*    .service-block{
        padding: 15px;
    }*/
    .service-block label{
        /*padding: 15px;*/
        font-weight: 500;
    }
    .service-item{
        height:80px;
        line-height: 80px;
        text-align: center;
        background:#2E3B59;
        color: white;
        font-weight: 600;
        border-radius: 7px;
        margin-bottom: 30px;
    }
/*    .service-item span {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
    }*/
    .pl5 {
        padding-left: 5px;
    }
    .pr5 {
        padding-right: 5px;
    }
    .mb30{
        margin-bottom: 30px
    }
    .service-item:hover{
        cursor: pointer;
    }
    .selected{
        background: #EC606E;
    }
    .mb20{
        margin-bottom: 20px;
    }
    .radio-text{
        color: #334e6f;
        text-align: left;
        font-size: 18px;
        font-weight: 500;
    }
</style>