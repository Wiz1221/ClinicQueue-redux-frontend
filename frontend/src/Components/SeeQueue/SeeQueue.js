import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import QueueGallery from './QueueGallery/QueueGallery';
import SubmitQueue from './SubmitQueue/SubmitQueue';
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
//
  // componentWillReceiveProps(nextProps){
  //       console.log(nextProps.clinic)
  //       let testClinic = nextProps.clinic.filter((elem, index) => {
  //         return elem.properties.name_full === this.props.match.params.name
  //       })
  //       console.log(testClinic)
  //       // this.setState({
  //       //   clinic:testClinic
  //       // })
  //
  //       nextProps.activeClinicAction({...testClinic});
  // }

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

  render() {
    // console.log(this.state.clinic)
    return (
      <div>
        {
          this.props.activeClinic._id ?
          (
            <div>
            <div className="queueGalleryContainer">
              <QueueGallery queue={this.props.activeClinic.queue} />
            </div>
            <div className="submitQueueContainer">
              <SubmitQueue clinic={this.props.activeClinic}/>
            </div>
            <Link to='/'><button>back</button></Link>
            </div>
          ):
          (
            <LoadingPage />
          )
        }

      </div>
    );
  }
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
    clinic: state.clinic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    activeClinicAction: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeQueue);
