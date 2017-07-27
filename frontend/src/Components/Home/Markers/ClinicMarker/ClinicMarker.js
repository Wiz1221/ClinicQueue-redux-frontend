import React, { Component } from 'react';

import { markerStylePoly, markerStylePrivate } from './markerStyle.js';

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
      <div>Address: {this.props.clinic.properties.ADDRESSBLOCKHOUSENUMBER + " " + this.props.clinic.properties.ADDRESSSTREETNAME +" unit number: " + this.props.clinic.properties.ADDRESSUNITNUMBER}</div>
    )
  }

  render() {
    const styleType = this.props.clinic.properties.type ==="Public"? markerStylePoly : markerStylePrivate
    // const clinic = this.props.clinic
    return (
      <div onClick={this.onClick} style={styleType(this.props.clinic)} onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}>
        {this.state.hover? (
          <div>
          <div className="clinicHoverWindow">
          {this.props.clinic.properties.name_full}
          {this.props.clinic.properties.ADDRESSBLOCKHOUSENUMBER? (this.renderAddress()): null}
          </div>
          <div className="triangleForHoverWindow"></div>
          </div>
        ): null}
      </div>
    );
  }
}

export default ClinicMarker;
