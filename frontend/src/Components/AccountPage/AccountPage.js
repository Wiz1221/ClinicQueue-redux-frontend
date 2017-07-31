import React, {Component} from 'react';
import { connect } from 'react-redux';

import "./AccountPage.css";

class AccountPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="BG">
        <div className="boxContent">
          <div className="accLeftSide">
            queue display
          </div>
          <div className="accRightSide">
            <div className="userContent">
              <div className="userInfo">
                <p className="userInfoName">Welcome {this.props.user.username}!</p>
              </div>
              <div className="userInfoField">
                <h5>My Contact:</h5>
                <div className="userInfoRow">
                  <input type="text" name="contact" className='inputField' placeholder={this.props.user.username} onChange={this.onChange} onKeyPress={this.enterKeyPress}/>
                  <button className="updateBtn">update</button>
                </div>
              </div>
              <div className="userInfoField">
                <h5>:</h5>
                <div className="userInfoRow">
                  <input type="text" name="contact" className='inputField' placeholder={this.props.user.contact} onChange={this.onChange} onKeyPress={this.enterKeyPress}/>
                  <button className="updateBtn">update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
