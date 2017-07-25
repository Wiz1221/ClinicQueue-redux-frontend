import React, {Component} from 'react';
import { connect } from 'react-redux';

class DropDownItem extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  onClick = () => {
    this.props.onClick(this.props.clinic);
  }

  render() {
    return (
      <div onClick={this.onClick}>
        {this.props.clinic.properties.name_full}
      </div>
    );
  }
}

export default DropDownItem;
