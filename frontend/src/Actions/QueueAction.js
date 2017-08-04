import axios from 'axios';
import { store } from '../index.js';
import { socket } from './ClinicAction';
import { triggerNotification } from './AppAction';
import { userNotification } from './UserAction';

const storeAllQueueWhenAppInitialise = (queueArray) => {
  return {
    type: "STORE_QUEUE",
    queueArray
  }
}

export const getAllQueue = () => {
  return (dispatch) => {
    socket.emit('get all queue on app initialise')
    socket.on('get all queue from backend', (queueArray) => {
      dispatch(storeAllQueueWhenAppInitialise(queueArray))
    })
  }
}


const loadingQueueError = (error) => {
  return{
    type: "Load_Queue_Error",
    error
  }
}

const storeQueueInClinic = (queue) => {
  console.log('action storeQueueInClinic', queue)
  return {
    type: "STORE_NEW_QUEUE_IN_CLINIC",
    queue
  }
}

const storeQueueInUser = (queue) => {
  console.log('action storeQueueInUser', queue)
  return {
    type: "STORE_NEW_QUEUE_IN_USER",
    queue
  }
}

const storeQueueInActiveClinic = (queue) => {
  console.log('action storeQueueInActiveClinic', queue)
  return {
    type: "STORE_NEW_QUEUE_IN_ACTIVE_CLINIC",
    queue
  }
}


const storeQueue = (queue) => {
  console.log('storeQueue', queue)
  return {
    type: "STORE_NEW_QUEUE",
    queue
  }
}

// called when app is first loaded
export const getQueue = (id, cbArray) => {
  return (dispatch) => {
    axios.get('/queue/'+ id)
    .then( (response) => {
      console.log("returned from getQueue")
      console.log(response.data);
      cbArray.forEach( (cb) => {
        cb(response.data);
      });
    }).catch((error) =>{
      dispatch(loadingQueueError(error));
    });
  }
}

export const submitQueue = (pic, queue) => {
  return (dispatch) => {
    // here pic is a file
    let picQueueToBackend = new FormData();
    picQueueToBackend.append('pic', pic);
    picQueueToBackend.append('status', queue.status || "");
    picQueueToBackend.append('comment', queue.comment);
    picQueueToBackend.append('user_id', queue.user_id);
    picQueueToBackend.append('clinic_id', queue.clinic_id);

    axios.post('/queue/', picQueueToBackend)
    .then( (response) => {
      console.log('response', response.data)
      // here pic is a url from cloudinary
      const queue = response.data
      const cbArray = [
        (data) => {dispatch(storeQueue(data))},
        (data) => {dispatch(storeQueueInClinic(data))},
        // (data) => {dispatch(storeQueueInActiveClinic(data))},
        (data) => {dispatch(storeQueueInUser(data))},
        () => {dispatch(triggerNotification())},
        () => {dispatch(userNotification("Successfully uploaded queue!"))},
        (data) => {socket.emit('latestQueueForAllUser', data)}
      ];
      dispatch(getQueue(queue._id, cbArray));

    }).catch( (error) =>{
      dispatch(loadingQueueError(error));
    })
  }
}

// updating store of other user with the New Queue real-time
socket.on('queueForAllUser', (queue) => {
  console.log(queue)
  store.dispatch(storeQueue(queue));
  store.dispatch(storeQueueInClinic(queue));
  const state = store.getState();
  // if(state.activeClinic._id===queue.clinic._id){
  //   store.dispatch(storeQueueInActiveClinic(queue));
  // }
})

const deleteQueueInStore = (queue_id) => {
  return {
    type: 'DELETE_QUEUE',
    queue_id
  }
}

const deleteQueueInUser = (queue_id, user_id) => {
  return {
    type: 'DELETE_QUEUE_IN_USER',
    queue_id,
    user_id
  }
}

const deleteQueueInClinic = (queue_id, clinic_id) => {
  return {
    type: 'DELETE_QUEUE_IN_CLINIC',
    queue_id,
    clinic_id
  }
}

const deleteQueueInActiveClinic = (queue_id) => {
  return {
    type: 'DELETE_QUEUE_IN_ACTIVE_CLINIC',
    queue_id
  }
}

// sending Queue to be Deleted to backend
export const deleteQueue = (queueToBeDeleted) => {
  return (dispatch) => {
    console.log('info passed to actions for delete queue', queueToBeDeleted)
    socket.emit('delete queue to back end', queueToBeDeleted)
  }
}

// sending Queue to all user real-time
socket.on('delete queue done', (queueInfo) => {
  store.dispatch(deleteQueueInStore(queueInfo.queue_id))
  store.dispatch(deleteQueueInClinic(queueInfo.queue_id, queueInfo.clinic_id))
  const state = store.getState();
  // only update user with new Queue if this is the user that posted the Queue
  if(state.user._id === queueInfo.user_id){
    store.dispatch(deleteQueueInUser(queueInfo.queue_id, queueInfo.user_id))
  }
  // only update activeClinic if the client side have a activeClinic
  if(state.activeClinic._id===queueInfo.clinic_id){
    store.dispatch(deleteQueueInActiveClinic(queueInfo.queue_id))
  }
})
