import React, {Component} from 'react';
import { connect } from 'react-redux';

// impoprt react router dom to link the login button to login page
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

//import { Navbar, Nav, NavItem} from 'react-bootstrap';

// import SearchBar from './SearchBar/SearchBar';
import DropDownItem from './DropDownItem/DropDownItem';
import logo from '../../ClinicQueue_White.png';

// Actions
import { activeClinic, removeActiveClinic } from '../../Actions/ClinicAction';
import { localLogout } from '../../Actions/UserAction';
import { nearestClinic, nearestClinicOff } from '../../Actions/AppAction';

import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      clinicDropDownList: [],
      searching: false,
    }
  }

  onChange = (event) => {

    let clinicDropDownList = this.props.clinic.filter((clinic,index) => {
      return clinic.properties.name_full.toLowerCase().includes(event.target.value.toLowerCase());
    })

    clinicDropDownList.sort( (a,b) => {
      const aLower = a.properties.name_full.toLowerCase()
      const bLower = b.properties.name_full.toLowerCase()
      const valueLower = event.target.value.toLowerCase()
      const queryPosA = aLower.indexOf(valueLower)
      const queryPosB = bLower.indexOf(valueLower)
      if (queryPosA !== queryPosB) {
        return queryPosA - queryPosB
      }
      return aLower < bLower ? -1 : 1
    })

    this.setState({
      searchTerm: event.target.value,
      clinicDropDownList: clinicDropDownList
    })
  }

  dropDownItemClicked = (clinic) => {
    this.props.nearestClinicOff()
    this.props.activeClinic(clinic);
  }

  renderDropDown = () => {
    if(this.state.searching){
      return this.state.clinicDropDownList.map((clinic,index) => {
        return (
          <DropDownItem clinic={clinic} onClick={this.dropDownItemClicked} key={clinic._id}/>
        )
      })
    }
  }

  onFocus = () => {
    this.setState({
      searching: true,
      clinicDropDownList: this.props.clinic
    })
  }

  onBlur = () => {
    setTimeout(()=>{
      this.setState({
        searching: false,
        clinicDropDownList: [],
        searchTerm:""
      })
    },200)
  }

  clickNearestClinic = () => {
    this.props.removeActiveClinic();
    this.props.nearestClinic();
  }

  execLogout = (e) => {
    console.log(this.props.user)
    //e.preventDefault();
    this.props.Logout();
    //window.location.href = "/";
  }

  render() {

    return (
      <div >
        <nav className="Navbar navbar-fixed" >
          <a href="/">
            <img src={logo} width={50} height={50} className="logo"/>
            <p className='logoName'>ClinicQueueSG</p>
          </a>

          <a className="nearsetBtn" onClick={this.clickNearestClinic}>My Nearest Clinic</a>
          {this.props.user._id ? <Link to='/MyAccount' className="sideBarBtn">My account</Link> : null}

          {this.props.user._id ? <Link to='/' className="navLogin pull-right" onClick={this.execLogout}>Logout</Link> :
          <Link to='/login' className="navLogin pull-right">Login</Link>}

          <div className="box pull-right">
            <div className="container-2">
                <span className="icon"><i className="fa fa-lg fa-search"></i></span>
                <input className="searchList"
                       type="search"
                       name="search"
                       id="search"
                       value={this.state.searchTerm ? this.state.searchTerm:""}
                       placeholder="Search Clinic"
                       onChange={this.onChange}
                       onFocus={this.onFocus}
                       onBlur={this.onBlur}
                       />

            </div>
          </div>
          {this.state.searching?(<div className="dropDownList" >{this.renderDropDown()}</div>): null}

        </nav>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clinic: state.clinic,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
    removeActiveClinic: () => {dispatch(removeActiveClinic())},
    Logout: () => {dispatch(localLogout());},
    nearestClinic: () => {dispatch(nearestClinic())},
    nearestClinicOff: () => {dispatch(nearestClinicOff())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
