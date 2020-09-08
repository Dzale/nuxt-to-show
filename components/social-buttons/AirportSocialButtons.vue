<template>
    <List :list="list"></List>
</template>

<script>
    import List from './List'
    export default {
        name: "AirportSocialButtons",
        components:{
            List
        },
        data(){
            return {
                list:[
                    {href: '#', icon: 'fa-twitter'},
                    {href: '#', icon: 'fa fa-linkedin'},
                    {href: '#', icon: 'fa-instagram'},
                ]
            }
        },
    }
</script>

<style scoped>

</style>