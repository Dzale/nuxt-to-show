<template>
    <div class="custom-form no-icons">
        <div class="pass-input-wrap fl-wrap">
            <label>{{$t(label)}}</label>
            <textarea
                    ref="textarea"
                    cols="40"
                    rows="3"
                    :name="computedName"
                    v-bind="$attrs"
                    v-bind:value="value"
                    :class="{'danger-border' : errors.has(computedName)}"
                    v-validate="rules"
                    v-on="{
                    ...$listeners,
                    input: event => $emit('input', event.target.value)
                  }">
            </textarea>
        </div>
        <div class="error" v-if="errors.has(computedName)">{{ fixErrorMessage(errors.first(computedName), scope) }}</div>
    </div>
</template>

<script>
    export default {
        name: "nuxt-input",
        inject: ['$validator'],
        props:{
            name:{
                type: String,
                required: true,
            },
            value:{
                type: String|Number,
                required: true,
            },
            rules:{
                type: String,
                default: null
            },
            scope:{
                type: String,
                default: null
            },
            label:{
                type: String,
                default: '',
            }
        },
        data(){
            return {
            }
        },
        computed:{
            computedName(){
                return this.scope ? this.scope + '.' + this.name : this.name;
            }
        },
        mounted() {
            // sync the input to the initial value
            //this.$refs.textarea.value = this.value;
        }

    }
</script>

<style scoped>
    .error{
        color: rgb(236,97,110);
        font-size: 11px;
        text-align: left;
    }
    .pl40{
        padding-left: 40px !important;
    }
    .mb4{
        margin-bottom: 4px;
    }
    textarea{
        padding: 25px !important;
    }
</style>