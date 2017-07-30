import { socket } from './ClinicAction';
import { store } from '../index.js';

const storeSubscribeInActiveClinic = (user_id) => {
  return {
    type: 'STORE_SUBSCRIBE_IN_ACTIVE_CLINIC',
    user_id
  }
}

const storeSubscribeInClinic = (user_id, clinic_id) => {
  return {
    type: 'STORE_SUBSCRIBE_IN_CLINIC',
    user_id,
    clinic_id
  }
}

const storeSubscribeInUser = (clinic_id) => {
  return {
    type: 'STORE_SUBSCRIBE_IN_USER',
    clinic_id
  }
}

export const postNewSubscribe = (newSubscribe) => {
  return (dispatch) => {
    console.log("subscribe action reached")
    console.log(newSubscribe)
    socket.emit('new subscribe to back end', newSubscribe);
    // socket.on('subscription successful', (newSubscribe) => {
    //   dispatch(storeSubscribeInClinic(newSubscribe.user, newSubscribe.clinic));
    //   dispatch(storeSubscribeInUser(newSubscribe.clinic));
    //   dispatch(storeSubscribeInActiveClinic(newSubscribe.user));
    // })
  }
}

socket.on('subscription successful', (newSubscribe) => {
  const state = store.getState();
  if(state.user._id === newSubscribe.user){
    store.dispatch(storeSubscribeInUser(newSubscribe.clinic));
  }
  store.dispatch(storeSubscribeInClinic(newSubscribe.user, newSubscribe.clinic));
  store.dispatch(storeSubscribeInActiveClinic(newSubscribe.user));
})

/*
possible suggestion of subscribeInfo
{
subscribe_id:
user_id:
clinic_id:
}
*/
export const deleteSubscribe = (subscribeInfo) => {
  return(dispatch) => {
    console.log('subscribe action for deleting', subscribeInfo)
    socket.emit('delete subscribe to back end', subscribeInfo)
  }
}
