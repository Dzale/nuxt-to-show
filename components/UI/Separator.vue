<template>
    <section class="section-header">
        <div v-if="title" class="intro-item fl-wrap" >
<!--            <h2 class="hidden-sm" style="color: #2F3B59">{{$t(title)}}</h2>
            <h2 class="hidden-sm" style="color: #2F3B59">{{$t(title1)}}</h2>-->
            <h2 class="container" style="color: #2F3B59">{{$t(title) + $t(title1)}}</h2>
        </div>
        <span class="section-separator"></span>
        <p v-if="subtitle" >{{$t(subtitle)}}</p>
    </section>

</template>

<script>
    export default {
        name: "Separator",
        props:{
            title:{
                type: String,
                default: ''
            },
            title1:{
                type: String,
                default: ''
            },
            subtitle:{
                type: String,
                default: ''
            },
        }
    }
</script>

<style scoped>
    .section-header{
        padding-top: 0
    }
    @media only screen and  (max-width: 594px) {
        .section-header{
            padding-bottom: 20px;
            padding-right: 20px;
            padding-left: 20px;
        }
    }
</style>