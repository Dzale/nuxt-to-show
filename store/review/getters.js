import { get } from '~/utils/vuex-helper'
export default {
  getReviews: get('reviews'),
  overallRating(state){
    //return 4.78;
    return state.reviews.reduce((a, b) => +a + +b.rating, 0)/state.reviews.length ;
  },
}
