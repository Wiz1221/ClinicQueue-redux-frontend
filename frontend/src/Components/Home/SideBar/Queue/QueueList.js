import React, { Component } from 'react';

import QueueItem from './QueueItem';

class QueueList extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  renderQueueItem = () => {
    let queueArray = this.props.queue;

    if (!this.props.queue) {
      return  (<div>No Queues yet</div>)
    } else {
      return queueArray.map((queue) => {
        return (
          <QueueItem queue={queue}
                    key={queue._id}
                    id={queue._id}
                     />
        )
      });
    }
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
