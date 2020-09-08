<template>
    <div class="col-md-5">
        <div class="list-single-main-item fl-wrap" id="sec5-profile">
            <div class="list-single-main-item-title fl-wrap"  style="font-size: 16px;">
                <h3>{{$t('pages.users.user.comments')}} </h3>
            </div>
            <div class="row" v-for="(item, index) in items">
                <div class="col-xs-12">
                    <div class="list-single-main-item-title fl-wrap">
                        <h3>
                            <nuxt-link :to="item.aerodrome ? '/aerodromes/' + item.aerodrome.slug : '/aerodromes'">
                                {{$t('pages.users.user.airport_review') + ' : ' + (item.aerodrome ? item.aerodrome.name : "")}}
                            </nuxt-link>
                        </h3>
                    </div>
                    <p>{{item.description}}</p>
                    <p class="fw600">{{parseDateL(item.createdAt, false, true)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Reviews",
        props:{
            items:{
                type: Array,
                default: []
            }
        }
    }
</script>

<style scoped>
    .fw600{
        font-weight: 600;
    }
</style>