<template>
    <div>
            <carousel :mouse-drag="false" navigation-enabled center-mode pagination-active-color="#ec616e" pagination-color="#bdcbdb"
                      :scroll-per-page="true"
                      navigation-prev-label='<div slot="arrowLeft" class="swiper-button-prev sw-btn sw-btn-force"><i class="fa fa-long-arrow-left"></i></div>'
                      navigation-next-label='<div slot="arrowRight" class="swiper-button-next sw-btn sw-btn-force"><i class="fa fa-long-arrow-right"></i></div>'
                      :per-page-custom="[
                      [0, 1], [850, 2], [1200, 3], [1500, 4]
                      ]"
                >
                <slide v-for="(item, index) in items" :key="index" v-if="index<12">
                    <div class="panel-container">
                        <AirportPanel slot="slideContent" :item="item" :tail="false" :close="close" v-bind="$attrs" v-on="$listeners"/>
                    </div>
                </slide>
            </carousel>
    </div>
</template>

<script>
    export default {
        name: "AirportCarousel",
        props:{
            items:{
                type:Array,
                required: true
            },
            close:{
                type:Boolean,
                default: false
            }
        },
        data(){
            return{
            }
        },
        mounted() {
        },
        computed: {
        },

        methods: {

        },
    }
</script>

<style>
    .VueCarousel-navigation-button:focus {
        outline: none !important;
    }
</style>

<style scoped>
    .panel-container{
        margin-left: 15px;
        margin-right: 15px;
    }
</style>
