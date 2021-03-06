import React, {Component} from 'react';
import { connect } from 'react-redux';

// impoprt react router dom to link the login button to login page
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

//import { Navbar, Nav, NavItem} from 'react-bootstrap';

// import SearchBar from './SearchBar/SearchBar';
import DropDownItem from './DropDownItem/DropDownItem';
import logo from '../../ClinicQueue_White.png';
import { sortingAlgorithm } from '../../API/API';

// Actions
import { activeClinic, removeActiveClinic } from '../../Actions/ClinicAction';
import { localLogout } from '../../Actions/UserAction';
import { nearestClinicUser, nearestClinicOff, triggerNotification, clearNotif } from '../../Actions/AppAction';

import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      clinicDropDownList: [],
      searching: false,
      width: null,
      menuTop: false
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
    this.props.activeClinic({...clinic});

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
    this.props.nearestClinicUser();
  }

  removeActiveClinicAndNearestClinic = () => {
    this.props.removeActiveClinic();
    this.props.nearestClinicOff();
    // sortingAlgorithm(this.props.clinic)
  }

  execLogout = (e) => {
    console.log(this.props.user)
    //e.preventDefault();
    this.props.Logout();
    this.props.removeActiveClinic();
    this.props.nearestClinicOff();
    //window.location.href = "/";
  }
  clearNotifi = () => {
    this.props.clearNotif();
    this.props.removeActiveClinic();
    this.props.nearestClinicOff();
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
        {this.state.width < 910 ? (
          <div className="smallScreenNav">
            <nav className="Navbar">
              <Link to ='/'>
                <a onClick={this.removeActiveClinicAndNearestClinic}>
                  <img src={logo} width={60} height={60} className="logo"/>
                </a>
              </Link>
              <div className="burgerMenuArea" onClick={this.showMenu}></div>
              <div className="burgerMenu pull-right"></div>

              <div className="box pull-right smallBox">
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
                           onBlur={this.onBlur} />
                </div>
              </div>
              {this.state.searching?(<div className="dropDownList" >{this.renderDropDown()}</div>): null}

              </nav>

              <div className='menus' style={this.toggleMenu()}>
                <div className='menuItem'>
                  {this.props.minNavBar? null :
                  (<a onClick={this.clickNearestClinic} className='smallMenuBtn'>My Nearest Clinics</a>)}
                </div>

                  {this.props.user._id ? <div className='menuItem' onClick={this.removeActiveClinicAndNearestClinic}><Link to='/myAccount' className='smallMenuBtn' onClick={this.removeActiveClinicAndNearestClinic}>My account</Link></div> : null}

                <div className='menuItem'>
                  {this.props.user._id ? <Link to='/' onClick={this.execLogout} className='smallMenuBtn'>Logout</Link> :
                  <Link to='/login' onClick={this.clearNotifi} className='smallMenuBtn' >Login</Link>}
                </div>
              </div>

          </div>
        ) : (
        <nav className="Navbar navbar-fixed-top" >
        <Link to ='/'>
          <a onClick={this.removeActiveClinicAndNearestClinic}>
            <img src={logo} width={50} height={50} className="logo"/>
            <p className='logoName'>ClinicQueueSG</p>
          </a></Link>


          {this.props.minNavBar? null :
          (<a className="nearsetBtn" onClick={this.clickNearestClinic}>My Nearest Clinics</a>)}
          {this.props.user._id ? <Link to='/myAccount' className="sideBarBtn" onClick={this.removeActiveClinicAndNearestClinic}>My account</Link> : null}


          {this.props.user._id ? <Link to='/' className="navLogin pull-right" onClick={this.execLogout}>Logout</Link> :
          <Link to='/login' className="navLogin pull-right"><div onClick={this.clearNotifi} >Login</div></Link>}

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
                       onBlur={this.onBlur} />
            </div>
          </div>
          {this.state.searching?(<div className="dropDownList" >{this.renderDropDown()}</div>): null}
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
    nearestClinicUser: () => {dispatch(nearestClinicUser())},
    nearestClinicOff: () => {dispatch(nearestClinicOff())},
    triggerNotification: () => {dispatch(triggerNotification())},
    clearNotif: () => {dispatch(clearNotif())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
