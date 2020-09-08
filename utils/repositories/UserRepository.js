import Vue from 'vue'
import Repo from './Repo.js'

export default class UserRepository extends Repo {
    constructor () {
        super('users')
    }

    async all () {
        return await super.all();
    }

    async get (id) {
        return await super.get(id);
    }

    async store (data) {
        return await super.store(data);
    }

    async update (id, data, showSuccess = true, showError = true) {
        return await super.update(id, data, showSuccess, showError, Vue.prototype.$nuxt.$t('messages.user.success_updated'));
    }

    async destroy (id) {
        return await super.destroy(id);
    }

    async uploadAvatar (data, showSuccess = true, showError = true) {
        return await super.upload(data, showSuccess, showError, Vue.prototype.$nuxt.$t('messages.user.success_uploaded_avatar'));
    }

    async toggleFavoriteAirport (id, action, showSuccess = true, showError = true) {
        return await super.customPut(this.resource + '/favorite/' + id, null, showSuccess, showError, Vue.prototype.$nuxt.$t('messages.user.success_updated_favorite.' + action));
    }

    async toggleWishlistAirport (id, action, showSuccess = true, showError = true) {
        return await super.customPut(this.resource + '/wishlist/' + id, null, showSuccess, showError, Vue.prototype.$nuxt.$t('messages.user.success_updated_wishlist.' + action));
    }

    async contactUs (data, showSuccess = true, showError = true) {
        return await super.customPost('/contacts', data, showSuccess, showError, Vue.prototype.$nuxt.$t('messages.contact.success_created'));
    }


}

//export default new UserRepository();