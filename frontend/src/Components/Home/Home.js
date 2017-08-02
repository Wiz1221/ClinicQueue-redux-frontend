import React, {Component} from 'react';
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import About from '../About/About';
import NotificationBar from './NotificationBar/NotificationBar';
import ErrorNotificationBar from './ErrorNotificationBar/ErrorNotificationBar';

// Components
import Map from './Map/Map';

//Actions
import { minNavBarOff } from '../../Actions/AppAction';


// Css
import './Home.css'

class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {

    return (
      <div>
        {this.props.minNavBarOff()}
        <NavBar/>
        <NotificationBar/>
        { this.props.activeClinic._id ? ( <SideBar/> ) : null }

        <About />
        <Map />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //user: state.user
    clinic: state.clinic,
    activeClinic: state.activeClinic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    minNavBarOff: () => {dispatch(minNavBarOff());}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
