<template>
      <section class="mt80">
        <div class="container">
            <div class="row">
                <div class="col-md-7 col-xs-12">
                    <div class="list-single-main-item fl-wrap" style="text-align: left;">
                        <CustomTitle title="pages.ad.basic_info" />
                        <EditRow class="mt10">
                            <nuxt-input slot="first" type="text" name="name" v-model="localAd.name" v-validate="'required'" :error="errors.first('name')" label="pages.ad.form.name"/>
                            <nuxt-input slot="second" type="number" name="airportDistance" v-model="localAd.airportDistance" v-validate="'required'" :error="errors.first('airportDistance')" label="pages.ad.form.distance"/>
                        </EditRow>
                        <EditRow class="mt10">
                            <nuxt-input slot="first" type="text" name="pricing" v-model="localAd.pricing" v-validate="'required'" :error="errors.first('pricing')" label="pages.ad.form.pricing" :placeholder="$t('pages.ad.form.pricing_placeholder')"/>
                        </EditRow>
                        <span id="helpBlock" class="help-block">{{ $t('pages.ad.form.pricing_helper') }}</span>
                        <!-- <EditRow class="mt10"> -->
                            <!--<nuxt-input slot="first" type="text" name="termsAndConditions" v-model="localAd.termsAndConditions" label="pages.ad.form.terms"/>-->
                        <!-- </EditRow> -->
                        <div class="row dropdown-section">
                            <div class="col-xs-12 mt10">
                                <label>{{$t('pages.ad.form.type')}}</label>
                                <no-ssr>
                                    <NuxtMultiselect
                                            v-model="localAd.type"
                                            :options="typeOptions"
                                            track-by="value"
                                            label="name"
                                            name="type"
                                            v-validate="'required'"
                                            :error="errors.first('type')"/>
                                </no-ssr>
                            </div>
                        </div>
                        <div class="row dropdown-section">
                            <div class="col-xs-12 mt10">
                                <label>{{$t('pages.ad.form.closest_airport')}}</label>
                                 <no-ssr>
                                    <NuxtMultiselect
                                            :multiple="false"
                                            v-if="airports"
                                            v-model="selectedAirport"
                                            :options="airports"
                                            track-by="name"
                                            label="name"
                                            name="closestAirport"
                                            v-validate="'required'"
                                            :error="errors.first('closestAirport')"/>
                                 </no-ssr>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mt10">
                                <nuxt-textarea name="excerpt" v-model="localAd.excerpt" rules="required" label="pages.ad.form.excerpt" :placeholder="$t('pages.ad.form.placeholder_excerpt')" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 mt10">
                                <label data-v-1e6012ad="">{{$t('pages.ad.form.long_desc')}}</label>
                                <no-ssr>
                                    <wysiwyg 
                                        v-model="localAd.description"
                                        name="description"
                                        v-validate="'required'"
                                        :placeholder="$t('common.wysiwyg.placeholder')"
                                        :class="{'danger-border' : errors.first('description')}"/>
                                    <div class="error" v-if="errors.first('description')">{{ fixErrorMessage(errors.first('description')) }}</div>
                                </no-ssr>
                            </div>
                        </div>
                        <div class="row dropdown-section">
                            <div class="col-xs-12 mt10">
                                <p id="helpBlock" style="margin-bottom: 0; padding-bottom: 0;" class="help-block-title">{{$t('pages.ad.form.picking_up')}}</p>
                                <div class="radio-text">
                                    <no-ssr>
                                        <toggle-button 
                                            v-model="localAd.pickingUp" 
                                            :labels="{checked: 'Oui', unchecked: 'Non'}"
                                            color="#EC606E" />
                                    </no-ssr>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mt10">
                                    <nuxt-input slot="first" type="number" min="0" 
                                    name="minParticipants" 
                                    v-model="localAd.minParticipants"
                                    v-validate="{'required' : localAd.pickingUp}"
                                    :error="errors.first('minParticipants')"
                                    label="pages.ad.form.min_participants"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mt10">
                                <nuxt-textarea
                                    name="termsAndConditions"
                                    v-model="localAd.termsAndConditions"
                                    :rules="localAd.pickingUp ? 'required' : ''"
                                    label="pages.ad.form.conditions" 
                                    :placeholder="$t('pages.ad.form.conditions_ph')"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mt10">
                                <p id="helpBlock" style="padding-bottom: 10px;" class="help-block-title">{{$t('pages.ad.form.welcomeoffer_details')}}</p>
                                <nuxt-textarea
                                    name="welcomeOffer"
                                    v-model="localAd.welcomeOffer"
                                    label="pages.ad.form.welcomeoffer" 
                                    :placeholder="$t('pages.ad.form.welcomeoffer_ph')"/>
                            </div>
                        </div>
                    </div>
                    <div class="list-single-main-item fl-wrap align-left">
                        <CustomTitle title="pages.ad.advertiser_info" />
                        <p>{{ $t("pages.ad.advertiser_desc") }}</p>
                        <EditRow class="mt10">
                            <nuxt-input slot="first" type="text" name="businessName" v-model="localAd.advertiser.businessName" v-validate="'required'" :error="errors.first('businessName')" label="pages.ad.form.advertiser.businessName"/>
                            <nuxt-input slot="second" type="text" name="firstname" v-model="localAd.advertiser.firstname" v-validate="'required'" :error="errors.first('firstname')" label="pages.ad.form.advertiser.firstname"/>
                        </EditRow>
                        <EditRow class="mt10">
                            <nuxt-input slot="first" type="text" name="lastname" v-model="localAd.advertiser.lastname" v-validate="'required'" :error="errors.first('lastname')" label="pages.ad.form.advertiser.lastname"/>
                            <nuxt-input slot="second" type="text" name="title" v-model="localAd.advertiser.title" v-validate="'required'" :error="errors.first('title')" label="pages.ad.form.advertiser.title"/>
                        </EditRow>
                        <EditRow class="mt10">
                            <nuxt-input slot="first" type="number" min="0" name="rcsNumber" v-model="localAd.advertiser.rcsNumber" v-validate="'required'" :error="errors.first('rcsNumber')" label="pages.ad.form.advertiser.rcsNumber"/>
                            <nuxt-input slot="second" type="text" name="businessEmail" v-model="localAd.advertiser.businessEmail" v-validate="'required'" :error="errors.first('businessEmail')" label="pages.ad.form.advertiser.businessEmail"/>
                        </EditRow>
                        <EditRow class="mt10">
                            <nuxt-input slot="first" type="text" name="businessPhone" v-model="localAd.advertiser.businessPhone" v-validate="'required'" :error="errors.first('businessPhone')" label="pages.ad.form.advertiser.businessPhone"/>
                        </EditRow>

                    </div>
                </div>
                <div class="col-md-5 col-xs-12">
                    <div class="list-single-main-item fl-wrap align-left">
                        <div class="row mt10 align-center">
                            <div class="col-xs-12 ">
                                <CustomTitle title="pages.ad.cover" />
                                <span id="helpBlock" class="help-block">{{ $t('pages.ad.form.banner_helper') }}</span>
                            </div>
                            <div class="col-xs-12 ">
                                <VueAvatar
                                        v-if="localAd"
                                        ref="avatar"
                                        :width="288"
                                        :height="70"
                                        :minWidth="1000"
                                        :id="localAd && localAd._id? localAd._id : 'photo'"
                                        :image="localAd.photos && localAd.photos.length>0 ? imgPath(localAd.photos[0].url) : ''"
                                >
                                </VueAvatar>
                            </div>
                            <div class="col-xs-12">
                                <a href="javascript:{}" @click="openAvatarDialog">
                                    <span class="icon">
                                      <i class="fa fa-camera"></i>
                                    </span>
                                    <span>{{$t('common.choose_photo')}}</span>
                                </a>
                            </div>
