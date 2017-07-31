const TriggerNotifReducer = (state = false, action) => {

  switch (action.type) {
    case 'TRIGGER_NOTIFICATION':
      return true;
      break;
    case 'TURN_NOTIFICATION_OFF':
      return false;
      break;
    default:
      return state
  }
}

export default TriggerNotifReducer;
