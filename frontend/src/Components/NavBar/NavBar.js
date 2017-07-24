import React, {Component} from 'react';
import { connect } from 'react-redux';
//import { Navbar, Nav, NavItem} from 'react-bootstrap';

// import SearchBar from './SearchBar/SearchBar';
import DropDownItem from './DropDownItem';
import logo from '../../ClinicQueue_White.png';

// Actions
import { activeClinic } from '../../Actions/Clinic';

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
      return clinic.properties.name_full.toLowerCase().includes(event.target.value);
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
    },100)
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

          <a href='#' className="navLogin pull-right">Login</a>
          <div className="box pull-right">
            <div className="container-2">
                <span className="icon"><i className="fa fa-lg fa-search"></i></span>
                <input className="searchList"
                       type="search"
                       name="search"
                       id="search"
                       value={this.state.searchTerm ? this.state.searchTerm:""}
                       placeholder="Search..."
                       onChange={this.onChange}
                       onFocus={this.onFocus}
                       onBlur={this.onBlur}
                       />

            </div>
          </div>
          <div className="pull-right dropDownList" >
            {this.renderDropDown()}
          </div>
        </nav>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clinic: state.clinic,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
