import React, {Component} from 'react';

import './About.css';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderComponent: false
    }
  }

  popUp = () => {
    this.setState({
      renderComponent: true
    });
  }
  popDown = () => {
    this.setState({
      renderComponent: false
    });
  }

  compoAppear = () => {
    return (
      <div className="AboutButton container">
        <div className="row">
          <div className="col-md-12">
            <p></p>
          </div>
        </div>
      </div>
    );
  }

  compoDisappear = () => {
    return (
      <div></div>
    );
  }

  render() {
    return (
      <div className="AboutBar" onMouseEnter={this.popUp} onMouseLeave={this.popDown}>
        <i className="arrow up"></i>
        {this.state.renderComponent ? (
          <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <p>Welcome to <span className="inline-brandname">ClinicQueueSG</span>! This site is a one-stop portal to help you find out the queue situation of over 900 primary care clinics in Singapore, to help you manage your time for clinic visits.</p>
                  <p>We have centralised the <a href="https://polyclinic.singhealth.com.sg/QUEUEWATCH/Pages/home.aspx" target="_blank">QueueWatch</a> and <a href="https://www.nhgp.com.sg/smile_list.aspx" target="_blank">See Me In Line (S.M.I.L.E) </a> crowd information services by Singhealth and National Healthcare Group so that you can inspect the crowd situation at all Singapore polyclinics. The pulsing markers denote the total number of people reported to be currently waiting in each polyclinic.</p>
                  <p>You can also find queue reports for our partner private clinics. Administrators for partner clinics will post images of the queue situation at relevant times. You can subscribe to clinics to receive SMS alerts whenever a new queue report is posted.</p>
                  <br/>
                  <p>&#169; Isaac-Geokyan-Hanif GA WDI-10 2017</p>
                </div>
              </div>
            </div>) : (null)}
      </div>
    );
  }
}

About.propTypes = {
};
