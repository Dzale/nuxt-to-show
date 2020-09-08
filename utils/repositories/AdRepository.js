import Vue from 'vue'
import Repo from './Repo.js'

export default class AdRepository extends Repo {
    constructor () {
        super('experiences')
    }

    async all () {
        return await super.all();
    }

    async count (type = '') {
        super.buildQuery('type', '', type);
        return await super.count();
    }

    async get (id) {
        let result =  await super.get(id);
        //console.log('Repo get', result);
        return result;
    }

    async store (data) {
        return await super.store(data, 'setCreateLoading',false, Vue.prototype.$nuxt.$t('messages.ad.success_created'), true);
    }

    async update (id, data) {
        return await super.update(id, data);
    }

    async destroy (id) {
        return await super.destroy(id);
    }

    async uploadImages (data) {
        return await super.upload(data);
    }
}

//export default new AdRepository();

