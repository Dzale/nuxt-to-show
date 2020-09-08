<template>
    <div>
        <div class="list-single-main-item-title">
            <h3>{{$t('pages.ad.time')}}:</h3>
        </div>
        <div class="time-wrapper">
            <div class="row">
                <div class="col-xs-2">{{$t('common.days.Mon')}}</div>
                <div class="col-xs-10 align-left">9h - 19h (TBA)</div>
            </div>
            <div class="row">
                <div class="col-xs-2">{{$t('common.days.Tue')}}</div>
                <div class="col-xs-10 align-left">9h - 19h (TBA)</div>
            </div>
            <div class="row">
                <div class="col-xs-2">{{$t('common.days.Wed')}}</div>
                <div class="col-xs-10 align-left">9h - 19h (TBA)</div>
            </div>
            <div class="row">
                <div class="col-xs-2">{{$t('common.days.Thu')}}</div>
                <div class="col-xs-10 align-left">9h - 19h (TBA)</div>
            </div>
            <div class="row">
                <div class="col-xs-2">{{$t('common.days.Fri')}}</div>
                <div class="col-xs-10 align-left">9h - 19h (TBA)</div>
            </div>
            <div class="row">
                <div class="col-xs-2">{{$t('common.days.Sat')}}</div>
                <div class="col-xs-10 align-left">9h - 19h (TBA)</div>
            </div>
            <div class="row">
                <div class="col-xs-2">{{$t('common.days.Sun')}}</div>
                <div class="col-xs-10 align-left">9h - 19h (TBA)</div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Time",
        props:{
            item:{
                default: null
            }
        },
        computed:{
            items(){
                return [
                    {
                        day: this.$t('common.days.Mon'),
                        time: '9h - 19h (TBA)'
                    },
                    {
                        day: this.$t('common.days.Tue'),
                        time: '9h - 19h (TBA)'
                    },
                    {
                        day: this.$t('common.days.Wed'),
                        time: '9h - 19h (TBA)'
                    },
                    {
                        day: this.$t('common.days.Thu'),
                        time: '9h - 19h (TBA)'
                    },
                    {
                        day: this.$t('common.days.Fri'),
                        time: '9h - 19h (TBA)'
                    },
                    {
                        day: this.$t('common.days.Sat'),
                        time: '9h - 19h (TBA)'
                    },
                    {
                        day: this.$t('common.days.Sun'),
                        time: '9h - 19h (TBA)'
                    }
                ];
            }
        }
    }
</script>

<style scoped>
    .time-wrapper{
        text-align: left;
        border-bottom: 1px solid #eee;
        margin-bottom: 30px;
    }
    .time-wrapper .row{
        padding: 10px;
        font-size: 15px;
        font-weight: 500;
    }
</style>