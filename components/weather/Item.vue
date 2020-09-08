<template>
    <div class="box-widget-item fl-wrap" v-if="weather.currently && weather.daily">
        <div class="box-widget">
            <div class="row weather-wrapper" >
                <div class="weather-item" >
                    <div class="row">
                        <div class="col-xs-4" >
                            <img :src="'https://darksky.net/images/weather-icons/' + weather.currently.icon + '.png'" class="icon-big-item">
                        </div>
                        <div class="col-xs-8" >
                            <div class="row big-text">{{ weather.currently.temperature.toFixed() }} °C</div>
                            <div class="row" >{{ weather.currently.summary }}</div>
                            <div class="row" >{{weather.currently.name}} - {{$t('common.days.today')}}</div>
                        </div>
                    </div>
                </div>
                <div class="weather-item" v-for="(weatherItem, index) in weather.daily" v-if="index >0 && index < weather.daily.length-1">
                    <div class="row flex-height" >
                        <div class="col-xs-4">
                            <span>{{ $t('common.days.day' + ( +((new Date()).getDay())+ +index)%7) }}</span>
                        </div>
                        <div class="col-xs-4 col-xs-offset-4">
                        <span class="float-right">
                            <span class="">{{ weatherItem.apparentTemperatureHigh.toFixed() }} °C</span>
                            <span class="">
                                <img :src="'https://darksky.net/images/weather-icons/' + weatherItem.icon + '.png'" class="icon-small-item">
                            </span>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {loadWeather} from '~/services/dark-sky-service'
    export default {
        name: "Item",
        props: {
            item: {
                type: Object,
                required: true,
            }
        },
        data(){
            return{
                weather: {
                    currently: null,
                    daily: null
                }
            }
        },
        async mounted() {
            this.weather = await loadWeather(this.$axios, this.item.coordinates.lat, this.item.coordinates.lon);
        }
    }
</script>

<style scoped>
    .weather-wrapper{
        background-color: #2E3B59;
        color: white;
        border-radius: 10px;
        box-shadow: 0px 0px 2px 2px rgba(0,0,255,0.12);
        padding: 30px;
    }
    .weather-item{
        padding: 10px;
        border-bottom: whitesmoke 1px solid;
        text-align: left
    }
    .icon-big-item{
        width: 100%;
    }
    .icon-small-item{
        height: 25px;
    }
    .big-text{
        font-size: 40px;
        font-weight: 800;
    }
    .float-right{
        float: right
    }
    .flex-height{
        display: flex;
        align-items: center
    }

</style>