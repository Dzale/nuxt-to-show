<template>
  <!--register form -->
  <div class="main-register-wrap modal" style="display: block" v-show="computedModal">
    {{computedModal}}
    <div class="main-overlay"></div>
    <div class="main-register-holder">
      <div class="main-register fl-wrap">
        <div class="close-reg" @click="close"><i class="fa fa-times"></i></div>
        <h3> {{ title }} <span><strong>{{appName}}</strong></span></h3>
        <div id="tabs-container">
          <ul  v-if="modalState === signUpModalStates.AUTH" class="tabs-menu">
            <li :class="{'current' : activeTab === 1}" @click="activeTab=1"><a href="javascript:{}">{{$t('modals.auth.login')}}</a></li>
            <li :class="{'current' : activeTab === 2}" @click="activeTab=2"><a href="javascript:{}">{{$t('modals.auth.register')}}</a></li>
          </ul>
          <div v-if=" modalState === signUpModalStates.AUTH"  class="tab">
            <div :class="{'tab-content' : activeTab !== 1}">
              <div class="custom-form">
                <nuxt-input type="text" name="login_username" v-model="loginData.username" v-validate="'required'" :error="errors.first('login_username')" label="modals.auth.login_username" />
                <nuxt-input type="password" name="login_password" v-model="loginData.password" v-validate="'required'" :error="errors.first('login_password')" label="modals.auth.login_password"/>
                <loading-button btnClass="log-submit-btn" @click="checkLogin" :disabled="loginLoading" text="modals.auth.login_btn" :loading="loginLoading"/>
                <div class="clearfix"></div>
                <div class="lost_password">
                  <a href="javascript:{}" @click="modalState=signUpModalStates.FORGOT_PASSWORD">{{$t('modals.auth.lost_password')}}</a>
                </div>
              </div>
            </div>
            <div :class="{'tab-content' : activeTab !== 2}">

                <div class="custom-form">
                  <div  class="main-register-form">
                    <nuxt-input type="text" name="username" v-model="registerData.username" v-validate="'required'" :error="errors.first('username')" label="modals.auth.register_username" />
                    <nuxt-input type="text" name="email" v-model="registerData.email" v-validate="'required|email'" :error="errors.first('email')" label="modals.auth.register_email"/>
                    <nuxt-input ref="password" type="password" name="password" v-model="registerData.password" v-validate="'required'" :error="errors.first('password')" label="modals.auth.register_password"/>
                    <nuxt-input type="password" name="password_confirmation" v-model="registerData.password_confirmation" v-validate="'required|confirmed:password'" :error="errors.first('password_confirmation')" label="modals.auth.register_confirmation_password"/>
                    <div class="filter-tags">
                      <input id="check-a" type="checkbox" name="check">
                      <label for="check-a">{{$t('modals.auth.privacy')}}</label>
                    </div>
                    <div class="clearfix"></div>
                    <loading-button btnClass="log-submit-btn" @click="checkRegister" :disabled="registerLoading" text="modals.auth.register_btn" :loading="registerLoading"/>
                    <div class="clearfix"></div>
                    <div class="lost_password">
                      <a href="javascript:{}" @click="modalState=signUpModalStates.FORGOT_PASSWORD">{{$t('modals.auth.lost_password')}}</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div v-if=" modalState === signUpModalStates.FORGOT_PASSWORD">
            <div class="custom-form">
              <nuxt-input type="text" name="forgot_email" v-model="forgotData.email" v-validate="'required|email'" :error="errors.first('forgot_email')" label="modals.auth.forgot_email"/>
              <div class="clearfix"></div>
              <loading-button btnClass="log-submit-btn" @click="checkForgot" :disabled="forgotLoading" text="modals.auth.forgot_btn" :loading="forgotLoading"/>
              <div class="lost_password">
                <a href="javascript:{}" @click="modalState=signUpModalStates.AUTH, activeTab=1">{{$t('modals.auth.sign_in')}}</a>
              </div>
            </div>
          </div>
            <div v-if=" modalState === signUpModalStates.RESET_PASSWORD">
                <div class="custom-form">
                    <nuxt-input type="password" ref="reset_password" name="reset_password" v-model="resetData.password" v-validate="'required'" :error="errors.first('reset_password')" label="modals.auth.reset_password"/>
                    <nuxt-input type="password" name="reset_password_confirmation" v-model="resetData.passwordConfirmation" v-validate="'required|confirmed:reset_password'" :error="errors.first('reset_password_confirmation')" label="modals.auth.reset_password_confirmation"/>
                    <div class="clearfix"></div>
                    <loading-button btnClass="log-submit-btn" @click="checkReset" :disabled="resetLoading" :text="$t('modals.auth.reset_btn')" :loading="resetLoading"/>
                    <div class="lost_password">
                        <a href="javascript:{}" @click="modalState=signUpModalStates.AUTH, activeTab=1">{{$t('modals.auth.sign_in')}}</a>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  </div>
  <!--register form end -->
