import React, { Component } from 'react';
import { connect } from 'react-redux';

import QueueItem from './QueueGallery/QueueItem';

class QueueShow extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.activeClinic)
  }

  renderClinicAdminQueueItem = () => {
    let queueArray = this.props.activeClinic.queue;
    console.log(queueArray)
    if (queueArray.length===0) {
      return  (<div>No Queues yet</div>)
    } else {
      let queueFromAdmin = queueArray.filter((queue,index) => {
        return queue.user.role !== "regularUser"
      })
      console.log(queueFromAdmin)
      return queueFromAdmin.map((queue) => {
        return (
          <QueueItem queue={queue}
                    key={queue._id}
                    id={queue._id}
                     />
        )
      });
    }
  }

  renderUserQueueItem = () => {
    let queueArray = this.props.activeClinic.queue;
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
                    id={queue._id}
                     />
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
// {this.renderClinicAdminQueueItem()}
//   {this.renderUserQueueItem()}

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

export default connect(mapStateToProps, mapDispatchToProps)(QueueShow);
