import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Subscribe.css'

class SubscribeSuccessful extends Component {

  onClick = () => {
    this.props.backToClinicInfo();
  }

  render() {
    return (
      <div className="subscribeSuccessful subscribe-successful-clinic-info well container">
        <p>Thank you for subscribing to {this.props.clinic.properties.name_full}!</p>
        <p>You will be alerted via SMS whenever a new queue status is posted at the following contact number:</p>
        <h3>{this.props.user.contact}</h3>
        <p>You can unsubscribe from this clinic or manage your subscriptions at your Account Page.</p>
        <p>Thank you once again for using our service.</p>
        <div className="subscribe-clinic-info container">
        <button type="submit" className="btn clinic-back-btn queueButton" onClick={this.onClick}>Back to clinic</button>
        <Link to='/account'><button type="submit" className="btn clinic-back-btn queueButton">Go to My Account</button></Link>
        </div>
      </div>
    );
  }
}

export default SubscribeSuccessful
