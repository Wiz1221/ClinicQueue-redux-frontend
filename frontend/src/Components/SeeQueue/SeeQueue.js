import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import QueueGallery from './QueueGallery/QueueGallery';
import SubmitQueue from './SubmitQueue/SubmitQueue';

// Actions
import { minNavBarOn } from '../../Actions/AppAction';

import './SeeQueue.css'

class SeeQueue extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div className="Login container">
        {this.props.minNavBarOn()}
        <div className="row">
          <NavBar/>
        </div>
        <div className="row">
          <div className="queueGalleryContainer col-xs-12 col-sm-12 col-md-8 col-lg-6">
            <QueueGallery queue={this.props.activeClinic.queue}/>
          </div>
          <div className="submitQueueContainer col-xs-12 col-sm-6 col-md-4 col-lg-6">
            <SubmitQueue clinic={this.props.activeClinic}/>
          </div>
        </div>
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
    minNavBarOn: () => {dispatch(minNavBarOn());}
    // activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeQueue);
