import React, {Component} from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';

//import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';

import MyGreatPlace from './my_great_place.jsx';

import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '100vw',
      height: '100vh',
    center: [1.352083, 103.819836],
    zoom: 12,
    greatPlaceCoords: {lat: 1.352083, lng: 103.819836 }
    }
  }

  // handleClick = () => {
  //   this.setState({
  //     markers: this.state.markers.map(marker => {
  //       if (marker === targetMarker) {
  //         return {
  //           ...marker,
  //           showInfo: true,
  //         };
  //       }
  //       return marker;
  //     }),
  //   });
  // }



  render() {

    return (
      <div>
        <NavBar/>
        <SideBar/>

        <div style={{width: this.state.width ,height:this.state.height}}>
        <GoogleMap
         center={{ lat: 1.352083, lng: 103.819836 }}
         zoom={this.state.zoom}
         >
         <MyGreatPlace lat={59.955413} lng={30.337844} text={'A'}  />
         <MyGreatPlace {...this.state.greatPlaceCoords} text={'B'}  />
       </GoogleMap>
       </div>

      </div>
    );
  }
}

// {props.markers.map((marker, index) => (
//   <Marker
//
//     onRightClick={() => props.onMarkerRightClick(index)}
//   />
// ))}

const mapStateToProps = (state) => {

  return {
    //user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getReviewOfUser: (user_id) => { dispatch(getReviewOfUser(user_id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
