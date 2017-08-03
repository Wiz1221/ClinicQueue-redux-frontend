import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Subscribe from '../Subscribe/Subscribe';
import QueueList from '../Queue/QueueList';
import chasLogo from '../../../../chas-transparent-small.png';

import { triggerNotification, nearestClinicToClinic } from '../../../../Actions/AppAction';
import { userNotification } from '../../../../Actions/UserAction';

// import API to store activeClinic into localStorage
//import { setActiveClinic } from '../../../../API/activeClinicAPI'

import './PrivateClinicInfo.css'

class PrivateClinicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWhichComponent: "",
    }
  }

  onClick = (event) => {
    let user = this.props.user
    if(!user._id) {
      this.props.triggerNotification();
      this.props.userNotification("Please login or sign up to subscribe");
      return;
    }

    if(!user.subscribe){
      this.setState({
        showWhichComponent: event.target.id
      })
    }else{
      let checker = false;
      user.subscribe.forEach((elem,index) => {
        if(elem.clinic === this.props.activeClinic._id){
          checker = true
        }
      })
      if(checker){
        // console.log("You have already subscribed to this clinic");
        this.props.triggerNotification();
        this.props.userNotification("You have already subscribed to this clinic");
        return;
      }else{
        this.setState({
          showWhichComponent: event.target.id
        })
      }
    }
  }

  backToClinicInfo = () => {
    this.setState({
      showWhichComponent: ""
    })
  }

  showNearbyClinics = () => {
    this.props.nearestClinicToClinic();
  }

  isUserSubscribedToActiveClinic = (subscribeArray) => {
    let matchArray = subscribeArray.filter((subscribe) => {
      return subscribe.clinic == this.props.activeClinic._id
    });
    console.log("matchArray");
    console.log(matchArray);
    return matchArray.length;
  }

  whichSubscribeButton = () => {
    if(this.props.user._id){
      if(this.props.user.role == "clinicAdmin" && this.props.user.myClinic == this.props.activeClinic._id){
        return (
          <div className="row-fluid row-clinicinfo-btn">
            <Link to={"/seeQueue/"+this.props.activeClinic.properties.name_full.replace(/[^a-zA-Z0-9&@()]/g, '-').replace(/[()]/g,'')}><button type="submit" className="btn clinic-back-btn">Clinic admin: submit a report</button></Link>
          </div>
        )
      }

      if(this.isUserSubscribedToActiveClinic(this.props.user.subscribe) >0){
        return (
          <div className="row-fluid row-clinicinfo-btn">
            <button type="button" className="btn clinic-subscribed-btn">Subscribed to this Clinic</button>
          </div>
        )
      }

      return (
        <div className="row-fluid row-clinicinfo-btn">
          <button id="subscribeClinicButton" type="submit" className="btn clinicinfo-btn" onClick={this.onClick}>Subscribe to this Clinic</button>
        </div>
      )

    }else{
      return (
        <div className="row-fluid row-clinicinfo-btn">
          <button id="subscribeClinicButton" type="submit" className="btn clinicinfo-btn" onClick={this.onClick}>Subscribe to this Clinic</button>
        </div>
      )
    }
  }

  render() {
    const properties = this.props.activeClinic.properties
    const whichSubscribeButton = this.whichSubscribeButton()
    return (
      <div>
        <div className="private-clinic-info container ClinicName">
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
              <div className="row-fluid row-clinicinfo-btn private-clinic-info-btn">
                <Link to={"/seeQueue/"+this.props.activeClinic.properties.name_full.replace(/[^a-zA-Z0-9&@()]/g, '-').replace(/[()]/g,'')}><button type="button" className="btn clinicinfo-btn">See more queues...</button></Link>

              </div>
              {whichSubscribeButton}
              <div className="row-fluid row-clinicinfo-btn">
                <button id="showNearbyClinicsButton" type="submit" className="clinicinfo-btn" onClick={this.showNearbyClinics}>Show nearby clinics</button>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}


// {this.props.user._id ?
//
//   this.props.user.role == "clinicAdmin" && this.props.user.myClinic == this.props.activeClinic._id ? (
//
// ) :  this.isUserSubscribedToActiveClinic(this.props.user.subscribe) === 0 ?
// (
//
// ) : (
//   <div className="row-fluid row-clinicinfo-btn">
//     <button type="button" className="btn clinic-subscribed-btn">Subscribed to this Clinic</button>
//   </div>
// )
//
// : (
//   <div className="row-fluid row-clinicinfo-btn">
//     <button id="subscribeClinicButton" type="submit" className="clinicinfo-btn" onClick={this.onClick}>Subscribe to this Clinic</button>
//   </div>
// )}
// (
//   <div className="row-fluid row-clinicinfo-btn">
//     <button id="subscribeClinicButton" type="submit" className="btn clinicinfo-btn" onClick={this.onClick}>Subscribe to this Clinic</button>
//   </div>
// )

const mapStateToProps = (state) => {
  return {
    activeClinic: state.activeClinic,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userNotification: (message) => {dispatch(userNotification(message));},
    triggerNotification: () => {dispatch(triggerNotification());},
    nearestClinicToClinic: () => {dispatch(nearestClinicToClinic());},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateClinicInfo);
