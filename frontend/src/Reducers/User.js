
const User = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_USER':
      return action.user
      break;
    default:
      return state
  }
}

export default User;
