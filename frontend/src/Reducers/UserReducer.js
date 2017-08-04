const UserReducer = (state = {}, action) => {
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
      console.log('user reducer', action)
      let newSubscribeArray = state.subscribe;
      newSubscribeArray.push(action.newSubscribe);
      console.log('user reducer line 20', newSubscribeArray)
      return Object.assign({},state, {
        subscribe: newSubscribeArray
      })
      break;

    case 'DELETE_QUEUE_IN_USER':
      let queueArrayAfterDelete = [...state.queue].filter((elem,index) => {
        return elem._id !== action.queue_id;
      })
      return Object.assign({}, state, {
        queue: queueArrayAfterDelete
      })
      break;
    case 'DELETE_SUBSCRIBE_IN_USER':
      let subscribeArrayAfterDelete = [...state.subscribe].filter((elem,index) => {
        return elem._id !== action.subscribeInfo.subscribe_id;
      })
      return Object.assign({}, state, {
        subscribe: subscribeArrayAfterDelete
      })
      break;
    default:
      return state
  }
}

export default UserReducer;
