import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavBarWhite from '../NavBarWhite/NavBarWhite';

import UserQueueGallery from './UserQueueGallery/UserQueueGallery';
import UserSubscribeGallery from './UserSubscribeGallery/UserSubscribeGallery';

import "./AccountPage.css";

class AccountPage extends Component {
  constructor(props) {
    super(props);
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
                  <p className="userInfoName">Welcome {this.props.user.username}!</p>

                </div>
                <div className="userInfoField">
                  <h5>My email:</h5>
                  <div className="userInfoRow">
                    <input type="text" name="contact" className='inputField' placeholder={this.props.user.email} onChange={this.onChange} onKeyPress={this.enterKeyPress}/>
                    <button className="updateBtn">update</button>
                  </div>
                </div>
                <div className="userInfoField">
                  <h5>My password:</h5>
                  <div className="userInfoRow">
                    <input type="text" name="contact" className='inputFieldTop' placeholder="***" onChange={this.onChange} onKeyPress={this.enterKeyPress}/>
                  </div>
                  <div className="userInfoRow">
                    <input type="text" name="contact" className='inputField' placeholder="Re-enter New Password" onChange={this.onChange} onKeyPress={this.enterKeyPress}/>
                    <button className="updateBtn">update</button>
                  </div>
                </div>
                <div className="userInfoField">
                  <h5>My contact:</h5>
                  <div className="userInfoRow">
                    <input type="text" name="contact" className='inputField' placeholder={this.props.user.contact} onChange={this.onChange} onKeyPress={this.enterKeyPress}/>
                    <button className="updateBtn">update</button>
                  </div>
                </div>
                <div className="userInfoField">
                  <h5>My role:</h5>
                  <div className="userInfoRow">
                    <input type="text" name="contact" className='inputField' placeholder={this.props.user.role} onChange={this.onChange} onKeyPress={this.enterKeyPress}/>
                    <button className="updateBtn">update</button>
                  </div>
                </div>
                <div className="userInfoField">
                  <h5>To which clinic :</h5>
                  <div className="userInfoRow">
                    <input type="text" name="contact" className='inputField' placeholder={this.props.user.myClinic} onChange={this.onChange} onKeyPress={this.enterKeyPress}/>
                    <button className="updateBtn">update</button>
                  </div>
                </div>
                <div className="userInfoField">
                  <h5>My Subscription:</h5>
                  <div className="userInfoRow">
                    <input type="text" name="contact" className='inputField' placeholder={this.props.user.subscribe} onChange={this.onChange} onKeyPress={this.enterKeyPress}/>
                    <button className="updateBtn">update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
