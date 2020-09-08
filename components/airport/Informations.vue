<template>
    <div class="list-single-main-item fl-wrap">
        <div class="list-single-main-item-title">
            <h3>{{$t('pages.airport.info')}}:</h3>
            <div class="list-single-main-item-title">
                <ul class="info-list">
                    <li class="align-left">
                        <div class="row">
                            <div class="col-xs-6"> {{$t('pages.airport.info-items.item1')}}</div>
                            <div class="col-xs-6 fw-900">{{airport.runwayoveronekm ? $t('pages.airport.info-items.more_than') : $t('pages.airport.info-items.less_than')}}</div>
                        </div>
                    </li>
                    <li class="align-left">
                        <div class="row">
                            <div class="col-xs-6"> {{$t('pages.airport.info-items.item2')}}</div>
                            <div class="col-xs-6 fw-900">{{airport.closestlocation ? airport.closestlocation.distance.toFixed(1) : 0}} km</div>
                        </div>
                    </li>
                    <li class="align-left">
                        <div class="row">
                            <div class="col-xs-6"> {{$t('pages.airport.info-items.item4')}}</div>
                            <div class="col-xs-6 fw-900">{{airport.landingfee}}</div>
                        </div>
                    </li>
<!--                    <li class="align-left">
                        <div class="row">
                            <div class="col-xs-6"> {{$t('pages.airport.info-items.item5')}}</div>
                            <div class="col-xs-6 fw-900">TEST</div>
                        </div>
                    </li>-->

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Informations",
        props:["airport"]
    }
</script>

<style scoped>
    .info-list{
        text-align: left;
    }
    .info-list li {
        margin: 20px;
    }
</style>