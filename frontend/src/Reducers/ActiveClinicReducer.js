// import { getActiveClinic } from '../API/API';
// const initialActiveClinic = getActiveClinic();
// initialActiveClinic? initialActiveClinic: {}

const ActiveClinicReducer = (state = {}, action) => {
  // console.log(state)
// || initialActiveClinic
  switch (action.type) {
    case 'ACTIVE_CLINIC':
      return action.clinic  ;
      break;
    case 'STORE_NEW_QUEUE_IN_ACTIVE_CLINIC':
      let newQueueArray = {...state}.queue;
      newQueueArray.unshift(action.queue);
      return Object.assign({},state, {
        queue: newQueueArray
      })
      break;
    case 'STORE_SUBSCRIBE_IN_ACTIVE_CLINIC':
      let newSubscribeArray = {...state}.subscribe;
      newSubscribeArray.push(action.newSubscribe);
      return Object.assign({},state, {
        subscribe: newSubscribeArray
      })
      break;
    case 'DELETE_QUEUE_IN_ACTIVE_CLINIC':
      let queueArrayAfterDelete = {...state}.queue.filter((queue,index)=>{
        return queue._id !== action.queue_id
      });
      return Object.assign({},state, {
        queue: queueArrayAfterDelete
      })
      break;
    case 'DELETE_SUBSCRIBE_IN_ACTIVE_CLINIC':
      if(state._id === action.subscribeInfo.clinic_id){
        let subscribeArrayAfterDelete = {...state}.subscribe.filter((subscribe,index)=>{
          return subscribe._id !== action.subscribeInfo.subscribe_id
        });
        return Object.assign({},state, {
          subscribe: subscribeArrayAfterDelete
        })
      } else {
        return state;
      }
      break;
    case 'REMOVE_ACTIVE_CLINIC':
      return {}
      break;
    default:
      return state;
  }
}

export default ActiveClinicReducer;
