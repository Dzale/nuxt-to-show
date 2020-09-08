import  Vue from 'vue'
import _ from "lodash";
export default function to(promise, showSuccess = false, showError = true, successMessage) {
    return promise.then(data => {
        showSuccess ? Vue.prototype.$nuxt.$notify.success({message: successMessage}) : ''
        //showSuccess ? Vue.prototype.$nuxt.$notify.success(data) : ''
        return [null, data];
    }).catch(ex => {
        if(showError){
            if(ex.hasOwnProperty('response')) {

                let errors = ex.response.data.errors;
                let status = ex.response.status;

                if (status == 422) {
                    Vue.prototype.$nuxt.$notify.error({message: '422'})
                    let isObject = _.every(errors, _.isObject)
                    _.forEach(errors, function (error) {
                        if (isObject) {
                            _.forEach(error, function (msg) {
                                Vue.prototype.$nuxt.$notify.error({message: msg})
                            })
                        } else {
                            Vue.prototype.$nuxt.$notify.error({message: error})
                        }
                    })
                } else if ([400, 401, 403, 404, 500].includes(status)) {
                    if (ex.hasOwnProperty('message')) {
                        if (status == 401 && ex.response.data.message == 'Your account email is not confirmed.') {
                            Vue.prototype.$nuxt.$notify.error({message: 'L\'e-mail de votre compte n\'est pas confirmé.'})
                        } else {
                            Vue.prototype.$nuxt.$notify.error({message: ex.response.data.message})    
                        }
                    }
                }else {
                    console.log('UNKNOWN ERROR');
                    console.log(ex.response);
                }
            }else{
                Vue.prototype.$nuxt.$notify.error({message: ex.message})
            }
        }
        return [ex]
    }).finally(() => {
        return [];
    });
}