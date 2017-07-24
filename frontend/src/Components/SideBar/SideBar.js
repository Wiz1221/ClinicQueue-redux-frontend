import React, {PropTypes} from 'react';

import './SideBar.css';

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sideBar">
        MyComponent
      </div>
    );
  }
}

SideBar.propTypes = {
};
