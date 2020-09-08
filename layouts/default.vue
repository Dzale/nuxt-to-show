<template>
    <div class="fullscreen">
        <!--loader-->
        <div class="loader-wrap" id="loader" >
            <div class="pin"></div>
            <div class="pulse"></div>
        </div>
        <!--loader end-->
        <div id="main" >
            <Header />
            <div class="wrapper">
                <div class="content">
                    <nuxt />
                </div>
            </div>
            <Footer />
            <SignupModal/>
            <a class="to-top circle" ><i class="fa fa-arrow-up"></i></a>
        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Header from '~/components/header/CustomHeader'
  import Footer from '~/components/footer/CustomFooter'
  import SignupModal from '~/components/modals/signup/Signup'

  export default {
    name: "default",
    components:{
      Header,
      Footer,
      SignupModal,
    },
    data(){
      return {
        modal: false
      }
    },
    mounted(){

    },
    computed:{
      ...mapState(['fetchLoading']),
    }
  }
</script>
<style scoped>
  .circle{
    border-radius: 100%
  }
  .always-show{
    opacity: 1;
  }
  .hide{
    display: none;
  }
</style>
