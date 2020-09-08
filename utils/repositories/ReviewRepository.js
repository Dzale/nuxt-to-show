import Repo from './Repo.js'
import Vue from 'vue'

export default class ReviewRepository extends Repo {
    constructor () {
        super('reviews')
    }

    async all() {
        return await super.all();
    }

    async get(id) {
        return await super.get(id);
    }

    async store(data) {
        return await super.store(data, true, true, Vue.prototype.$nuxt.$t('messages.review.success_created'));
    }

    async update(id, data) {
        return await super.update(id, data);
    }

    async destroy(id) {
        return await super.destroy(id);
    }
}

//export default new ReviewRepository();