<template>
      <section class="mt80">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-2 col-md-8 col-xs-12">
                    <div class="list-single-main-item fl-wrap" style="text-align: left;">
                        <div class="row" v-if="!me">
                            <div class="col-md-12">
                                <nuxt-input type="text" name="name" v-model="form.name" v-validate="'required'" :error="errors.first('name')" label="pages.contact-us.name"/>
                            </div>
                        </div>
                        <div class="row" v-if="!me">
                            <div class="col-md-12">
                                <nuxt-input type="text" name="contact.email" v-model="form.email" v-validate="'required|email'" :error="errors.first('contact.email')" label="pages.contact-us.email" scope="contact"/>
                            </div>
                        </div>
                        <div class="row" v-if="!me">
                            <div class="col-md-12">
                                <nuxt-input type="text" name="tel" v-model="form.tel" v-validate="'required'" :error="errors.first('tel')" label="pages.contact-us.tel"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 mt10">
                                <label>{{$t('pages.contact-us.subject')}}</label>
                                <no-ssr>
                                    <NuxtMultiselect v-model="form.subject" :options="typeOptions" track-by="name" label="name"
                                    ></NuxtMultiselect>
                                </no-ssr>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mt10">
                                <nuxt-textarea name="message" v-model="form.message" v-validate="'required'" :error="errors.first('message')" label="pages.contact-us.message" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <loading-button btnClass="round-btn primary-red no-border" icon="fa fa-envelope" @click="checkSave" :disabled="createLoading" text="pages.contact-us.save" :loading="createLoading"/>
                </div>
            </div>
        </div>

      </section>
</template>

<script>
    import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
    export default {
        name: "ContactUs",
        props:{
            _id:{
                default: null
            }
        },
        head() {
            return {
                title: this.$t('meta.contact.title'),
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('meta.contact.desc') }
                ]
            }
        },
        data(){
          return {
           form :{
               name:'',
               email:'',
               tel:'',
               subject: null,
               message: this.$route.params.reportItem ? this.$t('pages.contact-us.report_comment', { author: this.$route.params.reportItem.author.username, aerodrome: this.$route.params.reportItem.aerodrome.name }) : ''
           },
          }
        },
        mounted(){
            this.form.subject = this.typeOptions ? this.typeOptions[1] : null;
            if (this.$route.params.reportItem) {
                this.form.subject = this.typeOptions ? this.typeOptions[3] : null;
            }
            fadeOutLoader();
        },
        computed:{
            ...mapState({
                'createLoading'                 : state => state.createLoading,
                'me'                            : state => state.user.me,
            }),
            typeOptions(){
                return [
                    {
                        value: this.contactUsType.TYPE1,
                        name: this.$t('pages.contact-us.subject_types.item1'),
                    },
                    {
                        value: this.contactUsType.TYPE2,
                        name: this.$t('pages.contact-us.subject_types.item2'),
                    },
                    {
                        value: this.contactUsType.TYPE3,
                        name: this.$t('pages.contact-us.subject_types.item3'),
                    },
                    {
                        value: this.contactUsType.TYPE4,
                        name: this.$t('pages.contact-us.subject_types.item4'),
                    }
                ]
            },

        },
        methods: {
            ...mapActions({
                create: 'user/contactUs',
            }),
            async checkSave(){
                let preValidation = this.me ?
                true : await this.validateFields(['name', 'contact.email', 'tel']) ;
                if(await this.validateFields(['message']) && preValidation){
                    let data = {...this.form, report: this.$route.params.reportItem};
                    data.subject = this.form.subject.value;
                    await this.create(data);
                }
            },
        }
    }
</script>

<style scoped>
    .mt30{
        margin-top: 30px
    }
    .mt10{
        margin-top: 10px
    }
    .align-center{
        text-align: center;
    }

</style>
