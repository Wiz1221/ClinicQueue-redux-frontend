import React, { Component } from 'react';
import { connect } from 'react-redux';

import { submitQueue } from '../../../../Actions/Queue';

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
      missing: false
    }
  }

  onChange = (event) => {
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

  postQueue = () => {
    if(this.props.user._id){
      if(!this.state.pic){
        this.setState({
          missing: true,
          adminMessage: "Please upload a picture of Queue"
        })
      }else{
        let newQueue = this.state.queue;
        newQueue.user_id = this.props.user._id;
        newQueue.clinic_id = this.props.clinic._id;
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
    return (
      <div id="submitQueue">
        <div className="adminMessage">{
          this.state.missing? (this.state.adminMessage) : (this.state.submitSuccessful? "Submited successfully" : null)
        }</div>
        <h4>Submit Queue</h4>
          <div className="form-group">
            <label>Upload the latest Queue</label>
            <input id="pic"
                   type="file"
                   className="form-control-file"
                   aria-describedby="fileHelp"
                   onChange={this.onChange}
                   />
          </div>
          <div className="form-group">
            <label>Comments</label>
            <textarea id="comment"
                      className="form-control"
                      rows={3}
                      placeholder="Enter comments here"
                      onChange={this.onChange}
                      value={this.state.queue.comment? this.state.queue.comment: ""}/>
          </div>
          {
            this.state.submitSuccessful ? (
              <button type="submit" className="btn btn-primary queueButton" onClick={this.closeQueueBox}>back to Clinic Info</button>
            ):(
              <div>
              <button type="submit" className="btn btn-primary queueButton" onClick={this.postQueue}>Submit</button>
              <button type="submit" className="btn btn-danger queueButton" onClick={this.closeQueueBox}>Discard and go back to Clinic Info</button>
              </div>
            )
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitQueue: (pic, newQueue) => { dispatch(submitQueue(pic, newQueue))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitQueue);
