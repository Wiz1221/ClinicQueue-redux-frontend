import React, { Component } from 'react';

import { markerStyle } from './markerStyle.js';

class ClinicMarker extends Component {

  onClick = () => {
    this.props.onClick(this.props.clinic)
  }

  render() {
    return (
      <div onClick={this.onClick} style={markerStyle}>
      {this.props.clinic.properties.name}
      </div>
    );
  }
}

export default ClinicMarker;
