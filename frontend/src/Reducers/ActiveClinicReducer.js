
const ActiveClinic = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVE_CLINIC':
      return action.clinic || {}
      break;
    case 'STORE_NEW_QUEUE_IN_ACTIVE_CLINIC':
      let queue = state.queue
      queue.push(action.queue);
      return Object.assign({}, state, {
        queue: queue
      })
    default:
      return state
  }
}

export default ActiveClinic;
