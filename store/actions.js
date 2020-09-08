import cookieparser from 'cookieparser'
export default {
    async nuxtServerInit({ commit, state, dispatch }, { req }) {
        let jwt = null;
        if (req && req.headers && req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            //user = (parsed.user && JSON.parse(parsed.user)) || null;
            jwt = parsed.jwt ? parsed.jwt : null;
        }
        if(!state.airport.airports){
            await dispatch('airport/all');
        }

        commit('auth/setJwt', jwt);
    },
}