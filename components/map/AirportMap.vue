<template>
    <GmapMap ref="mapRef"
             :center="computedCenter ? computedCenter : map.default.center"
             :zoom="computedZoom"
             :style="mapStyle"
             @dragend="onDragEnd"
             @center_changed="onCenterChanged"
             @zoom_changed="onZoomChanged"
             :options="{scrollwheel: false, streetViewControl: false}"
             v-bind="$attrs"
             v-on="$listeners">
        <GmapCluster @click="clusterClicked" v-if="items && items.length>0" @tap="clusterClicked">
            <GmapInfoWindow v-if="selectedAirport && info" :options="infoOptions" :position="getPosition(selectedAirport)" :opened="infoWinOpen">
                <AirportPanel :item="selectedAirport" @close="setInfoWindowShow(false)"/>
            </GmapInfoWindow>
            <GmapMarker v-for="(airport, index) in items"
                        :position="getPosition(airport)"
                        :clickable="true" :draggable="false"
                        @click="toggleInfoWindow(airport, index)"
                        :key="index"
                        icon="/images/Local_pin.svg"
            ></GmapMarker>
        </GmapCluster>
        <GmapCircle v-if="showRadius"
                :center="dragging ? draggingCenter : (computedCenter ? computedCenter : map.default.center)"
                :radius="radius * 1000"
                :visible="true"
                :options="{fillColor:'#ec616e',fillOpacity:0.2, strokeColor: '#ec616e'}"
        ></GmapCircle>
    </GmapMap>
</template>

<script>
    import {mapGetters, mapState, mapActions, mapMutations} from 'vuex';
    export default {
        name: "AirportMap",
        props:{
            mapStyle:{
                type: String,
                required: false,
                default: 'width: 50%; height: calc(100% - 80px); position: fixed;'
            },
            items:{
                type: Array,
                required: true
            },
            placeLocation:{
                type: Object,
                default: null
            },
            info:{
                type: Boolean,
                default: true
            },
            showRadius:{
                type: Boolean,
                default: false
            },
            radius:{
                type: Number,
                default: 0,
            }
        },
        async mounted(){
            this.center = this.map.default.center;
        },
        created(){
            this.draggingCenter = this.computedCenter;
        },
        data(){
            return{
                currentMidx: null,
                center: null,
                zoom: 8,
                dragging: false,
                draggingCenter: null,
                selectedAirport:null,
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
            ...mapState({
                'infoWinOpen'           : state => state.map.infoWindowShow,
/*                'selectedAirport'       : state => state.airport.selectedAirport,*/
            }),
            ...mapGetters({
                infoWindowPos: 'airports/getSelectedAirportPosition'
            }),
            computedZoom(){
                return (this.placeLocation && this.placeLocation !== undefined) ? this.zoom : this.map.default.zoom;
            },
            computedCenter(){
                return (this.placeLocation && this.placeLocation !== undefined) ? this.placeLocation : this.center;
            }
        },
        methods:{
            ...mapMutations({
                setSelectedAirport: 'airport/setSelectedAirport',
                setInfoWindowShow: 'map/setInfoWindowShow',
                toggleInfoWindowShow: 'map/toggleInfoWindowShow',
            }),
            ...mapActions({
            }),
            onDragEnd(e){
                this.dragging = false;
                this.center = this.draggingCenter;
                this.$emit('changedCenter', this.draggingCenter)
            },
            onCenterChanged(ceneter){
                this.draggingCenter = ceneter;
                this.dragging = true;
            },
            onZoomChanged(zoom){
                this.dragging = false;
                this.zoom = zoom;
                // this.center = this.draggingCenter;
                // this.$emit('changedCenter', this.draggingCenter)
            },

            clusterClicked(cluster){
                this.draggingCenter = cluster.getCenter();//{lat: cluster.getCenter().lat(), lng: cluster.getCenter().lng()};
                this.zoom = this.zoom+1;
                this.$emit('changedCenter', cluster.getCenter())
            },
            toggleInfoWindow: function(airport, idx) {
                this.center = this.getPosition(airport);
                //this.setSelectedAirport(airport);
                this.selectedAirport = airport;
                //check if its the same marker that was selected if yes toggle
                if (this.currentMidx == idx) {
                    this.toggleInfoWindowShow();
                }
                //if different marker set infowindow to open and reset current marker index
                else {
                    this.setInfoWindowShow(true);
                    this.currentMidx = idx;
                }
            },
        },

    }
</script>

<style scoped>

</style>
