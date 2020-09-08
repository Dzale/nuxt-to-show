<template>
    <div class="box-widget-item fl-wrap" v-if="airport && airport.aeroclubs && airport.aeroclubs.length > 0">
        <div class="box-widget-item-header">
            <h3>{{$tc('pages.airport.aeroclub.title', airport.aeroclubs.length)}}</h3>
        </div>
        <div class="box-widget">
            <div v-for="(club, index) in airport.aeroclubs" class="box-widget-content" style="padding-bottom:10px;">
                <div class="list-author-widget-contacts list-item-widget-contacts">
                    

                    <ul v-if="club">
                            
                            <li v-if="club.name" style="border-bottom: 0">
                                <h3 class="aeroclub-title">{{club.name}}</h3>
                            </li>

                            <li v-if="club.website" style="padding-bottom: 10px">
                                <span><i class="fa fa-link"></i> {{$t('pages.airport.aeroclub.website')}} :</span> <a :href="club.website" target="_blank" class="vam primary-text">{{ club.website.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '') }}</a>
                            </li>
                            <li v-if="club.phone1 || club.phone2" style="padding-bottom: 10px">
                                <span><i class="fa fa-phone"></i> {{$tc('pages.airport.aeroclub.phone', 1 + club.phone1 && club.phone2)}} :</span> <a v-if="club.phone1" :href="'tel:' + club.phone1" target="_blank" class="vam primary-text">{{('0' + club.phone1.substr(3)).replace(/(.{2})/g,"$1 ")}}</a><a v-if="club.phone2" :href="'tel:' + club.phone2" target="_blank" class="vam primary-text">{{('0' + club.phone2.substr(3)).replace(/(.{2})/g,"$1 ")}}</a>
                            </li>
                        </ul>

                        
                </div>


                

<!--                <div>
                    <ul class="aeroclubs-list">
                        <li v-for="(club, index) in airport.aeroclubs" >
                            <div class="row">
                                <div class="col-xs-1">
                                    <span><i class="fa fa-phone"></i></span>
                                </div>
                                <div class="col-xs-3">
                                    {{club.name}}
                                </div>
                                <div class="col-xs-8">
                                    <a href="javascript:{}">{{club.website}}</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Aeroclubs",
        props:["airport"],
        data(){
            return{
            }
        }
    }
</script>

<style scoped>
    .aeroclub-title {
        font-weight: 500;
        font-size: 1.2em;
    }
    .aeroclubs-list{
        font-size: 10px;
        text-align: left;
        font-weight: 600;
        color: #2E3B59;
    }
    .download{
        border: none;
        border-radius: 35px;
        height: 40px;
        padding: 10px;
        color: white;
        font-weight: 600;
        background: #EC616E;
    }
    .div{
        color: white;
        height: 50px;
        line-height: 50px;
        font-weight: 900;
        background: #EC616E;
        border-radius: 10px;
        margin: 10px;

    }
    .div:hover{
        background: #b92e3b;
        cursor: pointer;
    }
/*    .aeroclubs-list li a{
        color: #4a4a4a;
    }
    .aeroclubs-list li:not(:last-child) a {
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
    }*/
</style>