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

export const localSignup = (credentials) => {
  return(dispatch) => {
    axios.post('/auth/signup', credentials)
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
      console.error("AJAX: Logged on @ '/auth/signup'");
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
        dispatch(getUser());
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
