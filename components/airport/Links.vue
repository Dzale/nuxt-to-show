<template>
    <div class="box-widget-item fl-wrap" v-if="airport" >
        <div class="box-widget-item-header">
            <h3>{{$t('pages.airport.links')}}: </h3>
        </div>
        <div class="box-widget">
            <div class="box-widget-content" style="padding: 20px;">
                <div class="list-author-widget-contacts list-item-widget-contacts">
<!--                    <div class="row align-left unset-margin airport-link"><a href="#">{{$t('pages.airport.link-items.item1')}}</a></div>-->
                    <div class="row align-left unset-margin airport-link"><a :href="airport.vaclink" target="_blank">{{$t('pages.airport.link-items.item2')}}</a></div>
                    <div class="row align-left unset-margin airport-link"><a :href="weatherLink" target="_blank">{{$t('pages.airport.link-items.item3')}}</a></div>
                    <div class="row align-left unset-margin airport-link" v-if="airport.aeroclubs && airport.aeroclubs.length >0"><span>{{$t('pages.airport.link-items.item4')}}</span></div>
                    <div class="row align-left unset-margin airport-link" ><nuxt-link to="/contact" target="_blank">{{$t('pages.airport.link-items.contact_us')}}</nuxt-link></div>
                    <div v-for="(club, index) in airport.aeroclubs" class="row align-left unset-margin airport-link aeroclub-sublist"><a :href="club.website" target="_blank">{{club.name}}</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Links",
        props:['airport'],
        computed:{
            weatherLink(){
                // return 'https://maps.darksky.net/@wind_speed,' + this.selectedAirport.coordinates.lat + ',' + this.selectedAirport.coordinates.lon;
                return 'https://www.windy.com/' + this.airport.airportcode;
            }
        },
    }
</script>

<style scoped>
    .airport-link{
        padding: 10px;
        color: #2E3B59;
    }
    .airport-link a{
        text-decoration: underline;
        color: #2E3B59;
    }
    .aeroclub-sublist{
        margin-left: 20px;
    }
</style>