import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from '../../ClinicQueue_White.png';

import { localLogin } from '../../Actions/User';

// import css
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    }
  }

  onChange = (e) => {
    let state = this.state;
    let key = e.target.name;
    let value = e.target.value;

    state[key] = value;
    this.setState(state);
  }

  localLogin = (e) => {
    e.preventDefault();
    this.props.Login(this.state);
  }

  render() {
    return (
      <div className="Login">
        <div className='LoginForm'>
          <img src={logo} width={80} height={80} className="logo"/>
          <p className='logoName LogoNameLogin'>ClinicQueueSG</p>
          <hr/>
          <input type="text" name="email" id="email" className='LoginField' placeholder="Email Address" />
          <input type="text" name="password" id="password" className='LoginField' placeholder="Password" />
          <Link to='/'><button className="LoginBtn" onClick={this.localLogin}>Log in</button></Link>
          <hr/>
          <Link to='/signup'><button className="SignUpBtn">Sign Up</button></Link>
          <Link to='/'><button className="backBtn">Back</button></Link>
          <hr/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    //user: state.user,
    //notification: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getReviewOfUser: (user_id) => { dispatch(getReviewOfUser(user_id))}
    Login: (credentials) => {dispatch(localLogin(credentials));}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
