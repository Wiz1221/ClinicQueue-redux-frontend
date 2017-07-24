
const Clinic = (state = [], action) => {
  switch (action.type) {
    case 'STORE_CLINIC':

      return action.clinic || []
      break;
    case 'STORE_NEW_QUEUE_IN_CLINIC':
      return state.map((clinic,index) => {
        if(clinic._id === action.queue.clinic){
          let newQueueArray = clinic.queue
          newQueueArray.push(action.queue);
          clinic.queue = newQueueArray
        }
        return clinic
      })

      break;
    default:
      return state
  }
}

export default Clinic;
