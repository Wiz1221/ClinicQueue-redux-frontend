import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import QueueGallery from './QueueGallery/QueueGallery';
import SubmitQueue from './SubmitQueue/SubmitQueue';
import TestQueue from './TestQueue';
import QueueShow from './QueueShow';

import './SeeQueue.css'

class SeeQueue extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   clinic: this.props.activeClinic,
    //   queue: this.props.activeClinic.queue
    // }
  }

  // componentWillReceiveProps(nextProps){
  //   console.log(nextProps.activeClinic.queue)
  //   this.setState({
  //     clinic: nextProps.activeClinic,
  //     queue: nextProps.activeClinic.queue
  //   })
  // }


  render() {
    return (
      <div>
        <div className="queueGalleryContainer">
          <QueueShow />
        </div>
        <div className="submitQueueContainer">
          <SubmitQueue clinic={this.props.activeClinic}/>
        </div>
        <Link to='/'><button>back</button></Link>

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

export default connect(mapStateToProps, mapDispatchToProps)(SeeQueue);
