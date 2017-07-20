//
// const Clinic = (state = [], action) => {
//   switch (action.type) {
//     case 'STORE_RESTAURANT':
//       return action.restaurant
//       break;
//     case 'ADD_RESTAURENT':
//       return [
//         ...state,   //spread operator__ applied to state-- we are cloning state
//         action.newRestaurant
//       ]
//       break;
//     case 'ADD_RESTAURENT_ID':
//       return state.map((restaurant,index) => {
//                 if(restaurant.id === action.newRestaurantId){
//                   restaurant._id = action.newRestaurant_id
//                   restaurant.picHome = action.newRestaurantPicHome
//                   restaurant.picHomePublicId = action.newRestaurantPicHomePublicId
//                 }
//                 return restaurant
//               })
//       break;
//     case 'UPDATE_RESTAURENT':
//       return state.map((restaurant,index) => {
//                 if(restaurant.id === action.restaurant.id){
//                   restaurant = action.restaurant
//                 }
//                 return restaurant
//               })
//       break;
//     case 'UPDATE_RESTAURENT_PIC_URL':
//       return state.map((restaurant,index) => {
//                 if(restaurant.id === action.id){
//                   restaurant.picHome = action.url
//                 }
//                 return restaurant
//               })
//       break;
//     case 'DELETE_RESTAURENT':
//       return state.filter((restaurant,index) => {
//                 return restaurant._id!==action._id
//               })
//       break;
//     case 'ADD_REVIEW_TO_RESTAURANT':
//       return state.map((restaurant,index) => {
//                 if(restaurant._id === action.restaurant_id){
//                   restaurant.reviews.push(action.review)
//                 }
//                 return restaurant
//               })
//       break;
//     case 'DELETE_REVIEW_FROM_RESTAURANT_IN_STORE':
//       return state.map((restaurant,index) => {
//               if(restaurant._id===action.restaurant_id){
//                 restaurant.reviews = restaurant.reviews.filter( (review,index) => {
//                   return review._id !== action.review_id;
//                 })
//               }
//               return restaurant
//             })
//     default:
//       return state
//   }
// }
//
// export default Restaurant;
