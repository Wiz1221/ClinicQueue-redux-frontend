import React, {Component} from 'react';
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import About from '../About/About';
import NotificationBar from './NotificationBar/NotificationBar';

// Components
import Map from './Map/Map';
import Legend from '../Legend/Legend';

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
        <Legend/>
        <div className="alertWatch">NOTICE: Singhealth QueueWatch service has been inactive since September 2018. As such, there is no queue data for Bedok, Bukit Merah, Geylang, Marine Parade, Outram, Pasir Ris, Queenstown, Sengkang and Tampines polyclinics till further notice.</div>
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
