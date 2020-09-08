export default function ({ store, redirect }) {
    // If the user is not authenticated
    //console.log('MIDDLEWARE', store.state.auth.jwt, !store.state.auth.jwt);

    if (!store.state.auth.jwt ||store.state.auth.jwt == 'null') {
        return redirect('/')
    }
}