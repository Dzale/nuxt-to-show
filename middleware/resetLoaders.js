export default function ({ store }) {
    store.commit('setLoginLoading', false);
    store.commit('setRegisterLoading', false);
    store.commit('setFetchLoading', false);
    store.commit('setCreateLoading', false);
    store.commit('setUpdateLoading', false);
    store.commit('setUploadLoading', false);
    store.commit('setDeleteLoading', false);
    store.commit('setForgotLoading', false);
    store.commit('setResetLoading', false);
    store.commit('setShowSignUpModal', false);
}