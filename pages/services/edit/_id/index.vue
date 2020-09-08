<template>
    <Form :_id="$route.params.id"/>
</template>

<script>
    import Form from '~/components/ads/Form'
    export default {
        name: "UpdateAd",
        components:{
          Form
        },
        async mounted(){
        },
        data(){
          return {
          }
        },
        computed:{
        },
    }
</script>

<style scoped>

</style>
