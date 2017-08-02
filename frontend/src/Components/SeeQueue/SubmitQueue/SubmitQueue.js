import React, { Component } from 'react';
import { connect } from 'react-redux';

import QueueStatus from './QueueStatus';

import { submitQueue } from '../../../Actions/QueueAction';
import { userNotification } from '../../../Actions/UserAction';
import { triggerNotification } from '../../../Actions/AppAction';

import './SubmitQueue.css';

class SubmitQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: {},
      pic: null,
      adminMessage:"",
      isLoggedIn: false,
      submitSuccessful: false,
      missing: false,
      Qstatus: false
    }
  }

  componentWillReceiveProps(nextProps){
    //console.log(this.props.clinic)
  }

  statusButtonClicked = (status) => {
    let queue = this.state.queue
    queue.status = status
    console.log("queueS:"+queue.status)
    this.setState({
      queue: queue
    })
  }

  onChange = (event) => {
    event.preventDefault();
    let queue = this.state.queue;
    if(event.target.id==="pic"){
      this.setState({
        pic: event.target.files[0]
      })
    }else{
      queue[event.target.id] = event.target.value;
    }
    this.setState({
      queue: queue
    })
  }

  postQueue = (event) => {
    event.preventDefault();
    if(this.props.user._id){
      if(!this.state.pic){
        this.props.triggerNotification();
        this.props.userNotification("Please upload a picture of the current queue situation");
        this.setState({
          missing: true,
          adminMessage: "Please upload a picture of Queue"
        })
      }else{


        // if(this.state.user.role==="clinicAdmin"&&!this.state.queue.status){
        //   this.setState({
        //     missing: true,
        //     adminMessage: "Please select a clinic status"
        //   })
        //   return;
        // }

        let newQueue = this.state.queue;

        newQueue.user_id = this.props.user._id;
        newQueue.clinic_id = this.props.clinic._id;
        console.log(newQueue)
        /*
        how newQueue looks like
        {
          pic: file/url, (at submitting stage, this field does not exist, but when backend comes back, this field will be populated)
          comment: String,
          user_id:
          clinic_id:
        }
        */
        this.props.submitQueue(this.state.pic, newQueue);
        this.setState({
          submitSuccessful: true,
          missing: false,
          adminMessage: ""
        })
      }
    }else{
      this.props.triggerNotification();
      this.props.userNotification("Please login to submit Queue report");
      this.setState({
        missing: true,
        adminMessage: "Please login to submit Queue report"
      })
    }
  }

  closeQueueBox = () => {
    this.props.backToClinicInfo();
  }

  render() {

    const activeClinic = this.props.activeClinic;
    return (
      <div id="submitQueue container">
        <div className="adminMessage">{
          this.state.missing? (this.state.adminMessage) : (this.state.submitSuccessful? "Submited successfully" : null)
        }</div>
        <h4>Submit a Queue report for</h4>
        <h4>{Object.getOwnPropertyNames(activeClinic).length > 0 ? activeClinic.properties.name_full : null}</h4>
        <div className="row-fluid row-upload-file">
          <div className="form-group">
            <p>Upload a picture of the current queue situation: </p>
            <input id="pic"
                   type="file"
                   className="form-control-file"
                   aria-describedby="fileHelp"
                   onChange={this.onChange}
                   />
          </div>

          </div>
          {this.props.user._id ?
          (this.props.user.role === "clinicAdmin" || "appAdmin")&&(this.props.clinic._id===this.props.user.myClinic)  ? (
              <div className="well well-status">
                <p>Please select a Queue Status:</p>
                {this.state.queue.status == "Light" ? <div className="selectedStatus1">Light</div> : null }
                {this.state.queue.status == "Normal" ? <div className="selectedStatus2">Normal</div> : null }
                {this.state.queue.status == "Busy" ? <div className="selectedStatus3">Busy</div> : null }
                {this.state.queue.status == "Very Busy" ? <div className="selectedStatus4">Very Busy</div> : null }
              <hr/>
                <QueueStatus onClick={this.statusButtonClicked} onFocus={this.btnFocus} onBlur={this.btnBlur}/>
              </div>
          ) : null : null}

          <div className="form-group">
            <label>Comments</label>
            <textarea id="comment"
                      className="form-control"
                      rows={3}
                      placeholder="Enter comments here"
                      onChange={this.onChange}
                      value={this.state.queue.comment? this.state.queue.comment: ""}/>
          </div>
          <button type="button" className=" queueButton" onClick={this.postQueue}>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    activeClinic: state.activeClinic,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitQueue: (pic, newQueue) => { dispatch(submitQueue(pic, newQueue))},
    userNotification: (message) => {dispatch(userNotification(message));},
    triggerNotification: () => {dispatch(triggerNotification());},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitQueue);
