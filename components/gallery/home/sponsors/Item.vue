<template>
    <div>
        <a :href="item.link" target="_blank"><img :src="item.img" class="full-width"></a>
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
    .sponsor-name{
        color: #2F3B59;
        font-size: 20px;
        font-weight: 600;
    }
    .full-width{
        width: 150px;
    }
</style>