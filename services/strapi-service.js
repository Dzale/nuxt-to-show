import Vue from 'vue'
import Strapi from 'strapi-sdk-javascript/build/main'
import Form from '~/services/Form'
import to from "../utils/to";
const strapi = new Strapi(process.env.apiUrl);

/*console.log('https://api.forflyaway.com');*/
//const store = Vue.prototype.$nuxt.$store;
//import store from "../store/index";

/*
var store;
if (process.browser) {
    window.onNuxtReady(({$store}) => {
        store = $store;
    })
}else{
    //store = Vue.prototype.$nuxt.$store;
    if(Vue.prototype.hasOwnProperty('$nuxt')){
        store = Vue.prototype.$nuxt.$store;
    }
}
*/

export async function post(path, data, loading = 'setCreateLoading', showSuccess = false, showError = true, successMessage = 'Success', multipart = false) {
    return await request(process.env._POST, path, data, loading, showSuccess, showError, successMessage, multipart)
}

export async function get(path, data = null, loading = 'setFetchLoading', showSuccess = false, showError = true) {
    return await request(process.env._GET, path, data, loading, showSuccess, showError)
}

export async function put(path, data, loading = 'setUpdateLoading', showSuccess = false, showError = true, successMessage = 'Success') {
    return await request(process.env._PUT, path, data, loading, showSuccess, showError, successMessage)
}

export async function destroy(path, data = null, loading = 'setDeleteLoading', showSuccess = false, showError = true, successMessage = 'Success') {
    return await request(process.env._DELETE, path, data, loading, showSuccess, showErro, successMessage)
}

export async function login(data, loading ='setLoginLoading', showSuccess = false, showError = true) {
    let result, error;
    if(process.client) {
        Vue.prototype.$nuxt.$store.commit(loading, true);
    }
    [ error, result ] = await to( strapi.login( data.username, data.password ), showSuccess, showError);
    if(process.client) {
        Vue.prototype.$nuxt.$store.commit(loading, false);
    }
    if(error) return null;
    if(process.client) {
        Vue.prototype.$nuxt.$store.commit('user/setMe', result.user)
        Vue.prototype.$nuxt.$store.commit('auth/setJwt', result.jwt)
    }
    return result;
}

export async function logout() {
    return await strapi.clearToken();
}

export async function register(data, loading = 'setRegisterLoading', showSuccess = false, showError = true) {
    let result, error;
    if(process.client){
        Vue.prototype.$nuxt.$store.commit(loading, true);
    }
    [ error, result ] = await to( strapi.register( data.username, data.email, data.password ), showSuccess, showError);
    if(process.client){
        Vue.prototype.$nuxt.$store.commit(loading, false);
    }
    if(error) return null;
    if(process.client) {
        Vue.prototype.$nuxt.$store.commit('user/setMe', result.user)
        Vue.prototype.$nuxt.$store.commit('auth/setJwt', result.jwt)
    }
    return result;
}

export async function forgot(data, loading = 'setForgotLoading', showSuccess = true, showError = true) {

    return await request(process.env._POST, '/auth/forgot-password', data, loading, showSuccess, showError, Vue.prototype.$nuxt.$t('modals.auth.forgot_success_message'))
}

export async function reset(data, loading = 'setResetLoading', showSuccess = true, showError = true) {
    return await request(process.env._POST, '/auth/reset-password', data, loading, showSuccess, showError, Vue.prototype.$nuxt.$t('modals.auth.reset_success_message'))
    let result, error;
    if(process.client){
        Vue.prototype.$nuxt.$store.commit(loading, true);
    }
    [ error, result ] = await to( strapi.resetPassword( data.code, data.password, data.password_confirmation ), showSuccess, showError);
    if(process.client){
        Vue.prototype.$nuxt.$store.commit(loading, false);
    }
    if(error) return null;
    return result;
}

async function request(type, path, data, loading = null, showSuccess = false, showError = true, successMessage = 'Success', multipart = false) {
    let result, error;
    if(process.client && loading){
        Vue.prototype.$nuxt.$store.commit(loading, true);
    }
    var config = null;
    //Vue.prototype.$nuxt.$store.state.auth.jwt == null

    if(!process.client && Vue.prototype.$nuxt.$store.state.auth.jwt && Vue.prototype.$nuxt.$store.state.auth.jwt != 'null'){
        config = {
            headers: {
                Authorization:'Bearer ' + Vue.prototype.$nuxt.$store.state.auth.jwt
            }
        }
    }
    if(strapi.axios.defaults.headers.common.Authorization == 'Bearer null' ){
        Vue.prototype.$nuxt.$store.commit('user/setMe', null);
        await strapi.clearToken();
        //console.log("IN!");
    }
    else{
        //console.log("NOT IN!", strapi.axios.defaults.headers.common.Authorization);
    }
    if(strapi.axios.defaults.headers.common.Authorization === undefined){
        Vue.prototype.$nuxt.$store.commit('user/setMe', null);
    }

    if(type === process.env._GET){
        [ error, result ] = await to(strapi.axios.get(path, config), showSuccess, showError);
    }else if(type === process.env._POST){
        if(multipart ){
            if(config){
                config['headers']['content-type'] = 'multipart/form-data';
            }else{
                config = {
                    headers: {
                        'content-type' : 'multipart/form-data'
                    }
                }
            }
        }
        [ error, result ] = await to(strapi.axios.post(path, data, config), showSuccess, showError, successMessage);
    }else if(type === process.env._PUT){
        [ error, result ] = await to(strapi.axios.put(path, data, config), showSuccess, showError, successMessage);
    }else if(type === process.env._DELETE){
        [ error, result ] = await to(strapi.axios.delete(path, config ), showSuccess, showError, successMessage);
    }

    if(process.client && loading){
        Vue.prototype.$nuxt.$store.commit(loading, false);
    }
    if(error) return null;
    return result;
}

export async function upload(data, loading = 'setUploadLoading', showSuccess = false, showError = true, successMessage = 'Success') {
    let result, error;
    Vue.prototype.$nuxt.$store.commit(loading, true);
    [ error, result ] = await to( strapi.upload( Form.prepare(data)), showSuccess, showError, successMessage);
    Vue.prototype.$nuxt.$store.commit(loading, false);
    if(error) return null;
    return result;
}
//export default {post, get, login, register};