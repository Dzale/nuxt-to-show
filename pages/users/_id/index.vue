<template>
    <div>
        <FirstSection img="/images/all/profil.jpg" />
        <section v-if="user" id="avatar-section">
            <div class="hidden-xs avatar avatar-left">
                <div class="user-profile-avatar" v-if="user && user.avatar"><img :src="imgPath(user.avatar.url)" alt=""></div>
                <div class="user-profile-avatar" v-else><img src="/images/avatar/user.png" alt=""></div>
                <div class="user-profile-name"><span>{{user.username}}</span></div>
            </div>
            <div class="visible-xs avatar">
                <div class="user-profile-avatar" v-if="user && user.avatar"><img :src="imgPath(user.avatar.url)" alt=""></div>
                <div class="user-profile-avatar" v-else><img src="/images/avatar/user.png" alt=""></div>
                <div class="user-profile-name hidden-xs"><span>{{user.username}}</span></div>
            </div>
<!--            <div class="row" style="height: 60px; background-color: white">
                <ul>
                    <li><a class="primary-red-text">{{$t('pages.users.user.basic-info.item1')}} : <span class="basic-info-text">{{ user && user.firstFlightDate ? parseDateL(user.firstFlightDate) : '-'}}</span></a></li>
                    &lt;!&ndash;<li><a class="primary-red-text">{{$t('pages.users.user.basic-info.item2')}} : <span class="basic-info-text">{{ user && user.favoritePlane ? user.favoritePlane : '-'}}</span></a></li>&ndash;&gt;
                    <li><a class="primary-red-text">{{$t('pages.users.user.basic-info.item3')}} : <span class="basic-info-text">{{ user && user.pilotLicenceType ? user.pilotLicenceType : '-'}}</span></a></li>
                </ul>
            </div>-->
        </section>
        <section v-if="user" class="hidden-xs" id="sec2-profile"  style="padding: 0">
            <div class="basic-info-container">
                <div class="container">
                    <nav class="scroll-nav scroll-init" style="margin-left: 200px;">
                        <ul>
                            <li><a class="primary-red-text">{{$t('pages.users.user.basic-info.item1')}} : <span class="basic-info-text">{{ user && user.aeroclub ? user.aeroclub.name : '-'}}</span></a></li>
                            <li><a class="primary-red-text fw900">{{$t('pages.users.user.basic-info.item2')}} : <span class="basic-info-text">{{ user && user.favoritePlane ? user.favoritePlane : '-'}}</span></a></li>
                            <li><a class="primary-red-text">{{$t('pages.users.user.basic-info.item3')}} : <span class="basic-info-text">{{ user && user.pilotLicenceType ? user.pilotLicenceType : '-'}}</span></a></li>
                            <li><a class="primary-red-text">{{$t('pages.users.user.basic-info.item4')}} : <span class="basic-info-text">{{ user && user.flightHoursCount ? user.flightHoursCount : '-'}}</span></a></li>
                        </ul>
                    </nav>
