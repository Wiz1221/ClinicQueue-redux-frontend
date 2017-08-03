import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NavBarWhite from '../NavBarWhite/NavBarWhite';
import QueueGallery from './QueueGallery/QueueGallery';
import SubmitQueue from './SubmitQueue/SubmitQueue';
import NotificationBar from '../Home/NotificationBar/NotificationBar';

// Actions
import { minNavBarOn } from '../../Actions/AppAction';

import LoadingPage from '../LoadingPage/LoadingPage';
import { activeClinic } from '../../Actions/ClinicAction';


import './SeeQueue.css'

class SeeQueue extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.match.params.name)
    // console.log(this.props.clinic)
    // console.log(this.props.activeClinic)
    // let testClinic = this.props.clinic.filter((elem, index) => {
    //   return elem.properties.name_full === this.props.match.params.name
    // })
    // console.log(testClinic)
    // this.state = {
    //   clinic: null
    // }
  }

  // componentDidMount(){
  //   console.log(this.props.clinic)
  //           let testClinic = this.props.clinic.filter((elem, index) => {
  //             return elem.properties.name_full === this.props.match.params.name
  //           })
  //           console.log(testClinic)
  //           // this.setState({
  //           //   clinic:testClinic
  //           // })
  // }
  populateQueues = (queue) => {
    let queues = queue;
    // console.log("activeClinic.queue");
    // console.log(queue);
    let statequeues = this.props.statequeues;
    // console.log("statequeues");
    // console.log(statequeues)
    // replace the activeClinic queues with actual queue objects
    const initQueues = queues.map( (queue)=> {
      return statequeues.filter( (statequeue) => {
        // console.log("statequeue " + statequeue._id);
        // console.log("queue " + queue._id);
        return statequeue._id == queue._id;
      })[0];
    });
    console.log("initQueues");
    console.log(initQueues);
    return initQueues;
  }

  // componentWillReceiveProps(nextProps){
  //   if(!nextProps.activeClinic._id){
  //     let testClinic = nextProps.clinic.filter((elem, index) => {
  //       return elem.properties.name_full.replace(/[^a-zA-Z0-9&@()]/g, '-').replace(/[()]/g,'') === this.props.match.params.name
  //     })
  //
  //     this.dispatchingActiveClinicIntoStoreWhenCopyPasteURL(testClinic[0]);
  //   }
  // }
  //
  // dispatchingActiveClinicIntoStoreWhenCopyPasteURL = (clinic) => {
  //     this.props.activeClinicAction({...clinic})
  // }

  render() {
    return (
      <div>
        {this.props.activeClinic._id ? (
          <div className="BG container">
            {this.props.minNavBarOn()}
            <NavBarWhite match={this.props.match}/>
            <NotificationBar/>
            <div className="row">
              <div className="boxContent col-md-10 col-xs-10 col-md-offset-1 col-xs-offset-1">

                <div className="queueLeftSide">
                  <QueueGallery queue={this.populateQueues(this.props.activeClinic.queue)}/>
                </div>
                <div className="queueRightSide">
                  <SubmitQueue clinic={this.props.activeClinic}/>
                </div>

              </div>
            </div>
          </div>) : (
        <LoadingPage /> )}
      </div>
    )}
 }


// <div className="queueGalleryContainer">
//   <QueueGallery queue={this.props.activeClinic.queue} />
// </div>
// <div className="submitQueueContainer">
//   <SubmitQueue clinic={this.props.activeClinic}/>
// </div>
// <Link to='/'><button>back</button></Link>

const mapStateToProps = (state) => {
  return {
    activeClinic: state.activeClinic,
    clinic: state.clinic,
    statequeues: state.queue,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    minNavBarOn: () => {dispatch(minNavBarOn());},
    activeClinicAction: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeQueue);
