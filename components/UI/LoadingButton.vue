<template>
    <button @click="$emit('click')" :class="btnClass" :disabled="disabled">
        <div v-if="loading" class="spinner-border spinner-border-sm" role="status"></div>
        <span v-else><i v-if="icon" :class="icon"></i>  {{$t(text)}}</span>
    </button>
</template>

<script>
    export default {
        name: "loading-button",
        props:{
            text:{
                required: true,
                default: 'Button'
            },
            btnClass:{
                required: true,
                default: 'log-submit-btn'
            },
            disabled:{
                type: Boolean,
                default: false
            },
            loading:{
                type: Boolean,
                default: false
            },
            icon:{
                type: String,
                required: false,
            },
        }
    }
</script>

<style scoped>
    @-webkit-keyframes spinner-border{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}
    @keyframes spinner-border{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}
    .spinner-border{display:inline-block;width:2rem;height:2rem;vertical-align:text-bottom;border:.25em solid currentColor;border-right-color:transparent;border-radius:50%;
        -webkit-animation:spinner-border .75s linear infinite;animation:spinner-border .75s linear infinite}
    .spinner-border-sm{width:1rem;height:1rem;border-width:.2em}
    @-webkit-keyframes spinner-grow{0%{-webkit-transform:scale(0);transform:scale(0)}50%{opacity:1}}
    button:hover{
        cursor: pointer;
        background-color: #b92e3b;
    }
</style>
