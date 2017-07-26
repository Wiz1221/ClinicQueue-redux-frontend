import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../ClinicQueue_White.png';

import { localSignup, userNotification } from '../../Actions/User';
import { clearNotif } from '../../Actions/AppAction';

// import css
//import './Login.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      RePassword:"",
      notification: ""
    }
  }

  onChange = (e) => {
    let state = this.state;
    let key = e.target.name;
    let value = e.target.value;

    state[key] = value;
    this.setState(state);

    this.props.clearNotif();
  }

  localSignup = (e) => {
    if (this.state.username == "" || this.state.email == "" || this.state.password == "" || this.state.RePassword == "") {
      console.log(this.props.notification);
      this.props.userNotification("Please enter your details.");
      e.preventDefault();
    } else if (this.state.password == this.state.RePassword){
      this.props.Signup(this.state);
    } else {
      console.log(this.props.notification);
      this.props.userNotification("Please enter matching passwords.");
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className="Login">
        <div className='LoginForm'>
          {this.props.notification ? <div className='notif'>{this.props.notification}</div> : ""}
          <img src={logo} width={80} height={80} className="logo"/>
          <p className='logoName LogoNameLogin'>Sign up</p>
          <hr/>
          <input type="text" name="username" id="username" className='LoginField' placeholder="User Name" onChange={this.onChange}/>
          <input type="email" name="email" id="SignEmail" className='LoginField' placeholder="Email Address" onChange={this.onChange}/>
          <input type="password" name="password" id="password" className='LoginField' placeholder="Password" onChange={this.onChange}/>
          <input type="password" name="RePassword" id="RePassword" className='LoginField' placeholder="Re-enter Password" onChange={this.onChange}/>
          <button className="LoginBtn" onClick={this.localSignup}>Sign up</button>
          <hr/>
          <Link to='/'><button className="SignUpBtn" onClick={this.onChange}>Home</button></Link>
          <Link to='/login'><button className="backBtn" onClick={this.onChange}>Back</button></Link>
          <hr/>
          <p className="LoginComments">Please fill in the form to sign up.</p>
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
    //Login: (credentials) => {dispatch(localLogin(credentials));}
    Signup: (credentials) => {dispatch(localSignup(credentials));},
    userNotification: (message) => {dispatch(userNotification(message));},
    clearNotif: () => {dispatch(clearNotif());}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
