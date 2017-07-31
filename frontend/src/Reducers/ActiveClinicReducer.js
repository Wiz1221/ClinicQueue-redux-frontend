import { getActiveClinic } from '../API/API';
const initialActiveClinic = getActiveClinic();


const ActiveClinic = (state = initialActiveClinic? initialActiveClinic: {}, action) => {
  // console.log(state)
  switch (action.type) {
    case 'ACTIVE_CLINIC':
      return action.clinic || initialActiveClinic ;
      break;
    case 'STORE_NEW_QUEUE_IN_ACTIVE_CLINIC':
      let newQueueArray = state.queue;
      newQueueArray.push(action.queue);
      return Object.assign({},state, {
        queue: newQueueArray
      })
      break;
    case 'STORE_SUBSCRIBE_IN_ACTIVE_CLINIC':
      let newSubscribeArray = state.subscribe;
      newSubscribeArray.push(action.user_id);
      return Object.assign({},state, {
        subscribe: newSubscribeArray
      })
      break;
    case 'REMOVE_ACTIVE_CLINIC':
      return {}
      break;
    default:
      return state
  }
}

export default ActiveClinic;
