import React, { Component } from 'react';

class QueueStatus extends Component {
  // constructor(props) {
  //   super(props);
  // }

  onClick = (event) => {
    this.props.onClick(event.target.innerHTML);

  }

  render() {
    return (
      <div className="container">
        <form>
        <div className="row-fluid">
          <input type="radio" id="control_01" name="select" value="1" />
          <label htmlFor="control_01" id="statusSelection1" className="statusSelection" onClick={this.onClick}>Light</label>
        </div>
        <div className="row-fluid">
          <input type="radio" id="control_02" name="select" value="2" />
          <label htmlFor="control_02" id="statusSelection2" className="statusSelection" onClick={this.onClick}>Normal</label>
        </div>
        <div className="row-fluid">
          <input type="radio" id="control_03" name="select" value="3" />
          <label htmlFor="control_03" id="statusSelection3" className="statusSelection" onClick={this.onClick}>Busy</label>
        </div>
        <div className="row-fluid">
          <input type="radio" id="control_04" name="select" value="4"/>
          <label htmlFor="control_04" id="statusSelection4" className="statusSelection" onClick={this.onClick}>Very Busy</label>
        </div>
      </form>
      </div>
    );
  }
}

export default QueueStatus
