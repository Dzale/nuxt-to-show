<template>
  <!--footer -->
  <footer class="main-footer dark-footer  ">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="footer-widget fl-wrap">
            <div class="footer-contacts-widget fl-wrap">
              <p>{{$t('footer.about_us_text')}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-md-offset-2">
          <div class="footer-menu">
            <ul>
              <li><nuxt-link to="/terms">{{$t('footer.legal')}}</nuxt-link></li>
              <li><nuxt-link to="/cguv">{{$t('footer.terms_conditions')}}</nuxt-link></li>
              <li><nuxt-link to="/privacy">{{$t('footer.privacy_policy')}}</nuxt-link></li>
              <li><nuxt-link to="/contact">{{$t('footer.contact')}}</nuxt-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-footer fl-wrap">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="about-widget">
              <img src="/images/Logo_Forflyaway.svg" alt="">
            </div>
          </div>
          <div class="col-md-4">
            <div class="copyright"> &#169; FORFLYAWAY {{' ' + (new Date()).getFullYear() + ' ' +$t('footer.rights_reserved')}}</div>
          </div>
          <div class="col-md-4">
            <div class="footer-social">
              <SocialButtons/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!--footer end  -->
</template>

<script>
  import SocialButtons from '~/components/social-buttons/FooterSocialButtons'
  import NewsList from '~/components/modals/news/List'
    export default {
        name: "custom-footer",
      components:{
        SocialButtons,
        NewsList,
      }
    }
</script>

<style scoped>

</style>
