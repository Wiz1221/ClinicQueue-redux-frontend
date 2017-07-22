import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { push as Menu } from 'react-burger-menu';

//import { Navbar, Nav, NavItem} from 'react-bootstrap';


class Header extends Component {
  constructor(props) {
    super(props);
  }
  showSettings (event) {
    event.preventDefault();
  }

  //
  // <Navbar>
  //   <Navbar.Header>
  //     <Navbar.Brand>
  //       <a className='cq'>ClinicQueues</a>
  //       <span className='sg'>SG</span>
  //     </Navbar.Brand>
  //     <Navbar.Toggle />
  //   </Navbar.Header>
  //   <Navbar.Collapse>
  //
  //     <Nav pullRight className="rightNavBar">
  //       <p>At a clinic? Submit a queue report <Link to='/login'><span>Login</span></Link></p>
  //     </Nav>
  //
  //
  //   </Navbar.Collapse>
  // </Navbar>


  render() {
    return (
      <div>

        <Menu>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="/about">About</a>
          <a id="contact" className="menu-item" href="/contact">Contact</a>
          <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
        </Menu>

      </div>
    );
  }
}
//
// <Nav>
//   <NavItem eventKey={1} href="#">Link</NavItem>
// </Nav>

const mapStateToProps = (state) => {

  return {
    //user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
