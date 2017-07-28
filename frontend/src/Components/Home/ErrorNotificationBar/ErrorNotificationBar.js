import React, {Component} from 'react';
import { connect } from 'react-redux';

import { clearNotif } from '../../../Actions/AppAction';

import './ErrorNotificationBar.css';

class NotificationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNotification:false,
      class: 'animated fadeInDownBig notificationBar'
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.notification !== ""){
      console.log(nextProps)
      this.setState({
        newNotification: true,
        class: 'animated fadeInDownBig notificationBar'
      })
    }else{
      console.log("else", nextProps)
      this.notifDisappear()
      setTimeout(()=>{
        this.setState({
          newNotification: false});
      }, 500)

    }

  }

  notifDisappear = () => {
      this.setState({
        class: 'fadeOutUp animated notificationBar'
  })
}

  renderNotificationMessage = () => {
    console.log(this.state.class);
    if(this.state.newNotification){
      return (<div className={this.state.class}><p>Please Login to Subscribe</p></div>)
    } else {
      return<div></div>
    }
  }

  consoleLog = () => {
    console.log(this.state.class);
  }

  render() {
    return (
      <div>
        {this.renderNotificationMessage()}

      </div>
    );
  }
}

// {this.props.user._id ?
//   <div className={this.state.class}><p>{this.renderNotificationMessage()}</p></div>
//   : <div></div> }
// {this.notifDisappear()}

NotificationBar.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notification: state.notification
    //clinic: state.clinic,
    //activeClinic: state.activeClinic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearNotif: () => {dispatch(clearNotif());}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);
