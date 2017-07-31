import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SubscribeSuccessful from './SubscribeSuccessful';

import { postNewSubscribe } from "../../../../Actions/SubscribeAction";
import { userNotification } from '../../../../Actions/UserAction';
import { clearNotif, triggerNotification } from '../../../../Actions/AppAction';

import './Subscribe.css'

class Subscribe extends Component {
  constructor(props){
    super(props);
    this.state = {
      phoneNumberCorrect: false,
      subscribeSuccessful: false,
    }
  }

  backToClinicInfo = () => {
    this.props.backToClinicInfo()
  }

  phoneNumberCheckBox = () => {
    let toggle = this.state.phoneNumberCorrect? false : true
    this.setState({
      phoneNumberCorrect: toggle
    })
  }

  confirmSubscribe = () => {
    if(this.state.phoneNumberCorrect && this.props.user.contact){
      if(this.props.notification==="Please confirm phone number is correct"){
        //this.props.clearNotif();
      }
      let newSubscribe = {}
      newSubscribe.user = this.props.user;
      newSubscribe.clinic = this.props.activeClinic;
      this.props.postNewSubscribe(newSubscribe)
      this.setState({ subscribeSuccessful: true });
    }else{
      this.props.triggerNotification();
      this.props.userNotification("Please confirm phone number is correct");
    }
  }

  render() {
    return (
      <div>
      {
        this.state.subscribeSuccessful ?
        <SubscribeSuccessful backToClinicInfo={this.backToClinicInfo} clinic={this.props.activeClinic} user={this.props.user}/> : (
          <div className="private-clinic-info container">
            <div className="row-fluid">
              <div className="subscribeForm well">
                <p>By subscribing to this clinic, you will receive SMS notifications whenever a new queue report is posted by the appointed administrator for {this.props.activeClinic.properties.name_full} </p>
                <p>Please confirm that your phone number is correct:</p>
                  <h4>{this.props.user.contact ? this.props.user.contact : "you have not entered any contact info"}</h4>
                  <div className="checkbox" >
                    <label><input type="checkbox" value="" onClick={this.phoneNumberCheckBox}/> My phone number is correct</label>
                  </div>
            <div className="subscribe-clinic-info container">
              <div className="row-fluid">
                <Link to="/account"><button type="submit" className="btn clinicinfo-btn">Update My Number</button></Link>
              </div>
              <div className="row-fluid">
              {
                this.props.user.contact ?
                <button type="submit" className="btn clinic-confirm-btn" onClick={this.confirmSubscribe}>Confirm Subscription</button>
                : null
              }
              </div>
              <div className="row-fluid">
                <button type="submit" className="btn clinic-back-btn queueButton" onClick={this.backToClinicInfo}>Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        )
      }
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeClinic: state.activeClinic,
    user: state.user,
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userNotification: (message) => {dispatch(userNotification(message));},
    triggerNotification: () => {dispatch(triggerNotification());},
    clearNotif: () => {dispatch(clearNotif());},
    postNewSubscribe: (newSubscribe) => {dispatch(postNewSubscribe(newSubscribe));}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
