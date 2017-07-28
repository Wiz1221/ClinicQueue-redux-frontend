import { socket } from './ClinicAction';

const storeSubscribeInClinic = (user_id) => {
  return {
    type: 'STORE_SUBSCRIBE_IN_CLINIC',
    user_id
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
    socket.on('subscription successful', (newSubscribe) => {
      dispatch(storeSubscribeInClinic(newSubscribe.user));
      dispatch(storeSubscribeInUser(newSubscribe.clinic));
    })
  }
}
