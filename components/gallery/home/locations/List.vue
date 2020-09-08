<template>
    <div class="gallery-items fl-wrap mr-bot spad row unset-margin">
        <Item v-for="(item, index) in computedItems" :key="index" :item="item"/>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import Item from './Item'
    export default {
        name: "GalleryList",
        components:{
            Item
        },
/*        props:{
            items:{
                type: Array,
                required: true
            }
        },*/
        async created(){
            this.counts = await this.count();
            //console.log(this.counts);
        },
        data(){
            return{
                counts: null
            }
        },
        computed:{
            computedItems(){
                return [
                    {
                        img         : '/images/all/restaurants.jpg',
                        count       : this.counts ? this.counts.restaurants : 0,
                        type        : this.adType.RESTAURANTS,
                        title       : 'index.gallery.item1.title',
                        subtitle    : 'index.gallery.item1.subtitle'
                    },
                    {
                        img         : '/images/all/hotels.jpg',
                        count       : this.counts ? this.counts.hotels : 0,
                        type        : this.adType.HOTELS,
                        title       : 'index.gallery.item2.title',
                        subtitle    : 'index.gallery.item2.subtitle'
                    },
                    {
                        img         : '/images/all/attractions.jpg',
                        count       : this.counts ? this.counts.attractions : 0,
                        type        : this.adType.ATTRACTIONS,
                        title       : 'index.gallery.item3.title',
                        subtitle    : 'index.gallery.item3.subtitle'
                    },
                    {
                        img         : '/images/all/transports.jpg',
                        count       : this.counts ? this.counts.transports : 0,
                        type        : this.adType.TRANSPORTS,
                        title       : 'index.gallery.item4.title',
                        subtitle    : 'index.gallery.item4.subtitle'
                    },
                ]
            }
        },
        methods:{
            ...mapActions({
                'count' : 'ad/count'
            }),
        }
    }
</script>

<style scoped>
    .gallery-items.mr-bot {
        margin-bottom: 0px;
    }
</style>