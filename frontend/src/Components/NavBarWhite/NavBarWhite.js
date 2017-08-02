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
    this.state={
      width: null,
      menuTop: false
    }
  }

  execLogout = (e) => {
    //console.log(this.props.user)
    //e.preventDefault();
    this.props.Logout();
    //window.location.href = "/";
  }
  getWidth = () => {
    let myWidth = window.innerWidth;
    console.log(myWidth);
    this.setState({
      width: myWidth
    });
  }
  componentWillMount() {
    this.setState({
      width: window.innerWidth
    })
  }
  componentDidMount() {
    window.addEventListener("resize", this.getWidth.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.getWidth.bind(this));
  }

  showMenu = () => {
    console.log("burger Menu!!")
    if(this.state.menuTop) {
      this.setState({
        menuTop: false
      });
    }else {
      this.setState({
        menuTop: true
      });
    }
  }
  toggleMenu = () => {
    if (this.state.menuTop) {
      return{
        top: 70
      }
    }else {
      return{
        top: -200
      }
    }
  }

  removeActiveClinicAndNearestClinic = () => {
    this.props.removeActiveClinic();
    this.props.nearestClinicOff();
  }

  render() {
    return (
      <div >
        {this.state.width < 767 ? (
          <div >
            <nav className="navbar-fixed-top NavbarWhite">
              <Link to ='/'>
                <a onClick={this.removeActiveClinicAndNearestClinic}>
                  <img src={logo} width={50} height={50} className="logo"/>
                </a>
              </Link>
              <div className="burgerMenuAreaWhite" onClick={this.showMenu}></div>
              <div className="burgerMenuWhite pull-right"></div>
            </nav>

              <div className='menusWhite' style={this.toggleMenu()}>
                <div className='menuItemWhite'>
                  <Link to='/' className="smallMenuBtnWhite">Back</Link>
                </div>
                <div className='menuItemWhite'>
                  {this.props.user._id ? <Link to='/myAccount' className="smallMenuBtnWhite">My account</Link> : null}
                </div>

                <div className='menuItemWhite'>
                  {this.props.user._id ? <Link to='/' className="smallMenuBtnWhite" onClick={this.execLogout}>Logout</Link> :
                  <Link to='/login' className="smallMenuBtnWhite" onClick={this.clearNotifi}>Login</Link>}
                </div>
              </div>
          </div>

        ) : (

        <nav className="NavbarWhite navbar-fixed-top" >
        <Link to ='/' onClick={this.removeActiveClinicAndNearestClinic}>
          <a>
            <img src={logo} width={50} height={50} className="logoColor"/>
            <p className='logoNameColor'>ClinicQueueSG</p>
          </a></Link>

        <Link to='/' className="homeBtnWhite">Back</Link>
        {this.props.user._id ? <Link to='/myAccount' className="homeBtnWhite">My Account</Link> : null}
          {this.props.user._id ? <Link to='/' className="navLoginWhite pull-right" onClick={this.execLogout}>Logout</Link> :
          <Link to='/login' className="navLoginWhite pull-right">Login</Link>}

        </nav>)}
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
