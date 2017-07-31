import axios from 'axios';


// socket
import io from 'socket.io-client';
export const socket = io.connect('http://localhost:3001');

const storeClinic = (clinic) => {
  return {
    type: 'STORE_CLINIC',
    clinic
  }
}

// const storeQueueInfoInReducer = (queue) => {
//   return {
//     type: 'STORE_QUEUE',
//     queue
//   }
// }

const loadingClinicError = (error) => {
  return{
    type: 'LOADING_CLINIC_ERROR',
    error
  }
}

export const getClinic = () => {
  return (dispatch) => {

    // telling backend to send all clinic info to frontend
    socket.emit('getAllClinic');
    // after receiving all clinic info from backend
    socket.on('allClinic', (clinic) => {
      // store clinic info in store
      dispatch(storeClinic(clinic));
      // let allQueue = [];
      // clinic.forEach( (elem,index,arr) => {
      //   elem.queue.forEach((queue,index) => {
      //     allQueue.push(queue);
      //   })
      // })
      // console.log(allQueue);
      // store queue info in store (queue have its own reducer)
      // dispatch(storeQueueInfoInReducer(allQueue));
    })

  }
}

export const activeClinic = (clinic) => {
  return {
    type: 'ACTIVE_CLINIC',
    clinic

  }
}

export const removeActiveClinic = () => {
  return {
    type: 'REMOVE_ACTIVE_CLINIC'
  }
}
