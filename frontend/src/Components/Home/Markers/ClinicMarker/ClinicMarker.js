import React, { Component } from 'react';

import { markerStylePoly, markerStylePrivate } from './markerStyle.js';
import privateClinicMarker from '../../../../clinicMarkerYellow.png';
import polyClinicMarker from '../../../../clinicMarkerRed5.png';


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

  // renderSub = (string) => {
  //   return (
  //     <div>
  //       <p className="clinicAddress2">{string}</p>
  //     </div>
  //   )
  // }

  render() {
    const styleType = this.props.clinic.properties.type ==="Public"? markerStylePoly : markerStylePrivate
    // const subType = this.props.clinic.properties.type ==="Public" ?
    // "No. of people waiting: " + this.props.clinic.properties.queueQty : this.props.clinic.properties.ADDRESSBLOCKHOUSENUMBER ?
    // this.props.clinic.properties.ADDRESSBLOCKHOUSENUMBER + " " + this.props.clinic.properties.ADDRESSSTREETNAME + " S" + this.props.clinic.properties.ADDRESSPOSTALCODE : null
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
          {this.props.clinic.properties.type ==="Public" ? (
          <div>
            <p className="clinicAddress2">No. of people waiting: <span>{this.props.clinic.properties.queueQty}</span></p>
          </div>) : null}
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
              {this.props.clinic.properties.ADDRESSBLOCKHOUSENUMBER? (
                <div>
                  <p className="clinicAddress2">{this.props.clinic.properties.ADDRESSBLOCKHOUSENUMBER + " " + this.props.clinic.properties.ADDRESSSTREETNAME + " S" + this.props.clinic.properties.ADDRESSPOSTALCODE}</p>
                </div>
              ): null}
          </div>): null}
        </div>)}
      </div>
    );
  }
}

export default ClinicMarker;
