<template>
    <div>
        <BadgeIcon v-for="(item, index) in computedList" :key="index" :icon="item.icon" :badge="item.badge"/>
    </div>
</template>

<script>

    export default {
        name: "IconList",
        props:{
          airport:{
              //type: Object,
              default: {}
          }
        },
        data(){
            return{

            }
        },
        computed:{
            computedList(){
                return [
                    {icon:'/images/icons/bed.svg', badge: this.airport.experiencesCount ? this.airport.experiencesCount.hotels : 0},
                    {icon:'/images/icons/cook.svg', badge: this.airport.experiencesCount ? this.airport.experiencesCount.restaurants : 0},
                    {icon:'/images/icons/picture.svg', badge: this.airport.experiencesCount ? this.airport.experiencesCount.attractions : 0},
                    {icon:'/images/icons/car.svg', badge: this.airport.experiencesCount ? this.airport.experiencesCount.transports : 0},
                ];
            }
        }
/*        */
    }
</script>

<style scoped>

</style>