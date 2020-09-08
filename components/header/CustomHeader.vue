<template>
    <header class="main-header dark-header fs-header sticky">
        <div class="header-inner">
            <div class="logo-holder">
                <nuxt-link to="/" ><img src="/images/Logo_Forflyaway.svg" alt=""></nuxt-link>
            </div>
            <!-- nav-button-wrap-->
            <div class="nav-button-wrap color-bg" @click="setBurger(!burger)">
                <div class="nav-button">
                    <span></span><span></span><span></span>
                </div>
            </div>
            <a href="javascript:{}" v-if="!me"  @click="setShowSignUpModal(true)" class="add-list primary-red auth-btn">{{$t('common.sign_in')}}</a>
            <a href="/" v-if="me" @click="logoutL" class="add-list primary-red auth-btn">{{$t('header.logout')}}</a>

            <div class="mob-menu"  :class="{'opacity1' :burger}">
                <nav  v-if="burger">
                    <div >
                        <ul>
                            <li>
                                <nuxt-link to="/" >{{$t('header.homepage')}}</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/contact">{{$t('header.contact')}}</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/annonceurs">{{$t('header.announcers')}}</nuxt-link>
                            </li>
                            <li v-if="me">
                                <nuxt-link to="/users/me" >{{$t('header.profile')}}</nuxt-link>
                            </li >
                            <li v-if="!me" @click="login"  >
                                <nuxt-link to="#" class="last-li">{{$t('common.sign_in')}}</nuxt-link>
                            </li>
                            <li v-else @click="logoutL">
                                <nuxt-link to="/" class="last-li">{{$t('header.logout')}}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="navbar-wrapper hidden-xs"><!--nav-holder main-menu-->
                <nav class="navbar">
                    <ul>
                        <li>
                            <nuxt-link to="/" >{{$t('header.homepage')}}</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/contact">{{$t('header.contact')}}</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/annonceurs">{{$t('header.announcers')}}</nuxt-link>
                        </li>
                        <li v-if="me" class="add-list-li">
                            <nuxt-link to="/users/me">{{$t('header.profile')}}</nuxt-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    </header>
</template>

<script>
  import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
    export default {
        name: "custom-header",
        data(){
            return{

            }
        },
        computed: {
            ...mapState({
                'me': state => state.user.me,
                'burger': state => state.burger,
                'showSignUpModal': state => state.showSignUpModal
            }),
            ...mapGetters({
                'username': "user/username",
            }),
        },
        mounted(){
        },
        methods: {
            ...mapActions({
                'logout': 'auth/logout'
            }),
            ...mapMutations(['setShowSignUpModal', 'setBurger']),
            login(){
                this.setShowSignUpModal(true);
                this.setBurger(false);
            },
            logoutL(){
                this.setBurger(false);
                this.logout();
                this.$router.push({path:'/'});

            }

        },
        watch: {
/*            'showSignUpModal': function(val) {
                console.log("CHANGED", val);
                if(this.$route.query !== {} && this.$route.query.code){
                    //this.$refs.auth.click();
                    this.setShowSignUpModal(val)
                }
            },*/
        },
    }
</script>

<style scoped>
    .header-user-menu:after {
        content: '';
        position: absolute;
        left: -70px;
        height: 30px;
        top: 4px;
        width: 1px;
        background: rgba(255,255,255,0.21);
    }
    .auth-btn{
        margin-right: 10px;
        margin-top: 3px;
    }
    .navbar-wrapper{
        margin-right: 30px;
    }
    .navbar{
        float: right;
        padding: 18px;
        line-height: 20px;
    }
    .navbar li{
        float: left;
        margin-right: 15px;
    }
    .navbar li a{
        float: left;
        padding: 10px;
        font-size: 13px;
        font-style: normal;
        font-weight: 800;
        text-transform: none;
        line-height: 25px;
        letter-spacing: 0px;
        transition: all 100ms linear;
        color: #fff;
    }
    .mob-menu{
        display: none;
        position: absolute;
        top: 80px;
        right: -20px;
        width: 300px;
        z-index: 50;
        padding: 15px 10px;
        background: #fff;
        border-bottom-left-radius: 6px;
        border-left: 1px solid #eee;
        border-bottom: 1px solid #eee;
        opacity: 0;
        transition: all .4s ease-in-out;
    }
    .opacity1{
        opacity:1;
    }
    .mob-menu li{

        margin: 0;
        float: left;
        width: 100%;
        position: relative;
        overflow: hidden;
        padding: 0 20px;
    }
    .mob-menu li a{
        float: left;
        width: 100%;
        padding: 8px 5px;
        font-weight: 700;
        font-size: 14px;
        color: #566985;
        line-height: 20px;
        text-align: left;
    }
    .mob-menu li a:hover{
        color:#ec616e;
    }
    .last-li{
        border-top: 1px solid #aeaeae;
    }
</style>
