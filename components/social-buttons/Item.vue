<template>
  <a :href="href" target="_blank" class="social-button primary-red"><i class="fa" :class="icon"></i></a>
</template>

<script>
    export default {
        name: "item",
        props:{
          href:{
            type: String,
            required: false,
            default: '#'
          },
          icon:{
            type: String,
            required: false,
            default: 'fa-linkedin'
          },
        }
    }
</script>

<style scoped>
  .social-button{
    border: none;
    border-radius: 4px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    margin: 0 auto;
    padding: 0;
  }
</style>
