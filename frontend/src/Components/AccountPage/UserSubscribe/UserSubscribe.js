import React, { Component } from 'react';
import { connect } from 'react-redux';

import DropDownItem from '../../NavBar/DropDownItem/DropDownItem';

import { deleteSubscribe } from '../../../Actions/SubscribeAction';
import { triggerNotification } from '../../../Actions/AppAction';
import { userNotification } from '../../../Actions/UserAction';

import './UserSubscribe.css'

class UserSubscribe extends Component{

  constructor(props) {
    super(props);
    let subscribeArray = []
    if(this.props.user._id){
      subscribeArray = this.findingClinicSubscribeByUser(this.props.user,this.props.clinic)
    }
    this.state = {
      searchTerm: "",
      clinicDropDownList: [],
      searching: false,
      clinicSubscribeByUser: subscribeArray || [],
      nameOfClinicChoosen:"",
      clinicChoosen: {}
    }
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.user._id){
      let subscribeArray = this.findingClinicSubscribeByUser(nextProps.user,nextProps.clinic)
      this.setState({
        clinicSubscribeByUser: subscribeArray
      })
    }
  }

  findingClinicSubscribeByUser = (user,clinic) => {
    let subscribeArray = []
    // user.subscribe only contains user,clinic id, look through clinic array to get more clinic info
    user.subscribe.forEach((elem,index) =>{
       clinic.forEach((clinic,index) => {
        if(clinic._id === elem.clinic){
          subscribeArray.push(clinic)
        }
      })
    })
    return subscribeArray
  }

  onChange = (event) => {

    let clinicDropDownList = this.state.clinicSubscribeByUser.filter((clinic,index) => {
      return clinic.properties.name_full.toLowerCase().includes(event.target.value.toLowerCase());
    })

    clinicDropDownList.sort( (a,b) => {
      const aLower = a.properties.name_full.toLowerCase()
      const bLower = b.properties.name_full.toLowerCase()
      const valueLower = event.target.value.toLowerCase()
      const queryPosA = aLower.indexOf(valueLower)
      const queryPosB = bLower.indexOf(valueLower)
      if (queryPosA !== queryPosB) {
        return queryPosA - queryPosB
      }
      return aLower < bLower ? -1 : 1
    })

    this.setState({
      searchTerm: event.target.value,
      clinicDropDownList: clinicDropDownList
    })
  }

  onFocus = () => {
    this.setState({
      searching: true,
      clinicDropDownList: this.state.clinicSubscribeByUser
    })
  }

  renderDropDown = () => {
    if(this.state.searching){
      return this.state.clinicDropDownList.map((clinic,index) => {
        return (
          <DropDownItem clinic={clinic} onClick={this.dropDownItemClicked} key={clinic._id}/>
        )
      })
    }
  }

  onBlur = () => {
    setTimeout(()=>{
      this.setState({
        searching: false,
        clinicDropDownList: [],
        searchTerm: this.state.nameOfClinicChoosen
      })
    },200)
  }

  dropDownItemClicked = (clinic) => {
    this.setState({
      clinicChoosen: {...clinic},
      nameOfClinicChoosen: clinic.properties.name_full
    })
  }

  unsubscribeButton = () => {
    if(!this.state.nameOfClinicChoosen){
      this.props.triggerNotification();
      this.props.userNotification("You have not chosen any clinic to unsubscribe");
    } else {
      // getting subscribe information from user subscribe array (easier to query) of that clinic of that user
      let whichSubscribeArray = this.props.user.subscribe.filter((elem,index) => {
        return elem.clinic === this.state.clinicChoosen._id
      })

      // dispatch action to delete Subscription
      this.props.deleteSubscribe({
        subscribe_id: whichSubscribeArray[0]._id,
        user_id: whichSubscribeArray[0].user,
        clinic_id: whichSubscribeArray[0].clinic
      });

      // dispatch action to trigger notification
      this.props.triggerNotification();
      this.props.userNotification("You have unsubscribed from "+this.state.nameOfClinicChoosen);

      // clear states
      this.setState({
        searchTerm: "",
        nameOfClinicChoosen: "",
        clinicChoosen: {}
      })
    }

  }

  render(){

    return(
      <div className="userInfoField userInfoFieldEnding">
        <h5>My Subscribed Clinics:</h5>
        <div className="userInfoRow">
          <input className="searching"
                 type="search"
                 name="search"
                 id="search"
                 value={this.state.searchTerm ? this.state.searchTerm:""}
                 placeholder="Search My Subscriptions"
                 onChange={this.onChange}
                 onFocus={this.onFocus}
                 onBlur={this.onBlur}
                 />
          {this.state.searching?(<div className="dropDownSubscribe">{this.renderDropDown()}</div>): null}
          <button className="updateBtn" onClick={this.unsubscribeButton}>Unsubscribe</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    clinic: state.clinic,
    queue: state.queue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSubscribe: (clinic) => {dispatch(deleteSubscribe(clinic));},
    triggerNotification: () => {dispatch(triggerNotification());},
    userNotification: (message) => {dispatch(userNotification(message));}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSubscribe);
