import React, {Component} from 'react';
import { connect } from 'react-redux';

import './NotificationBar.css';

class NotificationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: 'animated fadeInDownBig notificationBar'
    }
  }

  notifDisappear = () => {
    setTimeout(()=>{
      this.setState({
        class: 'fadeOutUp animated notificationBar'
      });
    },5000)
  }

  consoleLog = () => {
    console.log(this.state.class);
  }

  render() {
    return (
      <div>
        {this.props.user._id ?
          <div className={this.state.class}><p>Welcome {this.props.user.username}!</p></div>
          : <div></div> }
        {this.notifDisappear()}
      </div>
    );
  }
}

NotificationBar.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    user: state.user
    //clinic: state.clinic,
    //activeClinic: state.activeClinic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);
