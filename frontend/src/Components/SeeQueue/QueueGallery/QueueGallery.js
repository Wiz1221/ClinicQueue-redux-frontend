import React, { Component } from 'react';
import { connect } from 'react-redux';

import QueueItem from './QueueItem';

class QueueGallery extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  renderClinicAdminQueueItem = () => {
    let queueArray = this.props.queue;

    if (!this.props.queue) {
      return  (<div>No Queues yet</div>)
    } else {
      let queueFromAdmin = queueArray.filter((queue,index) => {
        return queue.user.role !== "regularUser"
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
    let queueArray = this.props.queue;

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
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
            <h4>{this.props.activeClinic.properties.name_full}</h4>
            <h5>From ClinicAdmin </h5>
            {this.renderClinicAdminQueueItem()}
            </div>
          </div>
          <div className="col-md-12">
            <div>
              <h5>From random User</h5>
              {this.renderUserQueueItem()}
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
