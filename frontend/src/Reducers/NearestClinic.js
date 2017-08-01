
const NearestClinicReducer = (state = "", action) => {
  switch (action.type) {
    case 'NEAREST_CLINIC_USER':
      return "nearest_to_user"
      break;
    case 'NEAREST_CLINIC_CLINIC':
      return "nearest_to_clinic"
      break;
    case 'NEAREST_CLINIC_OFF':
      return ""
      break;
    default:
      return state
  }
}

export default NearestClinicReducer;
