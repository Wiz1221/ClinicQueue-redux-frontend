import React, { Component } from 'react';
import { connect } from 'react-redux';

import QueueItem from './QueueItem';

class QueueGallery extends Component {
  
  renderClinicAdminQueueItem = () => {
    let queueArray = this.props.queue;
    console.log(queueArray)
    if (queueArray.length===0) {
      return  (<div>No Queues yet</div>)
    } else {
      let queueFromAdmin = queueArray.filter((queue,index) => {
        return queue.user.role == "clinicAdmin";
      })
      console.log(queueFromAdmin)
      return queueFromAdmin.map((queue) => {
        return (
          <QueueItem queue={queue}
                    key={queue._id}
                    id={queue._id}/>
        )
      });
    }
  }

  renderUserQueueItem = () => {

    let queueArray = this.props.queue;
    console.log(queueArray)
    if (queueArray.length===0) {
      return  (<div>No Queues yet</div>)
    } else {
      let queueFromUser = queueArray.filter((queue,index) => {
        return queue.user.role === "regularUser" || ""
      })
      return queueFromUser.map((queue) => {
        return (
          <QueueItem queue={queue}
                    key={queue._id}
                    id={queue._id}/>
        )
      });
    }
  }

  render() {
    // console.log(this.props.clinic.queue)
    // console.log("why is this not printing?")
    return (
      <div >
        <div>From Clinic
          {this.renderClinicAdminQueueItem()}
        </div>
        <div >
        From User
          {this.renderUserQueueItem()}
        </div>
      </div>
    );
  }
}


export default QueueGallery;
