
const ActiveClinicReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVE_CLINIC':
      return action.clinic || {}
      break;
    case 'REMOVE_ACTIVE_CLINIC':
      return {}
      break;
    case 'STORE_NEW_QUEUE_IN_ACTIVE_CLINIC':
      let newQueueArray = [...state.queue];
      newQueueArray.unshift(action.queue);
      state.queue = newQueueArray;
    default:
      return state
  }
}

export default ActiveClinicReducer;
