import React, { Component } from 'react';

import { markerStyle } from './markerStylePrivate.js';

class PrivateClinicMarker extends Component {

  // onClick = () => {
  //   this.props.onClick(this.props.clinic)
  // }

  render() {
    return (
      <div onClick={this.onClick} style={markerStyle}>
        {this.props.clinic.properties.name_full}
      </div>
    );
  }
}

export default PrivateClinicMarker;
