<template>
    <GmapMap ref="addressRef"
             :center="centerComputed"
             :zoom="zoom"
             :style="mapStyle"
            :options="{disableDefaultUI : true}"
             v-bind="$attrs"
             v-on="$listeners">
            <GmapMarker
                        :position="markerPostionComputed"
                        @dragend="onCenterChanged"
                        :draggable="true"
                        icon="/images/Local_pin.svg"
            ></GmapMarker>
    </GmapMap>
</template>

<script>
    import {mapGetters, mapState, mapActions, mapMutations} from 'vuex';
    export default {
        name: "AddressMap",
        props:{
            mapStyle:{
                type: String,
                required: false,
                default: 'width: 100%; height: 200px;'
            },
            markerPostion:{
                type: Object,
                default: null
            },
        },
        async mounted(){
            //this.center = this.map.default.center;
            //this.markerPostion = this.map.default.center;
        },
        created(){
        },
        data(){
            return{
                center: null,
                zoom: 12,
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -35,
                    },
                    boxStyle: {
                        width: "330px",
                    },
                },
            }
        },
        computed:{
                centerComputed(){
                    return this.markerPostion ? this.markerPostion : this.map.default.center;
                },
                markerPostionComputed(){
                    return this.markerPostion ? this.markerPostion : this.map.default.center;
                }
        },
        methods:{
            onCenterChanged(ceneter){
                this.$emit('moved', ceneter.latLng);
            },
        },

    }
</script>

<style scoped>

</style>
