import React, { Component } from 'react';

import { markerStyle} from './markerStylePoly.js';
import injectStyle from '../injectStyle';

class PolyClinicMarker extends Component {
  constructor(props) {
    super(props);

    const keyframesStyle = `
      @-webkit-keyframes pulse {
        70%  { box-shadow: 0 0 0 20px rgba(71, 118, 230, 0); }
        100% { box-shadow: 0 0 0 0 rgba(71, 118, 230, 0); }
    `;
    injectStyle(keyframesStyle);
  }

  onClick = () => {
    this.props.onClick(this.props.clinic)
  }

  render() {
    return (
      <div onClick={this.onClick} style={markerStyle(this.props.clinic)}>
      </div>
    );
  }
}

export default PolyClinicMarker;
