import React, {Component} from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';

// Components
import ClinicMarker from '../Markers/ClinicMarker';

// Actions
import { activeClinic } from '../../../Actions/Clinic';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '80vw',
      height: '100vh',
    center: [1.352083, 103.819836],
    zoom: 12,
    greatPlaceCoords: {lat: 1.352083, lng: 103.819836 },
    // greatPlaceCoords: {lat: 1.36189785903623 , lng: 103.9526394471581 }

    }
  }

  onClick = (clinic) => {
    this.props.activeClinic(clinic);
  }

  renderClinicMapComponent = () => {
    let clinicArray = this.props.clinic;

    if (!this.props.clinic) {
      return  (<div></div>)
    } else {
      return clinicArray.map((clinic) => {
        return (
          //conditional for public==render
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

  render() {

    return (
        <div style={{width: this.state.width ,height:this.state.height}}>
        <GoogleMap
         center={{ lat: 1.352083, lng: 103.819836 }}
         zoom={this.state.zoom}
         onChildClick={this.onClinicClick}
         >
         {this.renderClinicMapComponent()}
       </GoogleMap>
       </div>
    );
  }
}
// <MyGreatPlace lat={1.352083} lng={103.819836} text={'A'} />
//

const mapStateToProps = (state) => {
  return {
    //user: state.user
    clinic: state.clinic,
    // activeClinic: state.activeClinic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
