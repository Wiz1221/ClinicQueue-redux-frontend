import React, { Component } from 'react';

import { markerStylePoly, markerStylePrivate } from './markerStyle.js';
import privateClinicMarker from '../../../../clinicMarkerYellow.png';
import polyClinicMarker from '../../../../clinicMarkerRed2.png';


import './clinicHoverWindow.css';

class ClinicMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  hoverTrue = () => {
    this.setState({ hover: true })
  }

  hoverFalse = () => {
    this.setState({ hover: false })
  }

  onClick = () => {
    this.props.onClick(this.props.clinic)
  }

  renderAddress = () => {
    return (
      <div>
        <p className="clinicAddress">Address: </p>
        <p className="clinicAddress2">{this.props.clinic.properties.ADDRESSBLOCKHOUSENUMBER + " " + this.props.clinic.properties.ADDRESSSTREETNAME}</p>
        <p className="clinicAddress">Unit Number: <span className="clinicAddress2">{this.props.clinic.properties.ADDRESSUNITNUMBER}</span></p>
      </div>
    )
  }

  render() {
    const styleType = this.props.clinic.properties.type ==="Public"? markerStylePoly : markerStylePrivate
    // const clinic = this.props.clinic
    return (
      <div>
      {this.props.clinic.properties.type === "Public" ? (
      <div onClick={this.onClick} onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}>
        <img src={polyClinicMarker} style={styleType(this.props.clinic)}/>
        {this.state.hover? (
          <div>
          <div className="polyClinicHoverWindow">
          <p className="clinicName">{this.props.clinic.properties.name_full}</p>
          {this.props.clinic.properties.ADDRESSBLOCKHOUSENUMBER? (this.renderAddress()): null}
          </div>
          <div className="triangleForHoverWindow"></div>
          </div>
        ): null}
      </div> ) : (
        <div onClick={this.onClick} onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}>
          <img src={privateClinicMarker} style={styleType(this.props.clinic)} />
        {this.state.hover? (
          <div className="clinicHoverWindow">
              <p className="clinicName">{this.props.clinic.properties.name_full}</p>
              {this.props.clinic.properties.ADDRESSBLOCKHOUSENUMBER? (this.renderAddress()): null}
          </div>): null}
        </div>)}
      </div>
    );
  }
}

export default ClinicMarker;
