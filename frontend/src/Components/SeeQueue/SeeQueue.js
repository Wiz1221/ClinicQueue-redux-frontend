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
      <div className="seequeue-container container">
        {this.props.minNavBarOn()}
        <div className="row">
          <NavBar/>
        </div>
        <div className="row">
          <div className="queueGalleryContainer col-xs-12 col-sm-12 col-md-8 col-lg-8">
              <header className="jumbotron queue-gallery-jumbotron">
                <QueueGallery queue={this.props.activeClinic.queue}/>
              </header>
          </div>
          <div className="submitQueueContainer col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <header className="jumbotron queue-gallery-jumbotron">
              <SubmitQueue clinic={this.props.activeClinic}/>
            </header>
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
