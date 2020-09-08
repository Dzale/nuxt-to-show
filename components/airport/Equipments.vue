<template>
    <div>
        <div class="list-single-main-item-title fl-wrap mt20">
            <h3>{{$t('pages.airport.equipments')}}:</h3>
        </div>
        <div class="row hidden-xs">
            <div class="col-xs-6">
                <ul class="equipments-list">
                    <li v-for="(item, index) in equipments.left" class="align-left" :class="{'hide' : item.hide, 'cross' : item.cross}"><img :src="'/images/icon_equipement/' + item.icon">{{item.title}}</li>
                </ul>
            </div>
            <div class="col-xs-6">
                <ul class="equipments-list">
                    <li v-for="(item, index) in equipments.right" class="align-left" :class="{'hide' : item.hide, 'cross' : item.cross}"><img :src="'/images/icon_equipement/' + item.icon">{{item.title}}</li>
                </ul>
            </div>
        </div>
        <div class="row visible-xs">
            <div class="col-xs-12">
                <ul class="equipments-list">
                    <li v-for="(item, index) in equipments.left" class="align-left" :class="{'hide' : item.hide, 'cross' : item.cross}"><img :src="'/images/icon_equipement/' + item.icon">{{item.title}}</li>
                    <li v-for="(item, index) in equipments.right" class="align-left" :class="{'hide' : item.hide, 'cross' : item.cross}"><img :src="'/images/icon_equipement/' + item.icon">{{item.title}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Equipments",
        props:{
            airport:{
                requred:true
            }
        },
        data(){
            return {
            }
        },
        computed:{
            equipments(){
               return {
                    left:[
                        {
                            'icon' : 'circle-check.svg',
                            'title' : this.airport.classification,//'pages.airport.equipment.item1',
                            'cross': false,
                            'hide': false
                        },
                        {
                            'icon' : 'taxi.svg',
                            'title' : this.airport.experiencesCount && this.airport.experiencesCount.premium ? this.airport.experiencesCount.premium + ' ' + this.$t('pages.airport.equipment.item2') : '',
                            'cross': false,
                            'hide': this.airport.experiencesCount && this.airport.experiencesCount.premium ? false : true,
                        },
                        {
                            'icon' : 'vehicles.svg',
                            'title' : this.$t('pages.airport.equipment.item3'),
                            'cross': !this.airport.refuellingstations247,
                            'hide': false

                        },
                        {
                            'icon' : 'douane.svg',
                            'title' : this.$t('pages.airport.equipment.item4'),
                            'cross': !this.airport.customsairport,
                            'hide': false
                        },
                        {
                            'icon' : 'restaurant.svg',
                            'title' : this.$t('pages.airport.equipment.item5'),
                            'cross': !this.airport.airportfoodservice,
                            'hide': false
                        }
                    ],
                    right:[
                        {
                            'icon' : 'camping.svg',
                            'title' : this.$t('pages.airport.equipment.item6'),
                            'cross': !this.airport.airporthotelorcampsite,
                            'hide': false
                        },
                        {
                            'icon' : 'wrench.svg',
                            'title' : this.$t('pages.airport.equipment.item7'),
                            'cross': !this.airport.airportworkshop,
                            'hide': false
                        },
                        {
                            'icon' : 'parking.svg',
                            'title' : this.$t('pages.airport.equipment.item8'),
                            'cross': !this.airport.aircraftparking,
                            'hide': false
                        },
                        {
                            'icon' : 'gare.svg',
                            'title' : this.$t('pages.airport.equipment.item9'),
                            'cross': !this.airport.publictransportnearby,
                            'hide': false
                        },
                    ]
                };
            }
        }
    }
</script>

<style scoped>
    .mt20 {
        margin-top: 20px;
    }
    .equipments-list{
        float: left;
    }
    .equipments-list li {
        font-weight: 500;
        margin: 20px;
    }
    .equipments-list li img {
        width: 18px;
        margin-right: 20px;
        float: left;
    }
    .equipments-list li.cross img  {
        filter: invert(.8);
    }
    .cross {
        font-weight: 200 !important;
        color: darkgrey;
        text-decoration: line-through;
    }
</style>