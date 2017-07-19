import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";

import Header from '../Header/Header';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // markers: [
      //   {
      //     position: new google.maps.LatLng(-27.363882, 137.044922),
      //     showInfo: false,
      //     infoContent: (
      //       <svg
      //         id="Layer_1"
      //         xmlns="http://www.w3.org/2000/svg"
      //         width="16"
      //         height="16"
      //         viewBox="0 0 16 16"
      //       />
      //     ),
      //   },
      //   {
      //     position: new google.maps.LatLng(-23.363882, 129.044922),
      //     showInfo: false,
      //     infoContent: (
      //       <svg
      //         id="Layer_1"
      //         xmlns="http://www.w3.org/2000/svg"
      //         width="16"
      //         height="16"
      //         viewBox="0 0 16 16"
      //       />
      //     ),
      //   },
      // ],
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
    const SimpleMapExampleGoogleMap = withGoogleMap(props => (
        <GoogleMap
          ref={props.onMapLoad}
          defaultZoom={12}
          defaultCenter={{ lat: 1.352083, lng: 103.819836 }}
        >

          </GoogleMap>
      ));
    return (
      <div>
        <Header/>
        <SimpleMapExampleGoogleMap
                containerElement={
                  <div style={{ height: `100vh` }} />
                }
                mapElement={
                  <div style={{ height: `100vh` }} />
                }

        />

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