</template>

<script>
  import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
  export default {
    name: "signup",
    data(){
      return {
        activeTab:1,
        code: false,
        registerData:{
          username:'',
          email:'',
          password:'',
          password_confirmation:''
        },
        loginData:{
          username:'',
          password:''
        },
        forgotData:{
          email:'',
          url: process.env.publicUrl ? process.env.publicUrl : 'https://forflyaway.com'
        },
        resetData:{
          code: '',
          password: '',
          passwordConfirmation: '',
        },
        modalState: '',
        open:false,
      }
    },
    mounted(){
        this.modalState = this.signUpModalStates.AUTH;
        this.$nextTick(() => {
          if(this.$route.query !== {} && this.$route.query.code){
            this.resetData.code = this.$route.query.code;
            this.modalState = this.signUpModalStates.RESET_PASSWORD;
            this.code = true;
          }
        });
    },
    computed:{
        ...mapState({
          showSignUpModal : state => state.showSignUpModal,
          loginLoading : state => state.loginLoading,
          registerLoading : state => state.registerLoading,
          forgotLoading : state => state.forgotLoading,
          resetLoading : state => state.resetLoading,
        }),
        ...mapGetters(['title']),
        appName(){
            return process.env.APP_NAME;
        },
        title(){
            return this.modalState === this.signUpModalStates.FORGOT_PASSWORD ? this.$t('modals.auth.forgot_pass_title') :
                (this.modalState === this.signUpModalStates.AUTH ?
                (this.activeTab !== 2 ? this.$t('modals.auth.sign_in_title') : this.$t('modals.auth.sign_up_title')) :
                this.$t('modals.auth.reset_pass_title'));
        },
        computedModal(){
          return this.code || this.showSignUpModal;
        },
    },
    methods: {
      ...mapActions({
          login         : 'auth/login',
          register      : 'auth/register',
          logout        : 'auth/logout',
          forgot        : 'auth/forgot',
          reset         : 'auth/reset',
      }),
        ...mapMutations({
          'setShowSignUpModal' : 'setShowSignUpModal'
        }),
        close(){
          this.setShowSignUpModal(false);
          this.code = false;
        },
        async checkLogin(){
            if(await this.validateFields(['login_username', 'login_password'])){
              let response = await this.login(this.loginData);
              if(response){
                this.code = false;
                this.$router.replace({ path: this.$route.path});
              }
            }
        },
        async checkRegister(){
            if(await this.validateFields(['username', 'email', 'password', 'password_confirmation'])){
              this.register(this.registerData);
            }
        },
        async checkForgot(){
            if(await this.validateFields(['forgot_email'])){
              this.forgot(this.forgotData);
            }
        },
        async checkReset(){
            if(await this.validateFields(['reset_password_confirmation', 'reset_password'])){
                if(await this.reset(this.resetData)){
                    this.activeTab = 1;
                    this.modalState = this.signUpModalStates.AUTH;
                }

            }
        },
    },
    watch: {

    },

  }
</script>

<style scoped>

</style>
