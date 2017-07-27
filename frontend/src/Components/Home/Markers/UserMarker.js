import React, { Component } from 'react';

class UserMarker extends Component {

  markerStyle = () => {
    let radius = 40;
    return {
      position: 'absolute',
      width: radius,
      height: radius,
      left: -radius / 2,
      top: -radius / 2,
      cursor: 'pointer',
      border: 'none',
      borderRadius: radius,
      background: 'rgba(62, 239, 195, 0.6)',
      textAlign: 'center',
    }
  };

  render() {
    return (
      <div style={this.markerStyle()}>
        you
      </div>
    );
  }
}

export default UserMarker;
