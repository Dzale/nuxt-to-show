import Repo from './Repo.js'
import Vue from 'vue'

export default class AeroclubRepository extends Repo {
    constructor () {
        super('aeroclubs')
    }

    async all () {
        return await super.all('?_limit=0');
    }

    async get (id) {
        return await super.get(id);
    }

    async store (data) {
        return await super.store(data);
    }

    async update (id, data) {
        return await super.update(id, data);
    }

    async destroy (id) {
        return await super.destroy(id);
    }
}

//export default new ReviewRepository();