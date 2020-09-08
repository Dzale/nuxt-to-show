// SERVICES
import {get, post, put, destroy, upload} from '~/services/strapi-service'

// public sector
export default class Repo {
  constructor (resource) {
    this.resource = resource
    this.limit = 10
    this.start = 0
    //this.query = "?_limit=" + this.limit + "&_start=" + this.start
    this.query = ''
  }

  async all (customQuery = '', showSuccess = false, showError = true) {
    let result = await get(this.resource + this.query + customQuery, null, 'setFetchLoading', showSuccess, showError);
    this.clearQuery();
    return result;
  }

  async count (customQuery = '', showSuccess = false, showError = true) {
    let result = await get(this.resource + '/count' + this.query + customQuery, null, 'setFetchLoading', showSuccess, showError);
    this.clearQuery();
    return result;
  }

  async get (id, showSuccess = false, showError = true) {
    return await get(this.resource + '/' + id, null, 'setFetchLoading', showSuccess, showError);
  }

  async store (data, showSuccess = false, showError = true, successMessage = 'Success', multipart = false) {
    return await post(this.resource, data, 'setCreateLoading', showSuccess, showError, successMessage, multipart);
  }

  async update (id, data, showSuccess = false, showError = true,  successMessage = 'Success') {
    return await put(this.resource + '/' + id, data, 'setUpdateLoading', showSuccess, showError, successMessage);
  }

  async destroy (id, showSuccess = false, showError = true,  successMessage = 'Success') {
    return await destroy(this.resource + '/' + id, null, 'setDeleteLoading', showSuccess, showError, successMessage);
  }

  async upload (data, showSuccess = false, showError = true,  successMessage = 'Success') {
    return await upload(data, 'setUploadLoading', showSuccess, showError, successMessage);
  }

  async customPut (path, data, showSuccess = false, showError = true, successMessage = 'Success') {
    return await put(path, data, 'setUpdateLoading', showSuccess, showError, successMessage);
  }

  async customPost (path, data, showSuccess = false, showError = true, successMessage = 'Success') {
    return await post(path, data, 'setCreateLoading', showSuccess, showError, successMessage);
  }

  async customGet (path, data, showSuccess = false, showError = true) {
    return await get(path, data, 'setFetchLoading', showSuccess, showError);
  }

  async serverGet (id, token) {
    return await get(this.resource + '/' + id, {token});
  }

  buildQuery(attr = '', operator = '', value = ''){
      this.query += ((this.query === '') ? '?' : '&') + attr + operator + '=' + value;
  }

  clearQuery(){
    this.query = '';
  }
}
