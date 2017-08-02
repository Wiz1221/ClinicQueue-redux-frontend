import React, {Component} from 'react';
import { connect } from 'react-redux';

// impoprt react router dom to link the login button to login page
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

//import { Navbar, Nav, NavItem} from 'react-bootstrap';

// import SearchBar from './SearchBar/SearchBar';
import logo from '../../ClinicQueue_Color.png';

// Actions
import { activeClinic, removeActiveClinic } from '../../Actions/ClinicAction';
import { localLogout } from '../../Actions/UserAction';
import { nearestClinicUser, nearestClinicOff, triggerNotification } from '../../Actions/AppAction';

import './NavBarWhite.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  execLogout = (e) => {
    console.log(this.props.user)
    //e.preventDefault();
    this.props.Logout();
    //window.location.href = "/";
  }

  removeActiveClinicAndNearestClinic = () => {
    this.props.removeActiveClinic();
    this.props.nearestClinicOff();
  }

  render() {
    console.log(this.props.match)
    return (
      <div >
        <nav className="NavbarWhite navbar-fixed-top" >
        <Link to ='/' onClick={this.removeActiveClinicAndNearestClinic}>
          <a>
            <img src={logo} width={50} height={50} className="logoColor"/>
            <p className='logoNameColor'>ClinicQueueSG</p>
          </a></Link>

        <Link to='/' className="homeBtnWhite">Home</Link>
        {this.props.match ? <Link to='/MyAccount' className="homeBtnWhite">My Account</Link> : null}
          {this.props.user._id ? <Link to='/' className="navLoginWhite pull-right" onClick={this.execLogout}>Logout</Link> :
          <Link to='/login' className="navLoginWhite pull-right">Login</Link>}

        </nav>
      </div>
    );
  }
}

// onClick={this.removeActiveClinicAndNearestClinic}

const mapStateToProps = (state) => {
  return {
    clinic: state.clinic,
    user: state.user,
    minNavBar: state.minNavBar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
    removeActiveClinic: () => {dispatch(removeActiveClinic())},
    Logout: () => {dispatch(localLogout());},
    nearestClinicUser: () => {dispatch(nearestClinicUser())},
    nearestClinicOff: () => {dispatch(nearestClinicOff())},
    triggerNotification: () => {dispatch(triggerNotification())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
