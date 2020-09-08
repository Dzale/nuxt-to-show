<template>
  <li class="clearfix">
    <a href="javascript:{}"  class="widget-posts-img"><img src="/images/all/1.jpg" class="respimg" alt=""></a>
    <div class="widget-posts-descr">
      <a :href="href" title="">{{title}}</a>
      <span class="widget-posts-date"> {{date}} </span>
    </div>
  </li>
</template>

<script>
    export default {
        name: "item",
        props:{
          src:{
            type: String,
            required: false,
            default: 'images/all/1.jpg'
          },
          href:{
            type: String,
            required: false,
            default: '#'
          },
          title:{
            type: String,
            required: false,
            default: 'Title'
          },
          date:{
            type: String,
            required: false,
            default: '7 Mar 16.42 '
          },
        }
    }
</script>

<style scoped>

</style>
