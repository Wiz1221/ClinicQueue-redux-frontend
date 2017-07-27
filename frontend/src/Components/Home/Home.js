import React, {Component} from 'react';
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import About from '../About/About';
import NotificationBar from './NotificationBar/NotificationBar';

// Components
import Map from './Map/Map';


// Css
import './Home.css'

class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {

    return (
      <div>

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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
