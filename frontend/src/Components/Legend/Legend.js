import React, { Component } from 'react';

import privateClinicMarker from '../../clinicMarkerGreen2.png';
import polyClinicMarker from '../../clinicMarkerRed4.png';
import youMarker from '../../userMarker.png';

import './Legend.css';

export default class Legend extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="LegendBG">
        <div className="legend">
          <img src={polyClinicMarker} className="LegendMarkers"/>
          <p className="legendWords">Polyclinics</p>
        </div>
        <div className="legend">
          <img src={privateClinicMarker} className="LegendMarkers"/>
          <p className="legendWords2">Private Clinics</p>
        </div>
        <div className="legend">
          <img src={youMarker} className="youMarkers"/>
          <p className="legendWords3">You</p>
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
};
