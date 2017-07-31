import React, { Component } from 'react';

class SubscribeForm extends Component {

  render() {
    return (
      <div className="subscribeForm">
        <div>We will be sending you SMS with regards to the latest queue situation posted by the Clinic staff</div>
        <div>Please confirm that your phone number is correct</div>
        <div>{this.props.user.contact ? this.props.user.contact : "you have not entered any contact info"}</div>
        <div className="checkbox" >
          <label><input type="checkbox" value="" onClick={this.phoneNumberCheckBox}/> this is correct</label>
        </div>
        <Link to="/account"><button type="submit" className="btn btn-primary">Update My Phone Number</button></Link>
        {
          this.props.user.contact ?
          <button type="submit" className="btn btn-primary queueButton" onClick={this.confirmSubscribe}>Confirm Subscription</button>
          : null
        }
        <button type="submit" className="btn btn-danger queueButton" onClick={this.backToClinicInfo}>back</button>
      </div>
    );
  }
}

export default SubscribeForm
