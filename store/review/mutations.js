import { set, toggle, clear } from '~/utils/vuex-helper'

export default {
    setReviews: set('reviews'),
    pushReview(state, review){
        state.reviews.push(review);
    }
}
