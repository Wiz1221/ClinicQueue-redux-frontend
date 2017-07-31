import axios from 'axios';
import { store } from '../index';
import { push } from 'react-router-redux';
import { triggerNotification } from './AppAction';

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

export const getUser = (cbArray) => {
  return (dispatch) => {
    axios.get('/auth/user')
    .then( (response) => {
      dispatch(storeUser(response.data));
      cbArray.forEach( (cb) => {
        cb();
      });
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
        const cbArray = [
          () => {dispatch(triggerNotification())},
          () => {dispatch(userNotification("Welcome"))}
        ];
        dispatch(getUser(cbArray));
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
        //react-router-redux to dispatch routes from non-components
        store.dispatch(push('/'));
        // get user credentials here; dispatch notification as callback after user has been authenticated by passport
        const cbArray = [
          () => {dispatch(triggerNotification())},
          () => {dispatch(userNotification("Welcome"))}
        ];
        dispatch(getUser(cbArray));
        //window.location.href = "/";
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
        const cbArray = [
          () => {dispatch(triggerNotification())},
          () => {dispatch(userNotification("You have successfully logged out"))}
        ];
        dispatch(getUser(cbArray));
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

export const updateProfile = (credentials) => {
  return(dispatch) => {
    axios.post('/auth/account/profile', credentials)
    .then((response) => {
      const data = response.data;
      //dispatch(getUser());

      if(data.error){
        console.log(data.message);
        dispatch(userNotification(data.message));
      }else {
        console.error("AJAX: Logged on @ '/auth//UPDATE/user'");
        //react-router-redux to dispatch routes from non-components
        store.dispatch(push('/MyAccount'));
        // get user credentials here; dispatch notification as callback after user has been authenticated by passport
        const cbArray = [
          () => {dispatch(triggerNotification())},
          () => {dispatch(userNotification("Updated!"))}
        ];
        dispatch(getUser(cbArray));
        //window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("AJAX: Logged on @ '/auth/update/user'");
      console.log('error: '+ error.message)
      //window.location.href = '/';
    });
  }
}

export const updatePassword = (credentials) => {
  return(dispatch) => {
    axios.post('/auth/account/password', credentials)
    .then((response) => {
      const data = response.data;
      //dispatch(getUser());

      if(data.error){
        console.log(data.message);
        dispatch(userNotification(data.message));
      }else {
        console.error("AJAX: Logged on @ '/auth//UPDATE/userPassword'");
        //react-router-redux to dispatch routes from non-components
        store.dispatch(push('/MyAccount'));
        // get user credentials here; dispatch notification as callback after user has been authenticated by passport
        const cbArray = [
          () => {dispatch(triggerNotification())},
          () => {dispatch(userNotification("Updated!"))}
        ];
        dispatch(getUser(cbArray));
        //window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("AJAX: Logged on @ '/auth/update/userPassword'");
      console.log('error: '+ error.message)
      //window.location.href = '/';
    });
  }
}
