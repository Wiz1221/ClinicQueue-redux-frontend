import axios from 'axios';
import { store } from '../index';
import { push } from 'react-router-redux';

const storeUser = (user) => {
  return {
    type: 'STORE_USER',
    user
  }
}

export const userNotification = (notification) => {
  return {
    type: 'USER_NOTIFICATION',
    notification
  }
}

const loadingUserError = (error) => {
  return{
    type: 'LOADING_USER_ERROR',
    error
  }
}

export const getUser = (cb) => {
  return (dispatch) => {
    axios.get('/auth/user')
    .then( (response) => {
      dispatch(storeUser(response.data));
      cb();
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
      const data = response.data;

      //dispatch(getUser());

      if(data.error){
        console.log(data.message);
        dispatch(userNotification(data.message));
      }else {
        console.error("AJAX: Logged on @ '/auth/user'");
        //react-router-redux to dispatch routes from non-components
        store.dispatch(push('/'));
        // get user credentials here; dispatch notification as callback after user has been authenticated by passport
        dispatch(getUser(dispatch(userNotification("Welcome"))));
        //window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("AJAX: Logged on @ '/auth/login'");
      console.log(error);
    });
  }
}

export const localSignup = (credentials) => {
  return(dispatch) => {
    axios.post('/auth/signup', credentials)
    .then((response) => {
      const data = response.data;
      //dispatch(getUser());

      if(data.error){
        console.log(data.message);
        dispatch(userNotification(data.message));
      }else {
        console.error("AJAX: Logged on @ '/auth/user'");
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("AJAX: Logged on @ '/auth/signup'");
      console.log('error: '+ error.message)
      //window.location.href = '/';
    });
  }
}

export const localLogout = () => {
  return (dispatch) => {
    axios.get('/auth/logout')
      .then( (response) => {
        // this data is just the user object but may not be a credentialed user from passport
        const data = response.data;
        // this returns a credentialed user from passport
        dispatch(getUser(dispatch(userNotification("You have successfully logged out"))));
        if(data.error){
          console.log(data.message)
        }else{
          console.error("AJAX: Logged out @ '/auth/logout'");
          // window.location.href = "/";
        }
      })
      .catch((error)=> {
        console.error("AJAX: Could not logout @ '/auth/logout'");
      });
    }
}
