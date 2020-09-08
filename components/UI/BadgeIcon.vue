<template>
    <div class="badge-wrapper">
        <div v-if="showBadge" class="badge">
            <span class="badge-number">
                <b>{{badge}}</b>
            </span>
        </div>
        <img :src="icon" class="w30" :style="iconStyle"/>
    </div>
</template>

<script>
    export default {
        name: "Icon",
        props:{
            icon:{
                type: String,
                required: true
            },
            badge:{
                type: String | Number,
                required: false
            },
            showBadge:{
                type: Boolean,
                default: true
            },
            iconStyle:{
                type: String,
                default: ''
            },
        }
    }
</script>

<style scoped>
    .badge-wrapper{
        float: left;
        margin: 5px;
        width: 45px;
        text-align: left
    }
    .badge{
        text-align: right;
        font-size: 10px
    }
    .badge-number{
        background-color: #eff0f2;
        border-radius: 10px;
        color: #2f3b59;
        padding: 3px
    }
    .w30{
        width: 30px;
    }
</style>