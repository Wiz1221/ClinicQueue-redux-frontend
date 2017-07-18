import React, {Component} from 'react';
import { connect } from 'react-redux';

import Header from '../Header/Header';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    //user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getReviewOfUser: (user_id) => { dispatch(getReviewOfUser(user_id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
