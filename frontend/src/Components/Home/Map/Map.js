import React, {Component} from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';

// Components
import ClinicMarker from '../Markers/ClinicMarker/ClinicMarker';
import UserMarker from '../Markers/UserMarker';

// API
import { calculateNearest } from '../Markers/calculateNearestClinic';
import injectStyle from '../Markers/injectStyle';

// Actions
import { activeClinic } from '../../../Actions/Clinic';

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      coordinates: {}
    }
    const keyframesStyle = `
      @-webkit-keyframes pulse {
        70%  { box-shadow: 0 0 0 20px rgba(71, 118, 230, 0); }
        100% { box-shadow: 0 0 0 0 rgba(71, 118, 230, 0); }
    `;
    injectStyle(keyframesStyle);
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition( (position) => {
      let state = {}
      state.lat = position.coords.latitude
      state.lng = position.coords.longitude
      this.setState({
        coordinates: state
      })
    }, (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    });
  }

  onClick = (clinic) => {
    this.props.activeClinic(clinic);
  }

  renderPrivateClinicMapComponent = () => {
    if(this.props.activeClinicObject._id){
      if(this.props.activeClinicObject.properties.type==="Private"){
        return (<ClinicMarker lat={this.props.activeClinicObject.geometry.coordinates[1]}
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
          <ClinicMarker lat={clinic.geometry.coordinates[1]}
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

  renderNearestClinic = () => {
    if(this.state.coordinates.lat){
      let nearestClinicArray = calculateNearest(this.props.clinic,this.state.coordinates)
      // console.log(nearestClinicArray);
      let displayArray = []
      nearestClinicArray.forEach((clinic,index,arr) => {
          displayArray.push(
            <ClinicMarker lat={clinic.geometry.coordinates[1]}
                              lng={clinic.geometry.coordinates[0]}
                              clinic={clinic}
                              key={clinic._id}
                              name={clinic.name_full}
                              id={clinic._id}
                              onClick={this.onClick}
                               />
          )
      })
      // console.log(displayArray)
      return displayArray
    }
  }

  render() {
    return (
        <div style={{width: `100vw`, height: `100vh`}}>
          <GoogleMap
           center={this.props.activeClinicObject._id?
             { lat: this.props.activeClinicObject.geometry.coordinates[1], lng: this.props.activeClinicObject.geometry.coordinates[0] } :
             this.props.nearestClinicString==="true" ?
             { lat: this.state.coordinates.lat, lng: this.state.coordinates.lng } :
             { lat: 1.352083, lng: 103.819836 }}
           zoom={this.props.activeClinicObject._id || this.props.nearestClinicString==="true"? 15 :12}
           >
           {this.props.nearestClinicString==="true"? this.renderNearestClinic() : this.renderPolyClinicMapComponent()}
           {this.props.nearestClinicString==="true"? (
             <UserMarker lat={this.state.coordinates.lat}
                         lng={this.state.coordinates.lng}
                         />
           ): (this.renderPrivateClinicMapComponent())}
         </GoogleMap>
       </div>
    );
  }
}
// {
//   this.props.nearestClinicBoolean ? <NearestClinic/> : <NormalPolyAndPrivateShow />
// }
// <MyGreatPlace lat={1.352083} lng={103.819836} text={'A'} />
//<div style={this.props.activeClinicObject._id? ({width: `80vw`, height: `100vh`}): ({width: `100vw`, height: `100vh`})}>

const mapStateToProps = (state) => {
  return {
    user: state.user,
    clinic: state.clinic,
    activeClinicObject: state.activeClinic,
    nearestClinicString: state.nearestClinicBoolean
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
