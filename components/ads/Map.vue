<template>
    <div class="box-widget-item fl-wrap">
        <div class="box-widget-item-header">
            <h3>{{$t('pages.ad.location')}}</h3>
        </div>
        <div class="box-widget">
            <div class="box-widget-content" style="padding:0px">
                <AirportMap v-if="ad" :info="false" :items="[ad]" :place-location="getPosition(ad)" mapStyle="width:100%; height:300px"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Map",
        props:["ad"],
        computed:{
            googleMap(){
                return this.ad && this.ad.coordinates ? 'https://www.google.com/maps/@' + this.ad.coordinates.lat + ',' + this.ad.coordinates.lon + ',16z?hl=fr' : '';
            }
        },
        data(){
            return{
            }
        }
    }
</script>

<style scoped>

</style>