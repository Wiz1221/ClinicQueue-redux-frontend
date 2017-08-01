import React, { Component } from 'react';
import { connect } from 'react-redux';

import QueueItem from '../../../SeeQueue/QueueGallery/QueueItem';

import './QueueList.css'

class QueueList extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  populateQueue = (queue) => {
    // console.log("activeClinic.queue");
    // console.log(queue);
    let statequeues = this.props.statequeues;
    console.log("statequeues");
    console.log(statequeues)
    // replace the activeClinic queues with actual queue objects
      const initQueue = statequeues.filter( (statequeue) => {
        console.log("statequeue " + statequeue._id);
        console.log("queue " + queue._id);
        return statequeue._id == queue._id;
      });
    console.log("initQueue QueueList");
    console.log(initQueue);
    return initQueue;
  }

  renderQueueItem = () => {
    let queueArray = this.props.queue;
    console.log("queueArray QueueList");
    console.log(queueArray);

    if (queueArray.length > 0 && typeof(queueArray[0])!=="undefined") {
      const latestQueue = queueArray[0];
      const populated = this.populateQueue(latestQueue);
      if (populated.length > 0) {
        return (<QueueItem queue={populated[0]}
                          key={populated[0]._id}
                          id={populated[0]._id}/>)
      }
      else {
        return  (<div className="no-queue-reports">No queue reports yet</div>)
      }
    } else {
        return  (<div className="no-queue-reports">No queue reports yet</div>)
      }
  }



  render() {
    return (
      <div className="row" id="latest-queue-item">
        <h5>Latest queue report:</h5>
        {this.renderQueueItem()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statequeues: state.queue,
    user: state.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // userNotification: (message) => {dispatch(userNotification(message));},
    // triggerNotification: () => {dispatch(triggerNotification());},
    // activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QueueList);
