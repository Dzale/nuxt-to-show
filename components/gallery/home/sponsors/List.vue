<template>
    <no-ssr>
<!--        <vueper-slides v-if="items && slides"
                       fixed-height="300px"
                       class="no-shadow"
                       :visible-slides="slides"
                       :slide-ratio="1/4"
                       :bullets="false"
                       :dragging-distance="70">
            <div slot="arrowLeft" class="swiper-button-prev sw-btn gray-btn"><i class="fa fa-long-arrow-left"></i></div>
            <div slot="arrowRight" class="swiper-button-next sw-btn gray-btn"><i class="fa fa-long-arrow-right"></i></div>
            <vueper-slide v-for="(item, index) in items" :key="index">
                <Item slot="slideContent" :item="item"></Item>
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
            <slide v-for="(item, index) in items" :key="index">
                <div class="panel-container">
                    <Item slot="slideContent" :item="item"></Item>
                </div>
            </slide>
        </carousel>
    </no-ssr>
</template>

<script>
    import Item from './Item'
    export default {
        name: "GalleryList",
        components:{
            Item
        },
        data(){
            return{
                slides:5,
                items:[
                    {
                        img         : '/images/prtnrs/logo1.png',
                        link        : 'https://www.forflyaway.com/',
                    },
                    {
                        img         : '/images/prtnrs/logo2.png',
                        link        : 'https://www.forflyaway.com/',
                    },
                    {
                        img         : '/images/prtnrs/logo3.png',
                        link        : 'https://www.forflyaway.com/',
                    },
                    {
                        img         : '/images/prtnrs/logo1.png',
                        link        : 'https://www.forflyaway.com/',
                    },
                    {
                        img         : '/images/prtnrs/logo2.png',
                        link        : 'https://www.forflyaway.com/',
                    },
                ],
            }
        },
        mounted() {
            this.$nextTick(function() {
                window.addEventListener('resize', this.getWindowWidth);
                window.addEventListener('resize', this.getWindowHeight);

                //Init
                this.getWindowWidth()
            })

        },

        methods: {
            getWindowWidth(event) {
                let windowWidth = document.documentElement.clientWidth;
                if(windowWidth < 796){
                    this.slides = 2;
                }else{
                    this.slides = 5;
                }
            },
        },
    }
</script>

<style scoped>
    .gray-btn{
        background: #F9F9F9;
        color: #303B59;
    }

    .gray-btn:hover{
        background: #d1d1d1;
    }
</style>