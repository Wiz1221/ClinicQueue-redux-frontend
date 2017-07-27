import React, {Component} from 'react';

import './About.css';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      renderComponent: false
    }
  }

  popUp = () => {
    this.setState({
      style: {
        height: '100px'
      },
      renderComponent: true
    });
  }
  popDown = () => {
    this.setState({
      style: {
        height: '20px'
      },
      renderComponent: false
    });
  }

  compoAppear = () => {
    return (
      <div className="AboutButton">
        MyComponent
      </div>
    );
  }

  compoDisappear = () => {
    return (
      <div></div>
    );
  }

  render() {
    return (
      <div className="AboutBar" onMouseEnter={this.popUp} onMouseLeave={this.popDown} style={this.state.style}>
        <i className="arrow up"></i>
        {this.state.renderComponent ? this.compoAppear() : this.compoDisappear()}


      </div>
    );
  }
}

About.propTypes = {
};
