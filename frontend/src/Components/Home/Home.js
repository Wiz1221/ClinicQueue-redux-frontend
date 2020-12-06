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
        <div className="alertWatch">NOTICE: Both Singhealth QueueWatch and NHG See Me In Line (S.M.I.L.E) services have been deprecated as of September 2019. As such, there is no longer any real-time queue data for any polyclinics. This website is maintained for historical interest and displays the queue situation as of September 5 2019, the last day queue data was available. If you have any questions, send them to <a href="mailto:admin@hanifsamad.com<">admin@hanifsamad.com</a></div>
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