<!--                            <div class="col-xs-12 mt18">
                                <loading-button btnClass="round-btn primary-red no-border" icon="fa fa-upload" @click="prepareAvatarUpload" :disabled="uploadLoading" text="pages.ad.upload_image" :loading="uploadLoading"/>
                            </div>-->
                        </div>
                    </div>

                    <div class="list-single-main-item fl-wrap align-left">
                        <div class="row mt10 align-center">
                            <div class="col-xs-12 ">
                                <CustomTitle title="pages.ad.photo" />
                                <span id="helpBlock" class="help-block">{{ $t('pages.ad.form.images_helper') }}</span>
                            </div>
                            <div class="col-xs-12 multi-image-wrapper">
                                <no-ssr>
                                    <!--style="display: flex; justify-content: center;"-->
                                    <VueUploadMultipleImage
                                            :showPrimary="false"
                                            @upload-success="uploadImageSuccess"
                                            @before-remove="beforeRemove"
                                            @edit-image="editImage"
                                            :data-images="photos"
                                            :maxImage="4"
                                            :dragText="$t('common.multiple-image.dragText')"
                                            :browseText="$t('common.multiple-image.browseText')"
                                            :primaryText="$t('common.multiple-image.primaryText')"
                                            :markIsPrimaryText="$t('common.multiple-image.markIsPrimaryText')"
                                            :popupText="$t('common.multiple-image.popupText')"
                                    ></VueUploadMultipleImage>
                                </no-ssr>
                            </div>
                        </div>
                    </div>


                    <div class="list-single-main-item fl-wrap align-left">
                        <div class="row mt10 align-center">
                            <div class="col-xs-12 ">
                                <CustomTitle title="pages.ad.additional_info" />
                            </div>
                        </div>
                        <div class="row mt10">
                            <div class="col-xs-12 ">
                                <nuxt-input slot="first" type="text" name="website" v-model="localAd.website" v-validate="'required'" :error="errors.first('website')" label="pages.ad.form.website" icon="fa fa-globe" :left="true"/>
                            </div>
                        </div>
                        <div class="row mt10">
                            <div class="col-xs-12 ">
                                <nuxt-input slot="first" type="text" name="phone" v-model="localAd.phone" label="pages.ad.form.phone" v-validate="'required'" :error="errors.first('phone')" icon="fa fa-phone" :left="true"/>
                            </div>
                        </div>
                        <div class="row mt10">
                            <div class="col-xs-12 ">
                                <div class="custom-form no-icons">
                                    <div class="pass-input-wrap fl-wrap">
                                        <label >{{$t('pages.ad.form.address')}} <i class="fa fa-map-marker" style="top: 31px;"></i></label>
                                        <GmapAutocomplete
                                            ref="autoinput"
                                            class="simple-autocomplate"
                                            :class="{'danger-border' : (localAd.address === '' && errors.first('address'))}"
                                            placeholder=""
                                            name="address"
                                            @place_changed="placeChanged"
                                            v-validate="'required'"
                                            select-first-on-enter
                                            :options="{
                                                /*types: ['(regions)'],*/
                                                componentRestrictions: {country: 'fr'}
                                            }"
                                            />
                                            <div class="error" v-if="localAd.address === '' &&  errors.first('address')">{{ fixErrorMessage(errors.first('address')) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
<!--                        <div class="row mt10">
                            <div class="col-xs-12 ">
                                <nuxt-input slot="second" :disabled="true" type="text" name="coordinates" v-model="computedCoordinates" label="pages.ad.form.coordinates" icon="fa fa-map-pin" :left="true"/>
                            </div>
                        </div>-->
                        <div class="row mt10">
                            <div class="col-xs-12 ">
                                <AddressMap @moved="markerMoved" :markerPostion="markerPostion"/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="col-xs-12">
                    <p v-if="errors.items.length" style="color:#ec616e">
                        <b>Le formulaire contient des erreurs, merci de les corriger.</b>
                    </p>
                </div>
                <div class="col-xs-12">
                    <loading-button btnClass="round-btn primary-red no-border" icon="fa fa-save" @click="checkSave" :disabled="createLoading" text="pages.ad.save" :loading="createLoading"/>
                </div>
            </div>
        </div>

      </section>
</template>

<script>
    import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
    import EditRow from '~/components/user/EditRow'
    import Form from '~/services/Form'
    export default {
        name: "AdForm",
        // inject:['$validator'],
        components:{
            EditRow
        },
        props:{
            _id:{
                default: null
            }
        },
        data(){
          return {
            markerPostion:null,
            photos:[],
            selectedAirport: null,
              localAd:{
                  "name":"",
                  "type": null,
                  "excerpt":"",
                  "description":"",
                  "aerodromes":[],
                  "pickingUp":true,
                  "airportDistance":"",
                  "pricing":"",
                  "termsAndConditions":"",
                  "minParticipants":"",
                  "website":"",
                  "address":"",
                  "coordinates":{
                      "lat":48.8475464,
                      "lon":2.3718721999999843
                  },
                  //"online":false,
                  "phone":"",
                  "premium":true,
                  "advertiser":{
                      "firstname":"",
                      "lastname":"",
                      "title":"",
                      "businessName":"",
                      "rcsNumber":"",
                      "businessEmail":"",
                      "businessPhone":""
                  }
              }
          }
        },
        async mounted(){
            let type = {
                value: this.adType.HOTELS,
                name: this.$t('pages.ad.types.' + this.adType.HOTELS),
            };
            if(this._id){
                this.localAd = { ... await this.find(this._id) };
                let type = {
                    value: this.localAd.type,
                    name: this.$t('pages.ad.types.' + this.localAd.type),
                };
            }
            //this.localAd.type = type;
            fadeOutLoader();
        },
        computed:{
            ...mapState({
                'createLoading'                 : state => state.createLoading,
                'updateLoading'                 : state => state.updateLoading,
                'uploadLoading'                 : state => state.uploadLoading,
                'airports'                      : state => state.airport.airports,
            }),
            typeOptions(){
                return [
                    {
                        value: this.adType.HOTELS,
                        name: this.$t('pages.ad.types.' + this.adType.HOTELS),
                    },
                    {
                        value: this.adType.RESTAURANTS,
                        name: this.$t('pages.ad.types.' + this.adType.RESTAURANTS),
                    },
                    {
                        value: this.adType.TRANSPORTS,
                        name: this.$t('pages.ad.types.' + this.adType.TRANSPORTS),
                    },
                    {
                        value: this.adType.ATTRACTIONS,
                        name: this.$t('pages.ad.types.' + this.adType.ATTRACTIONS),
                    },
                ]
            },
            computedCoordinates(){
                return this.localAd.coordinates ? ('Lat:' + this.localAd.coordinates.lat + ', Lng:'+ this.localAd.coordinates.lon) : '';
            },

            validationFields(){
                let fields = ['name','airportDistance','pricing','excerpt','description','firstname','lastname','title','businessName',
                    'rcsNumber','businessEmail','businessPhone','website','phone', 'closestAirport', 'type'];
                let pickingUpT = ['minParticipants', 'termsAndConditions'];
                let pickingUpF = [];

                return this.localAd.pickingUp ? pickingUpT.concat(fields) : pickingUpF.concat(fields);
            },
            _() { return _; }

        },
        methods: {
            ...mapActions({
                find: 'ad/find',
                update: 'ad/update',
                create: 'ad/create',
            }),
            async checkSave(){
                let cover = {};
                cover.cover = {};
                cover.photos = [];
                if(this.$refs.avatar.imageChanged()) {
                    cover.cover = this.$refs.avatar.getImage();
                    cover.photos = this.photos;
                }
                if(await this.validateFields(this.validationFields) && this.localAd.address !== ''){
                    let data = {data:{...this.localAd}, files: cover};
                    if(data && data.data && data.data._id == null){
                        delete data.data._id;
                    }
                    data.data.aerodromes = this.selectedAirport ? [this.selectedAirport._id ] : [];//this.localAd.airports.map(airport => airport._id);
                    data.data.type = this.localAd.type.value;
                    let response = await this.create(data);
                    if(response){
                        this.$router.push({path:'/'});
                    }
                }
            },
            openAvatarDialog(){
                this.$refs.avatar.clicked();
            },

            prepareAvatarUpload(){
                let data = { ...this.localAd };
                if(this.$refs.avatar.imageChanged()) {
                    data.files = this.$refs.avatar.getImage();
                }
            },
            cancel(){
              console.log('Cancel')
            },
            markerMoved(center){
                this.markerPostion = center;
                this.localAd.coordinates = this.transformCoord(center);
            },
            placeChanged(place){
                this.localAd.address = place.formatted_address;
                this.markerPostion = place.geometry.location;
                this.localAd.coordinates = this.transformCoord(place.geometry.location);
            },
            uploadImageSuccess(formData, index, fileList) {
                this.photos = fileList;
            },
            beforeRemove (index, done, fileList) {
                done();
                this.photos = fileList;
            },
            editImage (formData, index, fileList) {
                this.photos = fileList;
            }
        }
    }
</script>

<style>
    ::placeholder {
        color: #cccccc !important;
    }
</style>
<style scoped>
    input {
      color: green !important;
      padding-left: 10px;
    }
    .help-block {
        color: rgb(236,97,110);
        font-size: 0.9em;
        margin-bottom: 10px;
    }
    .help-block-title {
        color: rgb(236,97,110);
        font-size: 0.9em;
        font-weight:bold;
        margin-bottom: 10px;
    }
    .mt30{
        margin-top: 30px;
    }
    .mt10{
        margin-top: 10px;
    }
    .radio-text{
        padding-top: 12px;
        color: #334e6f;
        text-align: left;
        font-size: 18px;
        font-weight: 500;
    }
    .align-center{
        text-align: center;
    }
    .dropdown-section label{
        padding-bottom: 5px;
        display: block;
    }
    label.vue-js-switch {
        display: inline-block;
    }
    .simple-autocomplate{
        float: left;
        border: 1px solid #eee;
        background: #f9f9f9;
        width: 100%;
        padding: 15px 20px 15px 35px !important;
        border-radius: 6px;
        color: #666;
        font-size: 13px;
        -webkit-appearance: none;
    }
    .multi-image-wrapper{
        display: flex;
        justify-content: center;
    }
</style>

//data.data  = JSON.stringify(data.data);
//data.data = {"photos":[],"validFrom":"2019-09-01T00:00:00.000Z","validThrough":"2020-12-31T00:00:00.000Z","advertiser":null,"name":"nik","slug":"nik","phone":"ddddddddddd","online":true,"address":"nik","premium":false,"cover":null,"type":"hotels","coordinates":null};


/*                    let uploadData = {
/!*                        'data': JSON.stringify(data.data),*!/
"files.cover":data.files.cover,
"files.cover.ref":"experience",
"files.cover.field":this.adsPhotoType.COVER,
"files.photos":data.files.photos,
"files.photos.ref":"experience",
"files.photos.field":this.adsPhotoType.PHOTOS,
};
var frmData = Form.prepare(uploadData)

frmData.append('data', JSON.stringify())

var config = {
headers: {
Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMmM4ZmU1NjM2YTk2NDk3MjdjNjVjNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2ODg5OTczMSwiZXhwIjoxNTcxNDkxNzMxfQ.lgqG1eRUEyXkYeVFMHraY_aETqjPvr3VZOqo41FyZKU',
'content-type':'multipart/form-data',
}
}
await this.$axios.post('https://api.forflyaway.com/experiences', frmData, config);*/
