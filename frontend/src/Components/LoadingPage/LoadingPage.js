import React, {PropTypes} from 'react';
import ReactLoading from 'react-loading';
import logo from '../../ClinicQueue_Color.png';

import './LoadingPage.css'

export default class LoadingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loadingContent">
        <img id="CQLogol" src={logo} alt="CQ_Logo"></img>
        <div className="loadingText">
          <h3>Checking with nearby doctors...</h3>
        </div>
        <div className="row">
          <div className="loadingImage col-md-offset-5 col-md-2">
            <i className="fa fa-spin fa-4x fa-spinner" aria-hidden="true" id="loadingSpinner" />
          </div>
        </div>
      </div>
    );
  }
}

LoadingPage.propTypes = {};
