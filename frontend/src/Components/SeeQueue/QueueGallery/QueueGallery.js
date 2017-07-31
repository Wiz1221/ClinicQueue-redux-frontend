import React, { Component } from 'react';
import { connect } from 'react-redux';

import QueueItem from './QueueItem';

class QueueGallery extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  renderClinicAdminQueueItem = (queueArray) => {
    //let queueArray = this.props.activeClinic.queue;

    if (queueArray.length <= 0) {
      return  (<div>No Queues yet</div>)
    } else {
      let queueFromAdmin = queueArray.filter((queue,index) => {
        return queue.user.role == "clinicAdmin";
      })
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
    let queueArray = this.props.activeClinic.queue;

    if (!this.props.queue) {
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
    const activeClinic = this.props.activeClinic;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
            <h4>{Object.getOwnPropertyNames(activeClinic).length > 0 ? activeClinic.properties.name_full : null}</h4>
            <h5>From Clinic Admin </h5>
            {Object.getOwnPropertyNames(activeClinic).length > 0 ? this.renderClinicAdminQueueItem(activeClinic.queue) : null}
            </div>
          </div>
          <div className="col-md-12">
            <div>
              <h5>From Users</h5>
              {Object.getOwnPropertyNames(activeClinic).length > 0 ? this.renderUserQueueItem(): null}
            </div>
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
    // minNavBarOn: () => {dispatch(minNavBarOn());}
    // activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueGallery);
