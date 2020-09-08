<template>
    <div :id="'search-select-' + reference" class="control" :class="{'is-loading' : loading}">
        <input :list="'options-' + reference" :value="searchModel" :disabled="disabled" @change="change" @input="input" :placeholder="placeholder" class="input" type="text">
        <datalist :id="'options-' + reference" v-if="items && items.length > 0 && open" style="width: 100%">
            <option @click="close" v-for="(item, index) in  items" :key="index" :value="item[optionLabel =='' ? label : optionLabel]"> {{item.school ? item.school.name : ''}}</option>
        </datalist>
    </div>
</template>
<script>

    import _ from 'lodash'

    export default {
        name: 'SearchSelect',
        components: {},
        props: {
            // Select placeholder
            placeholder: {
                type: String,
                default: 'Choose item'
            },
            selected: {
                type: Object,
                required: false,
            },
            // Select text for existing option
            optionText: {
                type: String,
                default: 'Existing'
            },
            // Items
            items: {
                type: Array,
                default: () => []
            },
            // Items label
            label: {
                type: String
            },
            // Items label
            optionLabel: {
                type: String,
                default: ''
            },
            // Has loading?
            loading: {
                type: Boolean,
                default: false
            },
            // Reference?
            reference: {
                type: String,
                default: 'search'
            },
            disabled: { required: false, default: false },
            capitalized: { required: false, default: false },
            searchBy: {
                type: String,
                default: 'name'
            },
        },
        data() {
            return {
                searchModel : '',
                selectModel : {},
                open: false,
                localItems: []
            }
        },
        created(){
            this.localItems = this.items;
        },
        mounted(){

        },
        methods: {
            inputSearch () {
                let self = this;

                let searchResult = this.localItems.filter(item => item[self.searchBy].startsWith(self.searchModel.toUpperCase()))
                if(result){
                    this.selectModel = result;
                    this.$emit('change', this.selectModel);
                }else{
                    this.selectModel = {};
                    this.$emit('type', this.searchModel);
                }
            },
            refresh (){
                this.searchModel = '';
                this.selectModel = {};
                this.open = false;
            },
            close(){
                this.open = false;
            },

            change(event){
                let self = this;
                let result = _.find(this.items, function (item) {
                    return self.searchModel == item[self.label];
                });
                if(result){
                    this.selectModel = result;
                    this.$emit('change', this.selectModel);
                }
            },
            input(event){
                //console.log("NATIVE INPUT: " + this.reference + event.target.value);
                this.searchModel = this.capitalized ?  event.target.value.toUpperCase() : event.target.value
                this.$emit('type', event.target.value);
            },
        },         
        watch: {            
            searchModel : _.debounce(function(value){
                //console.log('search');
                this.open = true;
                //this.inputSearch();
            }, 0),
            selected: function(value){
                this.open = false;
                this.selectModel = value;
                this.searchModel = this.selectModel[this.label];
                //this.$emit('change', this.selectModel);
            },
            items: function(value){
                //console.log(value);
                this.open = true;
            }
        }

    }
</script>

<style lang="css" scoped>

</style>
