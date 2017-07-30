const User = (state = {}, action) => {
  switch (action.type) {

    case 'STORE_USER':
      return action.user || {}
      break;

    case 'STORE_NEW_QUEUE_IN_USER':
      let queue = state.queue;
      queue.push(action.queue);
      return Object.assign({}, state, {
        queue: queue
      })
      break;
    case 'STORE_SUBSCRIBE_IN_USER':
      let newSubscribeArray = state.subscribe;
      newSubscribeArray.push(action.clinic_id);
      return Object.assign({},state, {
        subscribe: newSubscribeArray
      })
      break;
    default:
      return state
  }
}

export default User;
