import React, {Component} from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';

// Components
import PolyClinicMarker from '../Markers/PolyClinicMarker/PolyClinicMarker';
import PrivateClinicMarker from '../Markers/PrivateClinicMarker/PrivateClinicMarker';

// Actions
import { activeClinic } from '../../../Actions/ClinicAction';

class Map extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   //   width: '80vw',
  //   //   height: '100vh',
  //   // center: [1.352083, 103.819836],
  //   // zoom: 12,
  //   // greatPlaceCoords: {lat: 1.352083, lng: 103.819836 },
  //   // greatPlaceCoords: {lat: 1.36189785903623 , lng: 103.9526394471581 }
  //
  //   }
  // }

  onClick = (clinic) => {
    this.props.activeClinic(clinic);
  }

  renderPrivateClinicMapComponent = () => {
    if(this.props.activeClinicObject._id){
      if(this.props.activeClinicObject.properties.type==="Private"){
        return (<PrivateClinicMarker lat={this.props.activeClinicObject.geometry.coordinates[1]}
                                     lng={this.props.activeClinicObject.geometry.coordinates[0]}
                                     clinic={this.props.activeClinicObject}/>
        )
      }
    }
  }

  renderPolyClinicMapComponent = () => {
    if (!this.props.clinic) {
      return  (<div></div>)
    } else {
      let onlyPolyClinicArray = this.props.clinic.filter((clinic,index) => {
        return clinic.properties.type === "Public";
      })

      return onlyPolyClinicArray.map((clinic) => {
        return (
          <PolyClinicMarker lat={clinic.geometry.coordinates[1]}
                            lng={clinic.geometry.coordinates[0]}
                            clinic={clinic}
                            key={clinic._id}
                            name={clinic.name_full}
                            id={clinic._id}
                            onClick={this.onClick}

                             />
        )
      });
    }
  }

  render() {
    let newLng = this.props.activeClinicObject._id? this.props.activeClinicObject.geometry.coordinates[0] +0.0100 : 0
    return (
        <div style={{width: `100vw`, height: `100vh`}}>
          <GoogleMap
           center={this.props.activeClinicObject._id? { lat: this.props.activeClinicObject.geometry.coordinates[1], lng: newLng } :{ lat: 1.352083, lng: 103.819836 }}
           zoom={this.props.activeClinicObject._id? 15 : 12}
           onChildClick={this.onClinicClick}
           >
           {this.renderPolyClinicMapComponent()}
           {this.renderPrivateClinicMapComponent()}
         </GoogleMap>
       </div>
    );
  }
}
// <MyGreatPlace lat={1.352083} lng={103.819836} text={'A'} />
//<div style={this.props.activeClinicObject._id? ({width: `80vw`, height: `100vh`}): ({width: `100vw`, height: `100vh`})}>

const mapStateToProps = (state) => {
  return {
    //user: state.user
    clinic: state.clinic,
    activeClinicObject: state.activeClinic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
