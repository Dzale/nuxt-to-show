<template>
    <div class="box-widget-item fl-wrap">
        <div class="box-widget-item-header">
            <h3>{{$t('pages.airport.localisation')}}</h3>
        </div>
        <div class="box-widget">
            <div class="box-widget-content" style="padding:0px">
                <AirportMap v-if="airport" :info="false" :items="[airport]" :place-location="getPosition(airport)" mapStyle="width:100%; height:300px"/>
                <div style="padding: 30px">
                    <div class="list-author-widget-contacts list-item-widget-contacts">
                        <ul v-if="airport">
                            <li>
                                <div>
                                    <a :href="airport.vaclink" target="_blank" class="download" text="pages.airport.download" vaclink>{{$t('pages.airport.download')}}</a>
                                </div>
                            </li>
                            <li v-if="airport.address">
                                <span><i class="fa fa-home"></i> {{$t('pages.airport.address')}} :</span> <a :href="googleMap" target="_blank" class="vam primary-text">{{airport.address}}</a>
                            </li>
                            <li v-if="airport.website">
                                <span><i class="fa fa-link"></i> {{$t('pages.airport.website')}} :</span> <a :href="airport.website" target="_blank" class="vam primary-text">{{ airport.website.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '') | truncate(30, '...') }}</a>
                            </li>
                            <li v-if="airport.phone">
                                <span><i class="fa fa-phone"></i> {{$t('pages.airport.phone')}} :</span> <a v-if="airport.phone" :href="'tel:' + airport.phone" target="_blank" class="vam primary-text">{{('0' + airport.phone.substr(3)).replace(/(.{2})/g,"$1 ")}}</a>
                            </li>

                        </ul>
                    </div>

<!--                    <div class="list-widget-social social-buttons">
                        <AirportSocialButtons/>
                    </div>-->
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import AirportSocialButtons from '~/components/social-buttons/AirportSocialButtons'
    export default {
        name: "Map",
        props:["airport"],
        computed:{
            googleMap(){
                return this.airport && this.airport.coordinates ? 'https://www.google.com/maps/@' + this.airport.coordinates.lat + ',' + this.airport.coordinates.lon + ',16z?hl=fr' : '';
            }
        },
        components:{
            AirportSocialButtons,
        },
        data(){
            return{
            }
        }
    }
</script>

<style scoped>
    .vam{
        vertical-align: middle;
    }
    .social-buttons{
        float: right;
        margin-bottom: 20px;
    }
    .download{
        border: none;
        border-radius: 10px;
        height: 50px;
        padding: 10px;
        color: white;
        font-weight: 600;
        background: #EC616E;
        margin: unset;
        float: none;
    }
    .download:hover{
        background: #b92e3b;
        color: white;
    }
</style>