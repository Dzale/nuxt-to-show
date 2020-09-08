<template>
    <div class="gallery-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="grid-item-holder">
            <div class="listing-item-grid">
                <img  :src="item.img" alt="">
                <div class="listing-counter">
                    <span>{{item.count || '0'}} </span> {{ $tc("index.gallery.types." + item.type, item.count) }}
                </div>
                <div class="listing-item-cat">
                    <h3>{{$t(item.title)}}</h3>
                    <p>{{$t(item.subtitle)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GalleryItem",
        props:{
            item:{
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .listing-item-cat h3 { color: #fff; }
    /*.col-md-3{
        width: 25% !important;
    }*/
</style>