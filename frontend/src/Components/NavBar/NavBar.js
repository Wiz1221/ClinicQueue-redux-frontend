import React, {PropTypes} from 'react';
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
          <a href='#' className="navLogin pull-right">Login</a>

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
