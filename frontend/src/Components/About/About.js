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
            <p>ClinicQueueSG is a site meant to help retards find their brains.</p>
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
                  <p>Welcome to <span className="inline-brandname">ClinicQueueSG</span>! This site is a one-stop portal to help you find out the queue situation of over 900 primary care clinics in Singapore.</p>
                  <p>Firstly, we have centralised the <a href="https://polyclinic.singhealth.com.sg/QUEUEWATCH/Pages/home.aspx" target="_blank">QueueWatch</a> and <a href="https://www.nhgp.com.sg/smile_list.aspx" target="_blank">See Me In Line (S.M.I.L.E) </a> crowd information services by Singhealth and National Healthcare Group so that you can inspect the crowd situation in all Singapore polyclinics in one place. The size of the circles denote the total number of people reported to be currently waiting in each polyclinic.</p>
                </div>
              </div>
            </div>) : (null)}
      </div>
    );
  }
}

About.propTypes = {
};
