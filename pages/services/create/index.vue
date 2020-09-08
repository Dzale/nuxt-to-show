<template>
    <Form/>
</template>

<script>
    import Form from '~/components/ads/Form'
    export default {
        name: "CreateAd",
        components:{
          Form
        },
        head() {
            return {
                title: this.$t('meta.service.create_title'),
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('meta.service.create_desc') },
                ]
            }
        },
    }
</script>

<style scoped>

</style>
