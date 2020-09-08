<template>
    <article class="geodir-category-listing fl-wrap article">
        <nuxt-link :to="'/services/' + item.slug"><!--class="geodir-category-img"-->
            <img v-if="item.photos && item.photos.length > 0" :src="imgPath(item.photos[0].url)">
            <img v-else src="/images/all/ibis1.jpg">
        </nuxt-link>
        <div class="fl-wrap article-content">
            <div class="box-widget-item-header">
                <nuxt-link :to="'/services/' + item.slug">
                    <h3>{{item.name}} - <span class="fw500 ads-distance">{{item.airportDistance}} km</span></h3>
                </nuxt-link>
            </div>
            <p class="service-type">{{$t('pages.ad.types.' + item.type )}}</p>
            <p>{{$t('pages.airport.services-pricing')}} <span class="ad-price">{{item.pricing}}</span></p>
            <div class="row">
                <div class="col-xs-12">
                    <div class="location align-left">
                        <img src="/images/Local_pin.svg" class="location-icon"/>
                        <a :href="googleMap" class="vam primary-text" target="_blank">{{item.address}}</a>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        name: "AdPanel",
        props:['item'],
        computed:{
            googleMap(){
                return this.item && this.item.coordinates ? 'https://www.google.com/maps/@' + this.item.coordinates.lat + ',' + this.item.coordinates.lon + ',16z?hl=fr' : '';
            }
        }
    }
</script>

<style scoped>
    article{
        overflow: hidden;
        border: 1px solid #eee;
        margin-bottom: 30px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    article img{
        float: left;
        width: 100%;
        height: auto;
        z-index: 1;
    }
    .vam{
        vertical-align: middle;
    }
    .location{
        padding: 15px 0;
        width: 100%;
        margin-top: 15px;
        font-weight: 500;
        border-top: 1px solid #eee;
        color: #566985;
    }
    .location-icon{
        width: 20px;
        margin-right: 5px;
        float: left;
    }
    .car-icon{
        width: 40px;
        margin-right: 5px;
    }

    .article-content{
        padding: 1em 1em 0;
    }
    .ads-distance{
        font-size: 15px;
    }
    .ad-price{
        font-size: 1.2em;
        color: #ec616e;
    }
    .article{
        transition: all .2s ease-in-out;
    }
    .article:hover{
        transform: scale(1.05);
    }
    p.service-type {
        text-transform: capitalize;
    }

</style>