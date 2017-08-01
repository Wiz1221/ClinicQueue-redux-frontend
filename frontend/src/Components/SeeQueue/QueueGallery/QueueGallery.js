import React, { Component } from 'react';
import { connect } from 'react-redux';

import QueueItem from './QueueItem';

class QueueGallery extends Component {

  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(nextProps) {
    console.log("queue gallery went into nextProps!")
  }

  renderClinicAdminQueueItem = (queueArray) => {
    // let queueArray = this.props.queue;
    console.log(queueArray)
    if (queueArray.length===0) {
      return  (<div>No Queues yet</div>)
    } else {
      let queueFromAdmin = queueArray.filter((queue,index) => {
        return queue.user._id ?  queue.user.role == "clinicAdmin" : null;
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
        return queue.user._id ? queue.user.role === "regularUser" || "" : null
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
    console.log("Repopulated queue array from activeClinic");
    console.log(this.props.queue);
    let subject = [];
    if(typeof(this.props.queue[0])==="undefined") {
      subject = [];
    } else {
      subject = this.props.queue;
    }
    console.log("subject");
    console.log(subject);

    const activeClinic = this.props.activeClinic;

    return (
      <div className="container queueGallery">
        <div className="row">
          <h2>Queue Gallery</h2>
            <h4>by {Object.getOwnPropertyNames(activeClinic).length > 0 ? activeClinic.properties.name_full : null} Admin</h4>
            <div className="row">
            {this.renderClinicAdminQueueItem(subject)}
            </div>
        </div>
        <div className="row">
          <h4>by Users</h4>
          <div className="row" id="gallery">
            {this.renderUserQueueItem(subject)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clinic: state.clinic,
    activeClinic: state.activeClinic,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueGallery);
