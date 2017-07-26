const AppReducer = (state = "", action) => {
  switch (action.type) {

    case 'USER_NOTIFICATION':
      return action.notification || ""
      break;

    case 'CLEAR_NOTIF':
      return ""
      break;

    default:
      return state
  }
}

export default AppReducer;
