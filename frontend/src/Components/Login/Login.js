import React, {Component} from 'react';
import { connect } from 'react-redux';



class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

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
