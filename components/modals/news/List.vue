<template>
  <ul>
    <NewsItem  v-for="(item, index) in list" :key="index" :src="item.src" :href="item.href" :title="item.title" :date="item.date" />
  </ul>
</template>

<script>
    import NewsItem from './Item'
    export default {
        name: "list",
      components:{
        NewsItem
      },
      data(){
        return {
          list:[
            {src:'images/all/1.jpg', href: '#', title: 'Title1', date: '7 Mar 16.42'},
            {src:'images/all/1.jpg', href: '#', title: 'Title2', date: '8 Mar 16.42'},
            {src:'images/all/1.jpg', href: '#', title: 'Title3', date: '9 Mar 16.42'},
          ]
        }
      },
    }
</script>

<style scoped>

</style>
