import React, { Component } from 'react';

class QueueStatus extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state ={
  //       value: ""
  //   }
  // }

  onClick = (event) => {
    this.props.onClick(event.target.innerHTML);
  }

  render() {
    return (
        <div className="row-fluid statusButton">
          <button id="statusSelection1" className="statusSelection" onClick={this.onClick}>Light</button>
          <button id="statusSelection2" className="statusSelection" onClick={this.onClick}>Normal</button>
          <button id="statusSelection3" className="statusSelection" onClick={this.onClick}>Busy</button>
          <button id="statusSelection4" className="statusSelection" onClick={this.onClick}>Very Busy</button>
        </div>

    );
  }
}

export default QueueStatus
