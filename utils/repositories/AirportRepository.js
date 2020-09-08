import Repo from './Repo.js'

export default class AirportRepository extends Repo {
    constructor () {
        super('aerodromes')
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

    async geoSearch(data, limit = 10, start = 0) {
        let query = "?radius=" + data.radius;
        query += data.geometry && data.geometry !== undefined ? "&lat=" + data.geometry.lat + "&lon=" + data.geometry.lon : "";
        query += this.buildClassificationQuery(data.classification);
        return await super.customGet(this.resource + query);
    }

    buildClassificationQuery(classification){
        let query = '';
        if(classification && classification.length > 0 ){
            classification.forEach(function(item){
                query += '&classification=' + item;
            });
        }
        return query;
    }
}