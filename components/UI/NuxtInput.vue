<template>
    <div class="custom-form no-icons">
        <div class="pass-input-wrap fl-wrap">
            <label v-if="!left">{{$t(label)}}</label>
            <label v-if="left">{{$t(label)}} <i v-if="leftIcon" :class="icon" style="top: 31px;"></i></label>
            <input class="pass-input mb4"
                   ref="input"
                   :name="name"
                   :class="{'pl40' : leftIcon, 'danger-border' : error}"
                   :type="computedType"
                   v-bind="$attrs"
                   v-bind:value="value"
                   v-on="{
                    ...$listeners,
                    input: event => $emit('input', event.target.value)
                  }"
/>
            <span style="top: 30px;" v-if="rightIcon" @click="showPass = !showPass"><i :class="icon" aria-hidden="true" ></i> </span>
        </div>
        <div class="error" v-if="error">{{ customMessage ? customMessage : fixErrorMessage(error, scope) }}</div>
    </div>
</template>

<script>
    export default {
        name: "nuxt-input",
/*        inheritAttrs: false,*/
        props:{
            type:{
                type: String,
                required: true,
                default: 'text'
            },
            name:{
                type: String,
                required: true,
            },
            customMessage:{
                type: String,
                required: false,
                default: null
            },
            value:{
                type: String|Number,
                required: true,
            },
            error:{
                type: String,
                default: null
            },
            label:{
                type: String,
                required: true,
            },
            icon:{
                type: String,
                required: false,
                default: null
            },
            left:{
                type: Boolean,
                required: false,
                default: false
            },
            scope:{
                type: String,
                default: null,
            },

        },
/*        $_veeValidate: {
            // value getter
            value() {
                return this.$el.value;
            },
            // name getter
            name() {
                return this.name;
            }
        },*/
        data(){
            return {
                showPass: false,
            }
        },
        computed:{
            leftIcon(){
                return this.icon && this.left;
            },
            rightIcon(){
                return this.icon && !this.left;
            },
            rightIcon(){
                return this.icon && !this.left;
            },
            computedType(){
                return this.showPass ? 'password' : this.type ;
            },

        },
        mounted() {
            // synbc the input to the initial value
            this.$refs.input.value = this.value;
        }

    }
</script>

<style scoped>
    .pl40{
        padding-left: 40px !important;
    }
    .mb4{
        margin-bottom: 4px;
    }
</style>