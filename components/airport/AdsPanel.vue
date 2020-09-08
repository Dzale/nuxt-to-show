<template>
    <div class="row">
        <div class="list-single-main-item-title" v-if="title !== '' && computedItems && computedItems.length > 0">
            <h3>{{$t(title)}}:</h3>
        </div>
        <div class="col-xs-12">
            <div class="row">
                <div class="col-xs-12" :class="{'disable-events' : blur}">
                    <div :class="{'bg-image' : blur}">
                        <div class="hidden-xs row" v-if="computedItems && computedItems.length > 0">
                            <div v-for="(item, index) in computedItems" :key="index" class="col-xs-4">
                                <AdPanel :item="item"/>
                            </div>
                        </div>
                        <div class="hidden-xs row more" v-if="computedItems && computedItems.length > 0 && localEnd < computedItems.length" @click="localEnd += localStep">
                            {{$t('common.see_more')}}
                        </div>
                    </div>

                    <div class="visible-xs row" :class="{'bg-image' : blur}" v-if="computedItems && computedItems.length > 0">
                        <AdCarousel :items="computedItems"/>
                    </div>
                </div>
            </div>
            <div v-if="blur" class="bg-text">
                <h1 class="overlay-text" @click="setShowSignUpModal(true)">{{$t('pages.airport.signup')}}</h1>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        name: "AdsPanel",
        props:{
            items:{
                type: Array,
                default: null
            },
            blur:{
                type: Boolean,
                default: false
            },
            end:{
                type: Number,
                default: 3
            },
            step:{
                type: Number,
                default: 3
            },
            title:{
                type: String,
                default: ''
            }
        },
        data(){
            return {
                localEnd:3,
                localStep:3
            }
        },
        mounted(){
            this.localEnd =this.end;
            this.localStep =this.step;
        },
        computed:{
            ...mapState({
                me: state => state.user.me
            }),
            computedItems(){
                return this.blur ? [
                    {
                        name: "Hôtel citizenM Paris Charles de Gaulle Airport",
                        airportDistance: "200",
                        type: "hébergements",
                        pricing: "à partir de 85 euros / nuit",
                        address: "7 Rue de Rome, 93290 Tremblay-en-France"
                    },
                    {
                        name: "Hôtel citizenM Paris Charles de Gaulle Airport",
                        airportDistance: "200",
                        type: "hébergements",
                        pricing: "à partir de 85 euros / nuit",
                        address: "7 Rue de Rome, 93290 Tremblay-en-France",
                        photos:[
                            {
                                url: '/uploads/f9a39f1559d743ceb605e35918eee2c8.jpg'
                            }
                        ]
                    },
                    {
                        name: "Hôtel citizenM Paris Charles de Gaulle Airport",
                        airportDistance: "200",
                        type: "hébergements",
                        pricing: "à partir de 85 euros / nuit",
                        address: "7 Rue de Rome, 93290 Tremblay-en-France",
                    },
                ] : this.items;
            }
        },
        methods:{
            ...mapMutations(['setShowSignUpModal']),
        },
    }
</script>

<style scoped>
    .bg-image {

        /* Add the blur effect */
        filter: blur(8px);
        -webkit-filter: blur(8px);

        /* Full height */
        height: 100%;

        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    /* Position text in the middle of the page/image */
    .bg-text {
        background-color: #2E3B59; /* Fallback color */
        color: #ffffff;
        font-weight: bold;
        border: 1px solid #2E3B59;
        border-radius: 7px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        width: 80%;
        padding: 20px;
        text-align: center;
        -webkit-box-shadow: 6px 9px 5px -3px rgba(0,0,0,0.75);
        -moz-box-shadow: 6px 9px 5px -3px rgba(0,0,0,0.75);
        box-shadow: 6px 9px 5px -3px rgba(0,0,0,0.75);
    }
    .overlay-text{
        font-size:15px;
        transition: all .2s ease-in-out;
    }
    .bg-text:hover{
        background-color: #EC606E;
        border: 1px solid #EC606E;
        cursor: pointer;
        //transform: scale(1) translate(-50%, -50%) ;
/*        transform: scale(1);*/
    }
    .more{
        text-decoration: underline;
        color: #E84A56;
    }
    .more:hover{
        cursor: pointer;
    }
    .disable-events{
        pointer-events: none;
    }
</style>