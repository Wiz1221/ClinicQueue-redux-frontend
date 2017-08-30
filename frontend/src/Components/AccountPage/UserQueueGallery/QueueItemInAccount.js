import React, { Component } from 'react';
import { cuttingCommentShort, dateParse, queueBorderParse, queueClassParse } from '../../../API/API'

import './QueueItemInAccount.css';

class QueueItemInAccount extends Component{

  onClick = () => {
    this.props.deleteQueueButton(this.props.queue);
  }

  checkUserRole = (queue) => {
    if(this.props.user.myClinic === queue.clinic._id){
      return {
        border: queueBorderParse(queue.status),
        containerType: 'queueItem-account-clinicAdmin'
      }
    }else{
      return {
        border: '',
        containerType: 'queueItem-account-regular'
      }
    }
  }

  render(){
    const queue = this.props.queue;
    const commentShort = cuttingCommentShort(queue.comment)
    const dynamicClassName = this.checkUserRole(queue)
    return(
      <div className={"queueItem-account " + dynamicClassName.border +" "+ dynamicClassName.containerType + " container"}>
        <a className="boxclose" onClick={this.onClick}></a>
        <img src={queue.pic} className="queue-sidebar-image queue-image-for-account" />
        <div className="queue-info-for-account">
            <div className="queue-account-clinicName">For {queue.clinic.properties.name_full}</div>
            <p className="queue-timestamp queue-for-account">Submitted at {dateParse(queue.createdAt,8)}</p>
            <p className="queue-sidebar-comments queue-for-account">"{commentShort}"</p>
            {
              queue.status ?
              (<div>
                <p>Queue status:</p>
                <div className= {"queue-status-sidebar " + queueClassParse(queue.status)}>{queue.status}</div>
               </div>) : null
            }
        </div>
      </div>

    )
  }
}

export default QueueItemInAccount;
