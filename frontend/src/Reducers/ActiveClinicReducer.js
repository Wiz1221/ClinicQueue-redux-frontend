
const ActiveClinicReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVE_CLINIC':
      return action.clinic || {}
      break;
    case 'REMOVE_ACTIVE_CLINIC':
      return {}
      break;
    default:
      return state
  }
}

export default ActiveClinicReducer;
