import React, { Component } from 'react';
import userMarker from '../../../userMarker.png';


class UserMarker extends Component {

  markerStyle = () => {
    let width = 30;
    let height = 45;
    return {
      position: 'absolute',
      width: width,
      height: height,
      left: -width / 2,
      top: -height / 2,
      cursor: 'pointer',
      //border: '2 solid black',
      //borderRadius: radius,
      //background: 'rgba(62, 239, 195, 0.6)',
      textAlign: 'center',
    }
  };

  render() {
    return (
      <div>
        <img src={userMarker} style={this.markerStyle()}/>
      </div>
    );
  }
}

export default UserMarker;
