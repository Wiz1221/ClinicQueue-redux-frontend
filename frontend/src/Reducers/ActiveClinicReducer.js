import { getActiveClinic } from '../API/API';
const initialActiveClinic = getActiveClinic();


const ActiveClinic = (state = initialActiveClinic? initialActiveClinic: {}, action) => {
  console.log(state)
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

export default ActiveClinic;
