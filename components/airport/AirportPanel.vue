<template>
    <div class="popup-wrapper" :class="{'map-popup-wrap' : tail}">
        <div class="map-popup">
            <div class="infoBox-close" @click="$emit('close', item)" v-if="close">
                <i class="fa fa-times"></i>
            </div>
            <nuxt-link :to="'/aerodromes/' + item.slug" class="listing-img-content fl-wrap">
                <img :src="item.img ? item.img : '/images/window' + Math.floor(Math.random() * (9 - 1 + 1) + 1) + '.png'" >
                <!-- Math.floor(Math.random() * (max - min + 1) + min) -->
            </nuxt-link>
            <div class="row listing-content mb-20">
                <div class="col-lg-12 listing-title fl-wrap">
                    <div class="section-title pbi0">
                        <div class="primary-text align-left">{{item.classification}}</div>
                        <nuxt-link :to="'/aerodromes/' + item.slug" >
                            <h4 >{{item.name}}</h4>
                        </nuxt-link>
                    </div>
                    <div class="row" v-if="!hideIcons">
                        <div class="col-xs-12">
                            <IconList :airport="item"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <span class="star-wrapper bb">
<!--                                <img src="/images/icons/Star_full.svg" class="star"/>
                                <span class="h4 vam">3.24 </span>
                                <span class="vam primary-text">(11 notes) </span>-->
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <span class="star-wrapper">
                                <img src="/images/Local_pin.svg" class="star"/>
                                <a :href="googleMap" target="_blank" class="vam primary-text">{{item.address}}</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import IconList from  './IconList'
    export default {
        components:{
            IconList
        },
        name: "AirportPanel",
        props:{
            item:{
                required: true
            },
            close:{
                type: Boolean,
                default: true
            },
            tail:{
                type: Boolean,
                default: true
            },
            hideIcons:{
                type: Boolean,
                default: false
            }
        },
        computed:{
            googleMap(){
                return this.item && this.item.coordinates ? 'https://www.google.com/maps/@' + this.item.coordinates.lat + ',' + this.item.coordinates.lon + ',16z?hl=fr' : '';
            }
        }
    }
</script>

<style scoped>
    .pbi0{
        padding-bottom: 0px !important;
        margin-top: 20px;
    }
    .h4{
        font-size: 14px;
        font-weight: 600;
    }
    .vam{
        vertical-align: middle;
    }
    .star-wrapper{
        float: left;
        width: 100%;
        text-align: left;
        padding: 15px 0px 10px 0px;
        color: #566985;
    }
    .bb{
        border-bottom: 1px solid #566985;
    }
    .star{
        width: 20px;
        margin-right: 5px;
        float: left;
    }
    .mb-20{
        margin-bottom: -20px;
    }
    .popup-wrapper{
/*        height: 500px;
        width: 330px;*/
        height: auto;
        /*width: 330px;*/
        min-height: 450px;
        margin-left: auto;
        margin-right: auto;
    }
</style>