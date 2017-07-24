import React, { Component } from 'react';
import { connect } from 'react-redux';

import QueueList from './Queue/QueueList';
import Subscribe from './Subscribe';
import SubmitQueue from './SubmitQueue/SubmitQueue';



class PrivateClinicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWhichComponent: "",
    }
  }

  onClick = (event) => {
    this.setState({
      showWhichComponent: event.target.id
    })
  }

  backToClinicInfo = () => {
    this.setState({
      showWhichComponent: ""
    })
  }

  render() {
    return (
      <div>
        <h3>{this.props.activeClinic.properties.name}</h3>
        {
          this.state.showWhichComponent==="subscribeClinicButton" ?  (
            <Subscribe clinic={this.props.activeClinic} backToClinicInfo={this.backToClinicInfo}/>
          ) : this.state.showWhichComponent==="submitQueueButton" ? (
            <SubmitQueue clinic={this.props.activeClinic} backToClinicInfo={this.backToClinicInfo}/>
          ) : (
            <div>
              <QueueList queue={this.props.activeClinic.queue}/>
              <button id="subscribeClinicButton" type="submit" className="btn btn-info" onClick={this.onClick}>Subscribe to this clinic</button>
              <button id="submitQueueButton" type="submit" className="btn btn-info" onClick={this.onClick}>Submit a Queue Report</button>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeClinic: state.activeClinic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateClinicInfo);
