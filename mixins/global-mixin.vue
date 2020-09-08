
<script>

    export default {
        data () {
            let data =  {
                signUpModalStates:{
                    AUTH: 'auth',
                    FORGOT_PASSWORD: 'forgot_password',
                    RESET_PASSWORD: 'reset_password',
                },
                userAirport:{
                    FAVORITE: 'favorite',
                    WISHLIST: 'wishlist'
                },
                DATE_FORMAT: 'DD/MM/YYYY',
                arrayAction:{
                    ADD: 'add',
                    REMOVE: 'remove'
                },
                reviewType:{
                    EXPERIENCE: 'experience',
                    AERODROME: 'aerodrome',
                },
                contactUsType:{
                    TYPE1: 'Demande de contact',
                    TYPE2: 'Demande de partenariat',
                    TYPE3: "Publication d'une annonce",
                    TYPE4: "Demande de modération"
                },
                strapiFilters:{
                    EQ          : '_eq',
                    NE          : '_ne',
                    LT          : '_lt',
                    GT          : '_gt',
                    LTE         : '_lte',
                    GTE         : '_gte',
                    IN          : '_in',
                    NIN         : '_nin',
                    CONTAINS    : '_contains',
                    NCONTAINS   : '_ncontains',
                    CONTAINSS   : '_containss',
                    NCONTAINSS  : '_ncontainss'
                },
                windowWidth: null,
                windowHeight: null,
                adsPhotoType:{
                    COVER       : 'cover',
                    PHOTOS      : 'photos',
                },
                adType:{
                    HOTELS:         'hotels',
                    RESTAURANTS:    'restaurants',
                    TRANSPORTS:     'transports',
                    ATTRACTIONS:    'attractions',
                },
                pilotFlightHours:{
                    item1: "Moins de 100",
                    item2: "101 à 500",
                    item3: "501 à 1000",
                    item4: "1001 à 2000",
                    item5: "2001 à 3000",
                    item6: " + de 3001"
                },
                map:{
                    default:{
                        zoom: 6,
                        center: { lat: 45.0501816, lng: 1.9583551 },
                        place: {
                            
                        },
                    }
                },
                airportClassification:{
                    a: 'Ouvert à la CAP',
                    b: 'Usage restreint',
                    c: 'Terrain Privé'
                }
            }

            return data;
        },
        computed: {
            dafaultPlace(){
                return {
                    geometry:{
                            location: {
                                lat: 48.856614,
                                lng: 2.3522219
                            }
                    },
                    formatted_address: 'Paris, France'
                }
            }
        },
        mounted(){
        },
        methods: {
            async validateFields(fields){
                let forValidation = [];
                let self = this;
                fields.forEach((item) =>{
                    forValidation.push(self.$validator.validate(item))
                })
                const results = Promise.all(forValidation);
                return (await results).every(isValid => isValid);
            },
            randomRating(){
                return Math.floor(Math.random() * (5 - 1) + 1) / 1;
            },
            getPosition(item){
                return {lat: +item.coordinates.lat, lng: +item.coordinates.lon};
            },
            transformCoord(coordinates, forServer = true){
                return forServer ? {lat: coordinates.lat(), lon: coordinates.lng() } : { lat: coordinates.lat, lng: coordinates.lon}
            },
            fixErrorMessage(msg, scope = null){
                let error = scope ? msg.replace(scope + '.', '') : msg;
                error = error.replace('login_', '');
                error = error.replace('register_', '');
                error = error.replace('forgot_', '');
                error = error.replace('reset_', '');
                error = error.replace('confirmation_password', this.$t('common.custom-messages.confirmation_password'));
                error = error.replace('password', this.$t('common.custom-messages.password'));
                error = error.replace('username', this.$t('common.custom-messages.username'));
                error = error.replace('closestAirport', this.$t('pages.ad.form.closest_airport'));
                error = error.replace('firstname', this.$t('pages.ad.form.advertiser.firstname'));
                error = error.replace('lastname', this.$t('pages.ad.form.advertiser.lastname'));
                error = error.replace('name', this.$t('pages.ad.form.name'));
                error = error.replace('airportDistance', this.$t('pages.ad.form.distance'));
                error = error.replace('pricing', this.$t('pages.ad.form.pricing'));
                error = error.replace('type', this.$t('pages.ad.form.type'));
                error = error.replace('excerpt', this.$t('pages.ad.form.excerpt'));
                error = error.replace('description', this.$t('pages.ad.form.long_desc'));
                error = error.replace('pickingUp', this.$t('pages.ad.form.picking_up'));
                error = error.replace('minParticipants', this.$t('pages.ad.form.min_participants'));
                error = error.replace('termsAndConditions', this.$t('pages.ad.form.conditions'));
                error = error.replace('welcomeOffer', this.$t('pages.ad.form.welcomeoffer'));
                error = error.replace('businessName', this.$t('pages.ad.form.advertiser.businessName'));
                error = error.replace('title', this.$t('pages.ad.form.advertiser.title'));
                error = error.replace('rcsNumber', this.$t('pages.ad.form.advertiser.rcsNumber'));
                error = error.replace('businessEmail', this.$t('pages.ad.form.advertiser.businessEmail'));
                error = error.replace('businessPhone', this.$t('pages.ad.form.advertiser.businessPhone'));
                error = error.replace('website', this.$t('pages.ad.form.website'));
                error = error.replace('phone', this.$t('pages.ad.form.phone'));
                error = error.replace('_', ' ');
                return error;
            },
            getWindowWidth(event) {
                this.windowWidth = document.documentElement.clientWidth;
                this.windowHeight = document.documentElement.clientHeight;
            },
            imgPath(path){
                return path.includes(process.env.apiUrl) ? path : process.env.apiUrl + path;
            },
            parseDateL(date, userFormat = false, pretty = false){
                if(!date ||date ==='' || date ===undefined){
                    return '';
                }
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return userFormat ?  [day, month, year ].join('/') : ( pretty ? [day, this.$t('common.months.' + (d.getMonth() + 1)), year].join(' '): [year, month, day].join('/'));
            },
            belongsToList(list, id){
                return !list || list.length === 0 ? false : ( (list.map(item => item._id)).includes(id) );
            },
            parseGeometry(item){

                //console.log('parseGeometry');
                return item && item.geometry && item.geometry.location? {
                    lat: item.geometry.location.lat(),
                    lon: item.geometry.location.lng(),
                } : item;
            },
        },
        created(){

        },
        mounted() {
        }

    }
</script>
