import axios from 'axios';

import io from 'socket.io-client';
export const socket = io.connect('http://localhost:3001');


const storeClinic = (clinic) => {
  return {
    type: 'STORE_CLINIC',
    clinic
  }
}

const loadingClinicError = (error) => {
  return{
    type: 'LOADING_CLINIC_ERROR',
    error
  }
}

export const getClinic = () => {
  return (dispatch) => {

    socket.emit('getAllClinic');
    socket.on('allClinic', (clinic) => {
      dispatch(storeClinic(clinic));
    })

    // axios.get('/clinic/')
    // .then( (response) => {
    //   dispatch(storeClinic(response.data));
    // })
    // .catch((error) => {
    //   dispatch(loadingClinicError(error));
    // })
  }
}
