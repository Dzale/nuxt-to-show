<template>
  <div class="wrapper">
    <div class="content">
      <FirstSection img="images/all/1.jpg" :search="true" :bubble="true" :errorPage="true"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "error",
      mounted(){
        fadeOutLoader();
      }
    }
</script>

<style scoped>

</style>
