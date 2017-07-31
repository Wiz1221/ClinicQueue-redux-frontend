
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
    default:
      return state
  }
}

export default QueueReducer;
