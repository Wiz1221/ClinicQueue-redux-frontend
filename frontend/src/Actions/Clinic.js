import axios from 'axios';

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
    axios.get('/clinic/')
    .then( (response) => {
      dispatch(storeClinic(response.data));
    })
    .catch((error) => {
      dispatch(loadingClinicError(error));
    })
  }
}