<!--                    <a v-if="allowEdit" href="javascript:{}" class="unregister-btn primary-red">{{$t('pages.users.user.basic-info.unregister')}}</a>-->
                </div>
            </div>
        </section>
                <!-- Other user profile view -->
        <section v-if="!allowEdit" id="sec3-profile"  class="edit-panel">
            <div class="container">
                <div class="row" v-if="user">
                    <div class="col-md-7">
                        <div class="visible-xs list-single-main-item fl-wrap" id="sec4-profile">
                            <div class="list-single-main-item-title fl-wrap align-left">
                                <div class="list-single-main-item-title fl-wrap">
                                    <h3>{{user.username}}</h3>
                                </div>
                                <div class="row m10">
                                    <a class="primary-red-text fw900">{{$t('pages.users.user.basic-info.item1')}} : <span class="basic-info-text">{{ user && user.aeroclub ? user.aeroclub.name : '-'}}</span></a>
                                </div>
                                <div class="row m10">
                                    <a class="primary-red-text fw900">{{$t('pages.users.user.basic-info.item2')}} : <span class="basic-info-text">{{ user && user.favoritePlane ? user.favoritePlane : '-'}}</span></a>
                                </div>
                                <div class="row m10">
                                    <a class="primary-red-text fw900">{{$t('pages.users.user.basic-info.item3')}} : <span class="basic-info-text">{{ user && user.pilotLicenceType ? user.pilotLicenceType : '-'}}</span></a>
                                </div>
                                <div class="row m10">
                                    <a class="primary-red-text fw900">{{$t('pages.users.user.basic-info.item4')}} : <span class="basic-info-text">{{ user && user.FlightHoursCount ? FlightHoursCount : '-'}}</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="list-single-main-item fl-wrap" id="sec8-profile">
                            <div class="list-single-main-item-title fl-wrap">
                                <h3>{{$t('pages.users.user.presentation')}}</h3>
                            </div>
                            <p v-if="user">{{ user.bio}}</p>

                        </div>
                    </div>
                    <Reviews v-if="user && reviews && reviews !== undefined && reviews.length > 0" :items="reviews"/>
                </div>
            </div>
        </section>

        <!-- User profile edition -->
        <section v-if="!editMode && allowEdit" id="sec3"  class="edit-panel">
            <div class="container">
                <div class="row" v-if="user">
                    <div class="col-md-8">
                        <div class="visible-xs list-single-main-item fl-wrap" id="sec6">
                            <div class="list-single-main-item-title fl-wrap align-left">
                                <div class="list-single-main-item-title fl-wrap">
                                    <a class="visible-xs" v-if="user && allowEdit" href="javascript:{}" style="float: right;" @click="editMode = true">
                                        <i class="fa fa-pencil" ></i>
                                    </a>
                                    <h3>{{user.username}}</h3>
                                </div>
                                <!-- <div class="row m10">
                                    <a class="primary-red-text fw900">{{$t('pages.users.user.basic-info.item1')}} : <span class="basic-info-text">{{ user && user.firstFlightDate ? parseDateL(user.firstFlightDate) : '-'}}</span></a>
                                </div> -->
                                <div class="row m10">
                                    <a class="primary-red-text fw900">{{$t('pages.users.user.basic-info.item2')}} : <span class="basic-info-text">{{ user && user.favoritePlane ? user.favoritePlane : '-'}}</span></a>
                                </div>
                                <div class="row m10">
                                    <a class="primary-red-text fw900">{{$t('pages.users.user.basic-info.item3')}} : <span class="basic-info-text">{{ user && user.pilotLicenceType ? user.pilotLicenceType : '-'}}</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="list-single-main-item fl-wrap" id="sec8">
                            <div class="list-single-main-item-title fl-wrap">
                                <h3>{{$t('pages.users.user.presentation')}}
                                    <a class="hidden-xs" v-if="me && allowEdit" href="javascript:{}" style="float: right;" @click="editMode = true">
                                        <i class="fa fa-pencil" ></i>
                                    </a>
                                </h3>
                            </div>
                            <div class="row align-left m10" >
                                <div class="col-xs-6">
                                    <span class="primary-red-text fw900"> {{$t('pages.users.user.firstname')}} : </span>
                                    {{ userUpdate.firstname}}
                                </div>
                                <div class="col-xs-6">
                                    <span class="primary-red-text fw900"> {{$t('pages.users.user.lastname')}} : </span>
                                    {{ userUpdate.lastname}}
                                </div>
                            </div>
                            <div class="row align-left m10" >
                                <!-- <div class="col-xs-6">
                                    <span class="primary-red-text fw900"> {{$t('pages.users.user.gender')}} : </span>
                                    {{ user.gender}}
                                </div> -->
                                <div class="col-xs-6">
                                    <span class="primary-red-text fw900"> {{$t('pages.users.user.dob')}} : </span>
                                    {{parseDateL(user.dob, true)}}
                                </div>
                            </div>
                            <div class="row align-left m10" >
                                <div class="col-xs-6">
                                    <span class="primary-red-text fw900"> {{$t('pages.users.user.favorite-plane')}} : </span>
                                    {{ user.favoritePlane}}
                                </div>
                            </div>
                            <div class="row align-left m10" >
                                <div class="col-xs-6">
                                    <span class="primary-red-text fw900"> {{$t('pages.users.user.flight-hours-count')}} : </span>
                                    {{ user.flightHoursCount}}
                                </div>
                            </div>
                            <!--<p v-if="user">{{ user.bio}}</p>-->

                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="list-single-main-item fl-wrap" id="sec7">
                            <div class="list-single-main-item-title fl-wrap">
                                <h3>{{$t('pages.users.user.bio')}} </h3>
                            </div>
                            <p v-if="user">{{ user.bio}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Profile edition -->
        <section v-if="editMode && allowEdit" id="sec3-1"  class="edit-panel">
            <div class="container">
                <div class="row" v-if="user">
                    <div class="col-md-8">
                        <div class="list-single-main-item fl-wrap" style="text-align: left;" id="sec9">
                            <CustomTitle title="pages.users.user.edit-mode.basic-info" />
                            <EditRow>
                                <nuxt-input slot="first" type="text" name="firstname" v-model="userUpdate.firstname" v-validate="'required'" :error="errors.first('firstname')" label="pages.users.user.firstname"/>
                                <nuxt-input slot="second"  type="text" name="lastname" v-model="userUpdate.lastname" v-validate="'required'" :error="errors.first('lastname')" label="pages.users.user.lastname"/>
                            </EditRow>
                            <EditRow>
                                <!-- <template slot="first">
                                    <label>{{$t('pages.users.user.gender')}}</label>
                                    <NuxtMultiselect v-model="userUpdate.gender" :options="genderOptions"/>
                                </template> -->
                                <template slot="first">
                                    <label>{{$t('pages.users.user.dob')}}</label>
                                    <date-picker slot="second" v-model="userUpdate.dob" lang="fr" type="date" style="width: 100%;" :format="DATE_FORMAT"></date-picker>
                                </template>
                            </EditRow>

                            <CustomTitle title="pages.users.user.edit-mode.career" style="padding-top:20px" />

                            <EditRow>
                                <nuxt-input slot="first" type="text" name="favoritePlane" v-model="userUpdate.favoritePlane" v-validate="'required'" :error="errors.first('favoritePlane')" label="pages.users.user.favorite-plane"/>
                                <nuxt-input slot="second" type="text" name="pilotLicenceType" v-model="userUpdate.pilotLicenceType" v-validate="'required'" :error="errors.first('pilotLicenceType')" label="pages.users.user.pilot-licence-type"/>
                            </EditRow>
                            <EditRow>
                                <!-- <template slot="first">
                                    <label>{{$t('pages.users.user.first-flight-date')}}</label>
                                    <date-picker slot="first" v-model="userUpdate.firstFlightDate" lang="fr" type="date" style="width: 100%;" :format="DATE_FORMAT"></date-picker>
                                </template> -->
                                <template slot="first">
                                    <label>{{$t('pages.users.user.basic-info.item1')}}</label>
                                    <no-ssr>
                                    <NuxtMultiselect
                                            :multiple="false"
                                            v-if="aeroclubs"
                                            v-model="selectedAeroclub"
                                            :options="aeroclubs"
                                            track-by="name"
                                            label="name"
                                            name="aeroclub" />
                                 </no-ssr>
                                </template>
                                <template slot="second">
                                    <label>{{$t('pages.users.user.flight-hours-count')}}</label>
                                    <NuxtMultiselect v-model="userUpdate.flightHoursCount" :options="pilotFlightHoursOptions" track-by="name" label="name"/>
                                </template>
                                <!--<nuxt-input slot="second" type="number" name="flightHoursCount" v-model="userUpdate.flightHoursCount" v-validate="'required|numeric'" :error="errors.first('flightHoursCount')" label="pages.users.user.flight-hours-count"/>-->
                            </EditRow>
                            <div class="row">
                                <div class="col-md-12">
                                    <nuxt-textarea name="bio" v-model="userUpdate.bio" v-validate="'required'" :error="errors.first('bio')" label="pages.users.user.bio"/>
                                </div>
                            </div>
                            <loading-button btnClass="unregister-btn primary-red no-border m10"  @click="cancel" text="pages.users.user.btn.cancel"/>
                            <loading-button btnClass="unregister-btn primary-red no-border m10" @click="checkUpdate" :disabled="updateLoading" text="pages.users.user.btn.edit" :loading="updateLoading"/>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="list-single-main-item fl-wrap" id="img-upload">
                            <div class="row">
                                <VueAvatar
                                        v-if="user"
                                        ref="avatar"
                                        :id="user._id"
                                        :image="user.avatar ? imgPath(user.avatar.url) : '/images/avatar/user.png'"
                                >
                                </VueAvatar>
                            </div>
                            <div class="row">
                                <a href="javascript:{}" @click="openAvatarDialog">
                                    <span class="icon">
                                      <i class="fa fa-camera"></i>
                                    </span>
                                    <span>{{$t('common.choose_photo')}}</span>
                                </a>
                            </div>
                            <div class="row mt18">
                                <loading-button btnClass="round-btn primary-red no-border" icon="fa fa-upload" @click="prepareAvatarUpload" :disabled="updateLoading" text="pages.users.user.btn.upload-avatar" :loading="uploadLoading"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="sec4" v-if="user && user.wishList && user.wishList.length > 0">
            <div class="row sp50">
                <div class="col-md-12">
                    <CustomTitle title="pages.users.user.favorite-list-title" />
                </div>
                <div class="col-md-12">
                    <AirportCarousel v-if="user && user.wishList" :items="user.wishList" :close="allowEdit" @close="(item) => prepareToggleAirport(userAirport.WISHLIST, item)" :hideIcons="true"/>
                </div>
            </div>
        </section>

        <section id="sec5" v-if="user && user.favoriteList  && user.favoriteList.length > 0">
            <div class="row sp50">
                <div class="col-md-12">
                    <CustomTitle title="pages.users.user.wish-list-title" />
                </div>
                <div class="col-md-12">
                    <AirportCarousel v-if="user && user.favoriteList" :items="user.favoriteList" :close="allowEdit" @close="(item) => prepareToggleAirport(userAirport.FAVORITE, item)" :hideIcons="true"/>
                </div>
            </div>
        </section>
    </div>

</template>


<script>
    import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
    import EditRow from '~/components/user/EditRow'
    import Reviews from '~/components/user/Reviews'
    export default {
        name: "index",
        middleware: 'authenticated',
        components:{
            EditRow,
            Reviews
        },
        head() {
/*            console.log('1. Head ', userS ? 'true' : 'flase');*/
            return this.userS ? {
                title: this.$t('meta.user.title', { user: this.userS.username }),
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('meta.user.desc', { user: this.userS.username }) },
                ]
            } : null;
        },
        async asyncData({ app, params, store, seo }){
            let userS = await store.dispatch('user/find', params.id);
            return {
                userS,
            }
        },
        data(){
            return {
                editMode: false,
                allowEdit: false,
                selectedAeroclub: null,
                userUpdate: {
                    "id": '',
                    "_id": '',
                    "username": '',
                    "email": '',
                    "firstname": '',
                    "lastname": '',
                    "gender": "male",
                    "dob": '',
                    "bio": '',
                    "address": '',
                    "favoritePlane": '',
                    "pilotLicenceType": '',
                    "firstFlightDate": '',
                    "flightHoursCount": 0,
                    "aeroclub": null,
                },
                reviews: null,
/*                selectedUser: null,*/
                genderOptions:[
                    this.$t('pages.users.user.gender-options.male'),
                    this.$t('pages.users.user.gender-options.female'),
                    this.$t('pages.users.user.gender-options.other'),
                ]
            }
        },
        async mounted(){
            this.userUpdate.flightHoursCount = this.pilotFlightHoursOptions[0];
            if(this.$route.params.id === 'me'){
                this.allowEdit = true;
            }
            await this.findAeroclubs();
            //await this.find(this.$route.params.id);
            let self = this;
            if(this.user){
                Object.keys(this.userUpdate).forEach(function (key) {
                    if (key == 'flightHoursCount') {
                        self.userUpdate[key] = self.user[key] != undefined ? self.pilotFlightHoursOptions.find(item => item.value === self.user[key]) : self.pilotFlightHoursOptions[0];
                    } else if (key == 'aeroclub') {
                        self.userUpdate[key] = self.user[key] != undefined ? self.user[key] : null;
                        self.selectedAeroclub = self.user[key] != undefined ? self.user[key] : null;
                    } else {
                        self.userUpdate[key] = self.user[key] != undefined ? self.user[key] : '';
                    }
                });
                this.reviews = await this.fetchReviews(this.user);
            }else{
                this.$router.push({path:'/'});
            }
            fadeOutLoader();

        },
        computed:{
            ...mapState({
                'me'                : state => state.user.me,
                'selectedUser'      : state => state.user.selectedUser,
                'updateLoading'     : state => state.updateLoading,
                'uploadLoading'     : state => state.uploadLoading,
                'aeroclubs'         : state => state.aeroclub.aeroclubs
            }),
            ...mapGetters([]),
            user(){
                return this.userS;
                return this.allowEdit ? this.me : this.userS;
            },
            pilotFlightHoursOptions(){
                return [
                    {
                        name: this.$t('pages.users.user.flightHours.item1'),
                        value: this.pilotFlightHours.item1,
                    },
                    {
                        name: this.$t('pages.users.user.flightHours.item2'),
                        value: this.pilotFlightHours.item2,
                    },
                    {
                        name: this.$t('pages.users.user.flightHours.item3'),
                        value: this.pilotFlightHours.item3,
                    },
                    {
                        name: this.$t('pages.users.user.flightHours.item4'),
                        value: this.pilotFlightHours.item4,
                    },                    {
                        name: this.$t('pages.users.user.flightHours.item5'),
                        value: this.pilotFlightHours.item5,
                    },
                    {
                        name: this.$t('pages.users.user.flightHours.item6'),
                        value: this.pilotFlightHours.item6,
                    },

                ];
            }
        },
        methods: {
            ...mapActions({
                find: 'user/find',
                update: 'user/update',
                uploadAvatar: 'user/uploadAvatar',
                toggleAirport: 'user/toggleAirport',
                findAeroclubs: 'aeroclub/all',
                fetchReviews: 'user/reviews',
            }),
            ...mapMutations([]),
            async checkUpdate(){
                if(await this.validateFields(['firstname', 'lastname', 'bio'])){
                    let data = {...this.userUpdate};
                    data.flightHoursCount = this.userUpdate.flightHoursCount.value;
                    data.aeroclub = this.selectedAeroclub ? this.selectedAeroclub.id : null;
                    await this.update(data);
                    this.editMode = false;
                }
            },
            openAvatarDialog(){
                this.$refs.avatar.clicked();
            },

            prepareAvatarUpload(){
                let data = { ...this.user };
                if(this.$refs.avatar.imageChanged()) {
                    data.files = this.$refs.avatar.getImage();
                }
                this.uploadAvatar(data);
            },
            async prepareToggleAirport(path, item){
                let data = {
                    _id     : item._id,
                    path    : path,
                    action  : this.arrayAction.REMOVE
                };
                await this.toggleAirport(data);
            },
            cancel(){
                this.editMode = false;
            }
        }
    }
