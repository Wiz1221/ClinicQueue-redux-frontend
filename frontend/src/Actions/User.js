import axios from 'axios';

const storeUser = (user) => {
  return {
    type: 'STORE_USER',
    user
  }
}

const loadingUserError = (error) => {
  return{
    type: 'LOADING_USER_ERROR',
    error
  }
}

export const getUser = () => {
  return (dispatch) => {
    axios.get('/auth/user')
    .then( (response) => {
      dispatch(storeUser(response.data));
    })
    .catch((error) => {
      dispatch(loadingUserError(error));
    })
  }
}

export const localLogin = (credentials) => {
  return(dispatch) => {
    axios.post('/auth/login', credentials)
    .then((response) => {
      const data = response.date;
      dispatch(getUser());

      if(data.error){
        console.log(data.message);
      }else {
        console.error("AJAX: Logged on @ '/auth/user'");
      }
    })
    .catch((error) => {
      console.error("AJAX: Logged on @ '/auth/login'");
    });
  }
}
