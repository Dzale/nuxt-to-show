<template>
    <List :list="list"></List>
</template>

<script>
    import List from './List'
    export default {
        name: "FooterSocialButtons",
        components:{
            List
        },
        data(){
            return {
                list:[
                    {href: 'https://instagram.com/forflyaway', icon: 'fa fa-instagram'},
                    {href: 'https://www.linkedin.com/company/forflyaway', icon: 'fa fa-linkedin'},
                    {href: 'https://twitter.com/forflyaway_fr', icon: 'fa-twitter'},
                    {href: 'https://www.facebook.com/forflyaway', icon: 'fa-facebook-official'}
                ]
            }
        },
    }
</script>

<style scoped>

</style>