import React, {Component} from 'react';
import { connect } from 'react-redux';

import { switchOffNotification } from '../../../Actions/AppAction';
import './NotificationBar.css';

class NotificationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: '',
      notification: ''
    }
  }

  notifDisappear = () => {
    setTimeout(()=>{
      this.setState({
        class: 'fadeOutUp animated notificationBar',
      });

      console.log("in setTimeout");
      this.props.switchOffNotification();
    },2000)
  }

  renderNotificationMessage = (notification) => {
    switch (notification) {
      case "Welcome":
          return (<div className={this.state.class}><p>Welcome {this.props.user.username}!</p></div>)
        break;
      default:
        return (<div className={this.state.class}><p>{notification}</p></div>)
      // case "Please Login to Subscribe":
      //   return (<div className={this.state.class}><p>Please Login to Subscribe</p></div>)
      //   break;
      // default:
      //   if(this.props.user._id){
      //     return (
      //       <div className={this.state.class}><p>Welcome {this.props.user.username}!</p></div>
      //     )
      //   }else{
      //     return;
      //   }
      //   break;
    }
  }

  consoleLog = () => {
    console.log(this.state.class);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.trigger) {
      console.log("receiving next props!");
      this.setState({
        class: 'animated fadeInDownBig notificationBar',
        notification: nextProps.notification
      });
      this.notifDisappear();
    }

  }

  render() {
    return (
      <div>
      {this.renderNotificationMessage(this.state.notification)}
      </div>
    );
  }

}

// {this.props.user._id ?
//   <div className={this.state.class}><p>{this.renderNotificationMessage()}</p></div>
//   : <div></div> }
// {this.notifDisappear()}

// NotificationBar.propTypes = {
// };

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notification: state.notification,
    trigger: state.trigger
    //clinic: state.clinic,
    //activeClinic: state.activeClinic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchOffNotification: () => {dispatch(switchOffNotification());},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);
