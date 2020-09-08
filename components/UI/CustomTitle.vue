<template>
    <div class="row">
        <div class="col-md-12">
            <div class="list-single-main-item-title fl-wrap">
                <h3>{{$t(title)}}
                    {{customLabel ? ':' : ''}} <span v-if="customLabel"> {{customLabel}}</span>
                </h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CustomTitle",
        props:{
            title:{
                type: String,
                required:true
            },
            customLabel:{
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>