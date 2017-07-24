import React, {Component} from 'react';
import { connect } from 'react-redux';

// Components
import Header from '../Header/Header';
import PrivateClinicInfo from './SideBar/PrivateClinicInfo';
import PolyClinicInfo from './SideBar/PolyClinicInfo';
import Map from './Map/Map';

// Css
import './Home.css'

class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {

    return (
      <div>
        <Header/>
        <Map />
       { this.props.activeClinic._id ? (
           this.props.activeClinic.type === "private"? ( <PrivateClinicInfo/> ): (<PolyClinicInfo/>)
         ) : null
       }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //user: state.user
    clinic: state.clinic,
    activeClinic: state.activeClinic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
