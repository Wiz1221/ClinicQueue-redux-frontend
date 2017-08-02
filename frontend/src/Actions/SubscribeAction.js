import { socket } from './ClinicAction';
import { store } from '../index.js';
import { triggerNotification } from './AppAction';
import { userNotification } from './UserAction';

const storeSubscribeInActiveClinic = (newSubscribe) => {
  return {
    type: 'STORE_SUBSCRIBE_IN_ACTIVE_CLINIC',
    newSubscribe
  }
}

const storeSubscribeInClinic = (newSubscribe) => {
  return {
    type: 'STORE_SUBSCRIBE_IN_CLINIC',
    newSubscribe
  }
}

const storeSubscribeInUser = (newSubscribe) => {
  return {
    type: 'STORE_SUBSCRIBE_IN_USER',
    newSubscribe
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
  store.dispatch(storeSubscribeInClinic(newSubscribe));
  store.dispatch(triggerNotification());
  store.dispatch(userNotification("Subscribed to clinic!"));
  if(state.user._id === newSubscribe.user){
    store.dispatch(storeSubscribeInUser(newSubscribe));
  }
  if(state.activeClinic._id){
    store.dispatch(storeSubscribeInActiveClinic(newSubscribe));
  }
})

const deleteSubscribeInActiveClinic = (subscribeInfo) => {
  return {
    type: 'DELETE_SUBSCRIBE_IN_ACTIVE_CLINIC',
    subscribeInfo
  }
}

const deleteSubscribeInClinic = (subscribeInfo) => {
  return {
    type: 'DELETE_SUBSCRIBE_IN_CLINIC',
    subscribeInfo
  }
}

const deleteSubscribeInUser = (subscribeInfo) => {
  return {
    type: 'DELETE_SUBSCRIBE_IN_USER',
    subscribeInfo
  }
}

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

socket.on('delete subscribe done', (subscribeComeBack) => {
  console.log(subscribeComeBack)
  store.dispatch(deleteSubscribeInClinic(subscribeComeBack));
  const state = store.getState();
  if(state.user._id === subscribeComeBack.user_id){
    store.dispatch(deleteSubscribeInUser(subscribeComeBack));
  }
  if(state.activeClinic._id){
    store.dispatch(deleteSubscribeInActiveClinic(subscribeComeBack));
  }
})
