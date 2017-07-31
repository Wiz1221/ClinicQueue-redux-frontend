import React, { Component } from 'react';
import { connect } from 'react-redux';

import QueueItem from './QueueItem';

class QueueGallery extends Component {

  renderClinicAdminQueueItem = (queueArray) => {
    // let queueArray = this.props.queue;
    console.log(queueArray)
    if (queueArray.length===0) {
      return  (<div>No Queues yet</div>)
    } else {
      let queueFromAdmin = queueArray.filter((queue,index) => {
        return queue.user.role == "clinicAdmin";
      })
      console.log("queueFromAdmin");
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

  renderUserQueueItem = (queueArray) => {

    // let queueArray = this.props.queue;
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
    console.log("Queue gallery from activeClinic");
    console.log(this.props.queue);
    const queues = this.props.queue;
    const statequeues = this.props.statequeues;
    // replace the activeClinic queues with actual queue objects
    const newQueues = queues.map( (queue)=> {
      return statequeues.filter( (statequeue) => {
        return statequeue._id == queue._id;
      })[0];
    });
    console.log("repopulated queues from statequeues");
    console.log(newQueues);
    // {this.renderClinicAdminQueueItem(newQueues)}
    // {this.renderUserQueueItem(newQueues)}
    // console.log(this.props.clinic.queue)
    // console.log("why is this not printing?")
    return (
      <div >
        <div>From Clinic

        </div>
        <div >
        From User

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clinic: state.clinic,
    statequeues: state.queue,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueGallery);
