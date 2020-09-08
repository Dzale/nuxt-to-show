<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <SocialButton :href="item.href" :icon="item.icon"/>
    </li>
  </ul>
    
</template>

<script>
  import SocialButton from './Item'
    export default {
        name: "list",
        props:{
          list:{
            type: Array,
            required: true
          }
        },
        components:{
          SocialButton
        },
    }
</script>

<style scoped>
  .footer-social li{
    float: left;
    margin-left: 10px;
  }
</style>
