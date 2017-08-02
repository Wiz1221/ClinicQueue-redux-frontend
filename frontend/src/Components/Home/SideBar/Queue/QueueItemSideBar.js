import React, { Component } from 'react';
import {cuttingCommentShort, dateParse, queueBorderParse, queueClassParse} from '../../../../API/API'

import './QueueItemSideBar.css';

class QueueItemSideBar extends Component {


  render() {
    const queue = this.props.queue;
    const commentShort = cuttingCommentShort(queue.comment)
    return (
      <div >
        {queue.user.role =="clinicAdmin" && queue.user.myClinic === queue.clinic._id ?
        (<div className={"queueItem-sidebar "+ queueBorderParse(queue.status) + " container"}>
          <img src={queue.pic} className="queue-sidebar-image"/>
          <p className="queue-timestamp">Submitted at {dateParse(queue.createdAt,8)}</p>
          <p className="queue-sidebar-comments">"{commentShort}"</p>
            <p>Queue status:</p>
            <div className={"queue-status "+ queueClassParse(queue.status)}>{queue.status}</div>

        </div>) : (
        <div className="queueItem-sidebar container">
          <img src={queue.pic} className="queue-sidebar-image"/>
          <p className="queue-timestamp">Submitted at {dateParse(queue.createdAt,8)}</p>
          <p className= "queue-user">by @{queue.user.username}</p>
          <p className="queue-sidebar-comments">"{commentShort}"</p>
        </div> )}
      </div> )
  }
}

export default QueueItemSideBar;