</script>

<style scoped>
    .avatar {
        float: left;
        width: 100%;
        position: relative;
        z-index: 10;
        top: -175px;
    }
    .avatar-left{
        left: 8%;
        width: 92%;
        text-align: left;
    }
    #avatar-section{
        padding: 0;
        height: 0;
        z-index: 2;
        display: block;
        overflow: inherit;
    }
    .user-profile-avatar {
        box-shadow: none;
        width: 200px;
        height: 200px;
    }
    .user-profile-name {
        box-shadow: none;
        overflow: hidden;
        display: inline-block;
        margin: 25px 0 15px;
        height: 200px;
        color: #fff;
        font-size: 40px;
        font-weight: 900;
        padding: 73px;
    }
    .user-profile-avatar img {
        width: 200px;
        height: 200px;
    }

    .basic-info-container {
        border-bottom: 1px solid #aaa;
    }

    .basic-info-container {
        background:#fff;
        border-bottom:1px solid #eee;
    }
    .basic-info-container .scroll-nav li {
        float:left;
        position:relative;
    }
    .basic-info-container .scroll-nav.inline-scroll-container li {
        display:inline-block;
        float:none;
        padding-bottom:0;
        margin-bottom:0;
    }

    .basic-info-container .scroll-nav li a {
        padding:23px 30px;
        float:left;
        position:relative;
        font-weight:700;
        color:#888DA0;
        font-size:13px;
    }

    .basic-info-container .save-btn {
        float:right;
        position:relative;
        color: #878C9F;
        border-radius:6px;
        top:20px;
        padding:5px 15px;
        font-size:13px;
        font-weight:500;
        border-left:1px solid #eee;
        border-right:1px solid #eee;
    }
    .basic-info-container .save-btn i {
        padding-right:10px;
    }

    .basic-info-text{
        color: #2F3B59;
        font-weight: 500;
    }
    .unregister-btn{
        float: right;
        padding: 13px 32px;
        position: relative;
        border-radius: 30px;
        color: #fff;
        top:10px;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 11px;
    }
    .fw900{
        font-weight: 900;
    }
    .m10{
        margin: 10px;
    }

    .mt18{
        margin-top: 18px;
    }
    .m10{
        margin: 10px;
    }
    #sec3-1{
        z-index: 3;
    }
    .edit-panel{
        padding: 40px 0;
        overflow: inherit;
    }


</style>