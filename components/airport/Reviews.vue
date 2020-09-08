<template>
    <div class="box-widget-item fl-wrap">

        <div class="box-widget">
            <div class="box-widget-content" style="padding: 40px;">
                <div class="box-widget-item-header">
                    <h3>{{$t('pages.airport.comments')}} - <span class="danger-text">{{items.length}}</span> </h3>
                </div>
                <div class="reviews-comments-wrap full-width">
                    <div class="reviews-comments-item" v-for="(item, index) in items" :key="index">
                        <div class="review-comments-avatar">
                            <img :src="computedAvatar(item)" alt="">
                        </div>
                        <div class="reviews-comments-item-text">
                            <h4 v-if="loggedIn">
                                <nuxt-link :to="computedPath(item)" class="user">{{computedUsername(item)}}</nuxt-link>
                            </h4>
                            <h4 v-else>
                                <span class="user">{{computedUsername(item)}}</span>
                            </h4>

                            <div class="float-right">

                                <!--<star-rating active-color="#FECE61" :rating="item.rating" :show-rating="false" :round-start-rating="false" :star-size="15" :read-only="true"></star-rating>-->
                            </div>
                            <nuxt-link v-if="loggedIn" :to="{ name: 'contact', params: { reportItem: item }}" >
                                <span class="reviews-comments-item-date report"><i class="fa fa-exclamation-triangle"></i></span>
                            </nuxt-link>

                            <div class="clearfix"></div>
                            <p>{{item.description}}</p>
                            <span class="reviews-comments-item-date"><i class="fa fa-calendar-check-o"></i>{{parseDateL(item.createdAt)}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "Reviews",
        props:{
            items:{
                type: Array,
                required: true
                /*default: []*/
            },
            loggedIn:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
            }
        },
        methods:{
            computedAvatar(item){
                return  item.author && item.author.avatar ? this.imgPath(item.author.avatar.url) : "/images/avatar/user.png";
            },
            computedUsername(item){
                return  item.author ? item.author.username : this.$t('common.unknown');
            },
            computedPath(item){
                return  item.author ? '/users/' + (this.me && this.me._id === item.author._id ? 'me' : item.author._id ) : '';
            },
        },
        computed:{
            ...mapState({
                me : state => state.user.me
            }),
        }
    }
</script>

<style scoped>
    .user{
        color: #2F3B59;
        font-size: 25px;
    }
    .full-width{
        width: 100%;
    }

    .report{
        margin-top: 0;
        float: right;
    }
    .report:hover{
        cursor: pointer;
    }
</style>