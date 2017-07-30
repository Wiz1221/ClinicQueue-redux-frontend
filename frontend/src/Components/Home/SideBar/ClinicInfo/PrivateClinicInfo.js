import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Subscribe from '../Subscribe/Subscribe';
import QueueList from '../Queue/QueueList';
import chasLogo from '../../../../chas-transparent-small.png'

// import API to store activeClinic into localStorage
import { setActiveClinic } from '../../../../API/activeClinicAPI'

import './PrivateClinicInfo.css'

class PrivateClinicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWhichComponent: "",
    }
  }

  onClick = (event) => {
    this.setState({
      showWhichComponent: event.target.id
    })
  }

  backToClinicInfo = () => {
    this.setState({
      showWhichComponent: ""
    })
  }

  storeActiveClinic = () => {
    setActiveClinic(this.props.activeClinic);
  }

  render() {
    const properties = this.props.activeClinic.properties

    return (
      <div>
        <div className="private-clinic-info container">
        <h3>{this.props.activeClinic.properties.name_full}</h3>
        <h5> Address: {properties.ADDRESSBLOCKHOUSENUMBER} {properties.ADDRESSSTREETNAME} {properties.ADDRESSBUILDINGNAME} {properties.ADDRESSFLOORNUMBER ? '#' + properties.ADDRESSFLOORNUMBER + '-' + properties.ADDRESSUNITNUMBER : null} S{properties.ADDRESSPOSTALCODE}</h5>
        <h5> Telephone: {properties.Telephone} </h5>
        {properties.DESCRIPTION.includes("CDMP") ? (<p> Chronic Disease Management Programme (CDMP) available </p>) : null}
        </div>
        {properties.DESCRIPTION.includes("CHAS") ? (<div className="chas-logo"><img src={chasLogo} width={40} height={40}></img></div>) : null}
        {
          this.state.showWhichComponent==="subscribeClinicButton" ?  (
            <Subscribe clinic={this.props.activeClinic} backToClinicInfo={this.backToClinicInfo}/>
          ) : (
            <div className="private-clinic-info container">
              <QueueList queue= {this.props.activeClinic.queue}/>
              <div className="row-fluid row-clinicinfo-btn">
                <Link to="/seeQueue"><button type="button" className="btn clinicinfo-btn" onClick={this.storeActiveClinic}>See more queues...</button></Link>
              </div>
              {this.props.user._id ?
                this.props.user.role == "clinicAdmin" ? (
                <div className="row-fluid row-clinicinfo-btn">
                  <Link to='/seeQueue'><button type="submit" className="btn clinic-back-btn">Clinic admin: submit a report</button></Link>
                </div>
              ) : (
                <div className="row-fluid row-clinicinfo-btn">
                  <button id="subscribeClinicButton" type="submit" className="btn clinicinfo-btn" onClick={this.onClick}>Subscribe to this Clinic</button>
                </div>
              ) : (
                <div className="row-fluid row-clinicinfo-btn">
                  <button id="subscribeClinicButton" type="submit" className="btn clinicinfo-btn" onClick={this.onClick}>Subscribe to this Clinic</button>
                </div>
              )}
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeClinic: state.activeClinic,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateClinicInfo);
