import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../ClinicQueue_White.png';

import { localSignup } from '../../Actions/User';

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

  localSignup = (e) => {
    if (this.state.username == "" || this.state.email == "" || this.state.password == "" || this.state.RePassword == "") {
      e.preventDefault();
    } else if (this.state.password == this.state.RePassword){
      this.props.Signup(this.state);
    } else {
      console.log('Error! Please enter in the correct field!')
    }
  }

  render() {
    return (
      <div className="Login">
        <div className='LoginForm'>
          <img src={logo} width={80} height={80} className="logo"/>
          <p className='logoName LogoNameLogin'>Sign up</p>
          <hr/>
          <input type="text" name="username" id="username" className='LoginField' placeholder="User Name" onChange={this.onChange}/>
          <input type="text" name="email" id="SignEmail" className='LoginField' placeholder="Email Address" onChange={this.onChange}/>
          <input type="text" name="password" id="password" className='LoginField' placeholder="Password" onChange={this.onChange}/>
          <input type="text" name="RePassword" id="RePassword" className='LoginField' placeholder="Re-enter Password" onChange={this.onChange}/>
          <Link to='/'><button className="LoginBtn" onClick={this.localSignup}>Sign up</button></Link>
          <hr/>
          <Link to='/'><button className="SignUpBtn">Home</button></Link>
          <Link to='/login'><button className="backBtn">Back</button></Link>
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
    //Login: (credentials) => {dispatch(localLogin(credentials));}
    Signup: (credentials) => {dispatch(localSignup(credentials));}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
