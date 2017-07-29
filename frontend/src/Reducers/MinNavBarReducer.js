const MinNavBarReducer = (state = false, action) => {
  switch (action.type) {

    case 'MINIMAL_NAVBAR_ON':
      return true;
      break;

    case 'MINIMAL_NAVBAR_OFF':
      return false;
      break;

    default:
      return state
  }
}

export default MinNavBarReducer;
