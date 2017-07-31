
const ClinicReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_CLINIC':
      return action.clinic || []
      break;
    case 'STORE_NEW_QUEUE_IN_CLINIC':
      return state.map((clinic,index) => {
        if(clinic._id == action.queue.clinic){
          let newQueueArray = [...clinic.queue];
          newQueueArray.unshift(action.queue);
          clinic.queue = newQueueArray
        }
        return clinic
      })
      break;
    case 'STORE_SUBSCRIBE_IN_CLINIC':
    return state.map((clinic,index) => {
      if(clinic._id === action.clinic_id){
        let newSubscribeArray = clinic.subscribe
        newSubscribeArray.push(action.user_id);
        clinic.subscribe = newSubscribeArray
      }
      return clinic
    })
    default:
      return state
  }
}

export default ClinicReducer;
