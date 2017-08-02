
const QueueReducer = (state = [], action) => {

  switch (action.type) {
    case 'STORE_QUEUE':
      return action.queueArray || []
      break;
    case 'STORE_NEW_QUEUE':
      return [
        ...state,
        action.queue
      ]
      break;
    case 'DELETE_QUEUE':
      return state.filter((queue,index) => {
        return queue._id !== action.queue_id
      })
    default:
      return state
  }
}

export default QueueReducer;
