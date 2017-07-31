import React, {PropTypes} from 'react';
import ReactLoading from 'react-loading';

import './LoadingPage.css'

export default class LoadingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loadingContent">
      <img id="squirrelLogol" src="https://image.ibb.co/kWdnza/Squirrel_Logo.png" alt="Squirrel_Logo"></img>
      <div className="loadingText">
        <h3>Foraging berries...</h3>
        </div>
        <div className="row">
        <div className="loadingImage col-md-offset-5 col-md-2">
        <i className="fa fa-spin fa-3x fa-circle-o-notch" aria-hidden="true" id="loadingSpinner" />
          </div>
          </div>
      </div>
    );
  }
}

LoadingPage.propTypes = {};
