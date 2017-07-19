import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Navbar, Nav, NavItem} from 'react-bootstrap';


class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'><a href='/'>ClinicQueues</a></Link>
              <span className='sg'>SG</span>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>

            <Nav pullRight className="rightNavBar">
              <p>At a clinic? Submit a queue report <Link to='/login'><span>Login</span></Link></p>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
