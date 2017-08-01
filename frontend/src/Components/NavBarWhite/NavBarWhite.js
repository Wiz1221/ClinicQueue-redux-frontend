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
import { nearestClinic, nearestClinicOff, triggerNotification } from '../../Actions/AppAction';

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
                  <Link to='/' className="smallMenuBtnWhite">Home</Link>
                </div>
                <div className='menuItemWhite'>
                  {this.props.user._id ? <Link to='/MyAccount' className="smallMenuBtnWhite">My account</Link> : null}
                </div>

                <div className='menuItemWhite'>
                  {this.props.user._id ? <Link to='/' className="smallMenuBtnWhite" onClick={this.execLogout}>Logout</Link> :
                  <Link to='/login' className="smallMenuBtnWhite" onClick={this.clearNotifi}>Login</Link>}
                </div>
              </div>
          </div>

        ) : (

        <nav className="NavbarWhite navbar-fixed-top" >
        <Link to ='/'>
          <a onClick={this.removeActiveClinicAndNearestClinic}>
            <img src={logo} width={50} height={50} className="logoColor"/>
            <p className='logoNameColor'>ClinicQueueSG</p>
          </a></Link>

        <Link to='/' className="homeBtnWhite">Home</Link>
        {this.props.user._id ? <Link to='/MyAccount' className="homeBtnWhite">My Account</Link> : null}
          {this.props.user._id ? <Link to='/' className="navLoginWhite pull-right" onClick={this.execLogout}>Logout</Link> :
          <Link to='/login' className="navLoginWhite pull-right">Login</Link>}

        </nav>)}
      </div>
    );
  }
}

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
    nearestClinic: () => {dispatch(nearestClinic())},
    nearestClinicOff: () => {dispatch(nearestClinicOff())},
    triggerNotification: () => {dispatch(triggerNotification())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
