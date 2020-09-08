<template>
    <div class="box-widget-item fl-wrap">

        <div class="box-widget">
            <div class="box-widget-content" style="padding: 40px;">
                <div class="box-widget-item-header">
                    <h3>{{$t('pages.airport.add_comment')}}</h3>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="rating-text">
                            {{$t('pages.airport.comment_rating')}}:
                        </div>
                        <star-rating class="hidden-xs" v-model="review.rating" active-color="#FECE61" :show-rating="false" :round-start-rating="false" :star-size="20"></star-rating>
                    </div>
                    <div class="col-xs-12 visible-xs ml-20">
                        <star-rating v-model="review.rating" active-color="#FECE61" :show-rating="false" :round-start-rating="false" :star-size="20"></star-rating>
                    </div>
                    <div class="col-xs-12">
                        <nuxt-textarea name="description" v-model="review.description" rules="required|min:10" :placeholder="$t('pages.airport.comment_placeholder')" :scope="name"/>
                    </div>
                    <div class="col-xs-12 align-left">
                        <loading-button btnClass="btn primary-red" @click="checkCreate" :disabled="createLoading" text="pages.airport.comment_btn" :loading="createLoading" label=""/>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: "CreateReview",
        inject: ['$validator'],
        props:{
            airport:{
                type: Object,
                default: null
            },
            user:{
                type: Object,
                default: null
            },
            name:{
                type: String,
                required: true
            }
        },
        data(){
            return{
                review:{
                    rating: null,
                    type: '',
                    description: '',
                    aerodrome: null,
                    author: null,
                }
            }
        },
        computed:{
            ...mapState({
                'createLoading' : state => state.createLoading,
            }),
        },
        methods:{
            ...mapActions({
                createReview : 'review/store',
            }),
            async checkCreate(){
                if(await this.validateFields([this.name + '.description'])){
                    this.review.type = this.reviewType.AERODROME;
                    this.review.aerodrome = this.airport._id;
                    this.review.author = this.user._id;
                    await this.createReview(this.review);
                }
            },
        },

    }
</script>

<style scoped>
    .rating-text{
        color: #334e6f;
        font-size: 18px;
        font-weight: 500;
        margin-right: 30px;
        float: left;
        margin-bottom: 30px;
    }
    .ml-20{
        margin-left: 20px;
    }

</style>