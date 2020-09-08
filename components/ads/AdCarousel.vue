<template>
    <no-ssr>
<!--        <vueper-slides
                fixed-height="500px"
                class="no-shadow"
                :visible-slides="1"
                :slide-ratio="1/4"
                :dragging-distance="70">
            <div slot="arrowLeft" class="swiper-button-prev sw-btn"><i class="fa fa-long-arrow-left"></i></div>
            <div slot="arrowRight" class="swiper-button-next sw-btn"><i class="fa fa-long-arrow-right"></i></div>
            <vueper-slide v-for="(item, index) in items" :key="index">
                <AdPanel slot="slideContent" :item="item" v-bind="$attrs" v-on="$listeners"/>
            </vueper-slide>
        </vueper-slides>-->

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
                    <AdPanel slot="slideContent" :item="item" v-bind="$attrs" v-on="$listeners"/>
                </div>
            </slide>
        </carousel>
    </no-ssr>
</template>

<script>
    export default {
        name: "AdCarousel",
        props:{
            items:{
                type:Array,
                required: true
            },
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

<style scoped>

</style>