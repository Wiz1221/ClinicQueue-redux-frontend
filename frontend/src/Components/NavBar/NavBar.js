import React, {PropTypes} from 'react';

// impoprt react router dom to link the login button to login page
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
//import { Navbar, Nav, NavItem} from 'react-bootstrap';
import logo from '../../ClinicQueue_White.png';

import './NavBar.css';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        <nav className="Navbar navbar-fixed" >
          <a href="#">
            <img src={logo} width={50} height={50} className="logo"/>
            <p className='logoName'>ClinicQueueSG</p>
          </a>
          <a className="nearsetBtn">Nearest Clinic</a>
          <a className="sideBarBtn">Side Bar</a>

          <Link to='/login' className="navLogin pull-right">Login</Link>

          <div className="box pull-right">
            <div className="container-2">
                <span className="icon"><i className="fa fa-lg fa-search"></i></span>
                <input type="search" name="search" id="search" placeholder="Search..." />
            </div>
          </div>

        </nav>

      </div>
    );
  }
}

NavBar.propTypes = {
};
