
const NearestClinic = (state = "", action) => {
  switch (action.type) {
    case 'NEAREST_CLINIC_ON':
      return "true"
      break;
    case 'NEAREST_CLINIC_OFF':
      return ""
      break;
    default:
      return state
  }
}

export default NearestClinic;
