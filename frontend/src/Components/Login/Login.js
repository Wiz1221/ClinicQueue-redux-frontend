import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from '../../ClinicQueue_White.png';

import { removeActiveClinic } from '../../Actions/ClinicAction';
import { localLogin, userNotification } from '../../Actions/UserAction';
import { clearNotif, nearestClinicOff } from '../../Actions/AppAction';

// import css
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      notification: ""
    }
  }

  // clearNotif = () => {
  //   this.props.clearNotif();
  // }

  onChange = (e) => {
    let state = this.state;
    let key = e.target.name;
    let value = e.target.value;

    state[key] = value;
    this.setState(state);

    this.props.clearNotif();
    this.props.removeActiveClinic();
    this.props.nearestClinicOff();
  }

  localLogin = (e) => {
    if (this.state.email == "" || this.state.password == "") {
    // this.setState({
    //   notification: this.props.notification
    // });
    //console.log("Eror! email or password is empty!");
    console.log(this.props.notification);
    this.props.userNotification("Please enter your login details.");
    e.preventDefault();
    } else {
      this.props.Login(this.state);
    }
  }

  enterKeyPress = (e) => {
    if(e.charCode==13){
      if (this.state.email == "" || this.state.password == "") {
      // this.setState({
      //   notification: this.props.notification
      // });
      //console.log("Eror! email or password is empty!");
      console.log(this.props.notification);
      this.props.userNotification("Please enter your login details.");
      e.preventDefault();
      } else {
        this.props.Login(this.state);
      }
    }
  }

  render() {
    return (
      <div className="Login">
        <div className='LoginForm'>
          {this.props.notification ? <div className='notif'>{this.props.notification}</div> : ""}
          <img src={logo} width={80} height={80} className="logo"/>
          <p className='logoName LogoNameLogin'>Log in</p>
          <hr/>
          <input type="email" name="email" id="email" className='LoginField' placeholder="Email Address" onChange={this.onChange} />
          <input type="password" name="password" id="password" className='LoginField' placeholder="Password" onChange={this.onChange} onKeyPress={this.enterKeyPress}/>
          <button className="LoginBtn" onClick={this.localLogin}>Log in</button>
          <hr/>
          <Link to='/signup'><button className="SignUpBtn" onClick={this.onChange}>Sign Up</button></Link>
          <Link to='/'><button className="backBtn" onClick={this.onChange}>Back</button></Link>
          <hr/>
          <p className="LoginComments">Click sign up if you have yet to register an account.</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    //user: state.user,
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getReviewOfUser: (user_id) => { dispatch(getReviewOfUser(user_id))}
    Login: (credentials) => {dispatch(localLogin(credentials));},
    userNotification: (message) => {dispatch(userNotification(message));},
    clearNotif: () => {dispatch(clearNotif());},
    removeActiveClinic: () => {dispatch(removeActiveClinic())},
    nearestClinicOff: () => {dispatch(nearestClinicOff())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
