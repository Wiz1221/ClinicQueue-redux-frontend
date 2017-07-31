import React, { Component } from 'react';

import QueueItem from './QueueItem';

import './QueueList.css'

class QueueList extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  renderQueueItem = () => {
    let queueArray = this.props.queue;
    // an empty array is truthy; queueArray is [] by default. check for first array element instead
    if (this.props.queue.length > 0) {
      const latestQueue = queueArray[0]
      return (<QueueItem queue={latestQueue}
                        key={latestQueue._id}
                        id={latestQueue._id}/>)

    } else {
        return  (<div className="no-queue-reports">No queue reports yet</div>)
      }
      // return queueArray.map((queue) => {
      //   return (
      //     <QueueItem queue={queue}
      //                key={queue._id}
      //                id={queue._id}/>
  }

  render() {
    return (
      <div >
        {this.renderQueueItem()}
      </div>
    );
  }
}

export default QueueList;
