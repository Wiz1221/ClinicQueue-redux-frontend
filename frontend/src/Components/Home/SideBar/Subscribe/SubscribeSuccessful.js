import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SubscribeSuccessful extends Component {

  onClick = () => {
    this.props.backToClinicInfo();
  }

  render() {
    return (
      <div className="subscribeSuccessful">
        <div>Thank you for subscribing to {this.props.clinic.properties.name_full}</div>
        <div>The clinic will post a new queue status every ?? mins</div>
        <div>This info will be sent to you via SMS at the following contact number</div>
        <h3>{this.props.user.contact}</h3>
        <div>You can unsubscribe from this clinic or manage your subscriptions at your Account Page</div>
        <div>Thank you once again for using our service</div>
        <button type="submit" className="btn btn-danger queueButton" onClick={this.onClick}>back to clinic Info</button>
        <Link to='/account'><button type="submit" className="btn btn-danger queueButton">go to my Account Page</button></Link>
      </div>
    );
  }
}

export default SubscribeSuccessful
