import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavBarWhite from '../NavBarWhite/NavBarWhite';
import NotifBar from '../Home/NotificationBar/NotificationBar';

import { updateProfile, updatePassword, userNotification, deleteAccount } from '../../Actions/UserAction';
import { triggerNotification } from '../../Actions/AppAction';

import UserQueueGallery from './UserQueueGallery/UserQueueGallery';
import UserSubscribeGallery from './UserSubscribeGallery/UserSubscribeGallery';

import "./AccountPage.css";

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      password: this.props.user.password,
      rePassword: '',
      contact: this.props.user.contact,
      role: this.props.user.role,
      myClinic: this.props.user.myClinic,
      id: this.props.user._id
    }
  }

componentWillReceiveProps(nextProps) {
  this.setState({
    username: nextProps.user.username,
    email: nextProps.user.email,
    password: nextProps.user.password,
    rePassword: "",
    contact: nextProps.user.contact,
    role: nextProps.user.role,
    myClinic: nextProps.user.myClinic,
    id: nextProps.user._id
  });
}

onChange = (event) => {

  let newState = this.state;
  let key = event.target.name;
  let value = event.target.value;

  newState[key] = value;
  this.setState(newState);

}

onClickEmail = (e) => {
  if (this.state.email !== this.props.user.email ) {
    this.props.Update(this.state);
  }else {
    this.props.triggerNotification();
    this.props.userNotification("Everything is up to date, nothing to update.");
  }
}
onClickContact = (e) => {
  if (this.state.contact !== this.props.user.contact ) {
    this.props.Update(this.state);
  }else {
    this.props.triggerNotification();
    this.props.userNotification("Everything is up to date, nothing to update.");
  }
}

onUpdatePasswordClick = () => {
  if (this.state.password !== this.props.user.password && this.state.rePassword == this.state.password) {
    this.props.UpdatePassword(this.state);
  }else {
    this.props.triggerNotification();
    this.props.userNotification("Everything is up to date, nothing to update.");
  }
}

onDeleteAccountClick = () => {
  this.props.DeleteAccount(this.state.id);
}

  render() {
    return (
      <div className="BG container">
        <NavBarWhite/>
        <div className="row">
          <div className="boxContent col-md-10 col-xs-10 col-md-offset-1 col-xs-offset-1">
            <div className="accLeftSide">
              <UserQueueGallery />
            </div>
            <div className="accRightSide">
              <div className="userContent">
                <div className="userInfo">
                  <p className="userInfoName">Welcome {this.state.username}!</p>
                </div>
                <div className="userInfoField">
                  <h5>My email:</h5>
                  <div className="userInfoRow">
                    <input type="email" name="email" className='inputField' placeholder={this.props.user.email} onChange={this.onChange}/>
                    <button className="updateBtn" onClick={this.onClickEmail}>update</button>
                  </div>
                </div>
                <div className="userInfoField">
                  <h5>My password:</h5>
                  <div className="userInfoRow">
                    <input type="password" name="password" className='inputFieldTop' placeholder="***" onChange={this.onChange}/>
                  </div>
                  <div className="userInfoRow">
                    <input type="password" name="rePassword" className='inputField' placeholder="Re-enter New Password" onChange={this.onChange}/>
                    <button className="updateBtn" onClick={this.onUpdatePasswordClick}>update</button>
                  </div>
                </div>
                <div className="userInfoField">
                  <h5>My contact:</h5>
                  <div className="userInfoRow">
                    <input type="number" name="contact" className='inputField' placeholder={this.props.user.contact} onChange={this.onChange}/>
                    <button className="updateBtn" onClick={this.onClickContact}>update</button>
                  </div>
                </div>
                <div className="userInfoField">
                  <h5>My role:</h5>
                  <div className="userInfoRow">
                    {this.state.role == "regularUser" ? (
                      <select name="role" className='inputFieldRole' onChange={this.onChange}>
                        <option value="regularUser" selected='selected' onChange={this.onChange}>Regular User</option>
                      </select>) : (
                      <select name="role" className='inputFieldRole' onChange={this.onChange}>
                        <option value="clinicAdmin" selected='selected' onChange={this.onChange}>Clinic Admin</option>
                      </select>)}
                  </div>
                </div>
                {this.state.role == "clinicAdmin" ? (
                  <div className="userInfoField">
                  <h5>My clinic :</h5>
                  <div className="userInfoRow">
                    <select name="myClinic" className='inputField' onChange={this.onChange}>
                      <option value={this.state.myClinic} selected='selected' onChange={this.onChange}>{this.state.myClinic}</option>
                    </select>
                  </div>
                </div>) : null}




                <div className="userInfoField userInfoFieldEnding">
                  <h5>My Subscription:</h5>
                  <div className="userInfoRow">
                    <input type="text" name="contact" className='inputField' placeholder={this.props.user.subscribe} onChange={this.onChange}/>
                    <button className="updateBtn" onClick={this.onClick}>update</button>
                  </div>
                </div>



                <div className="userInfoRow">
                  <button className="DeleteBtn userInfoFieldEnding" onClick={this.onDeleteAccountClick}>Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotifBar/>
      </div>
    );
  }
}

// <UserQueueGallery queue={this.props.user.queue ? this.props.user.queue : []} />
// <UserSubscribeGallery subscribe={this.props.user.subscribe ? this.props.user.subscribe : []} />

const mapStateToProps = (state) => {

  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getReviewOfUser: (user_id) => { dispatch(getReviewOfUser(user_id))}
    Update: (credentials) => {dispatch(updateProfile(credentials));},
    UpdatePassword: (credentials) => {dispatch(updatePassword(credentials));},
    userNotification: (message) => {dispatch(userNotification(message));},
    triggerNotification: () => {dispatch(triggerNotification());},
    DeleteAccount: (id) => {dispatch(deleteAccount(id));}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
