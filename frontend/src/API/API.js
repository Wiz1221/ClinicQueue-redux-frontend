export const setUserLoginStatus = (user) => { //storing into local storage of the browser
  if(user._id){ // to prevent error being saved into local storage
    localStorage.setItem('userStatus', JSON.stringify('user is logged in')); // 1st arugment sets the name, 2nd arugment = item to store
  }else{
    localStorage.setItem('userStatus', JSON.stringify(''));
  }
}

export const getUserLoginStatus = () => {
  const userStatusJSON = localStorage.getItem('userStatus');    // calling from localStorage using the name
  let userStatus = '';
  try{
    userStatus = JSON.parse(userStatusJSON);
  }catch(error){
    console.log("Error: could not decode userStatus from localStorage")
  }
  return typeof(userStatus)==="string" ? userStatus: '';
}


export const sortingAlgorithm = (thingToSort) => {
  // sorting by clinic type and alphabetically. Polyclinics are first
  return thingToSort.sort((a,b) => {
    const aLower = a.properties.name_full.toLowerCase();
    const bLower = b.properties.name_full.toLowerCase();
    const aType = a.properties.type === 'Private'? 1 : -1
    const bType = b.properties.type === 'Private'? 1 : -1
    if(aType !== bType){
      return aType - bType
    }
    return aLower < bLower ? -1 : 1
  })
}

export const cuttingCommentShort = (comment) => {
  // return only 30 characters
  return comment.split('').splice(0,30).join('') + '...'
}

export const dateParse = (date,offsethours) => {
  const newDate = new Date(date)// + offsethours*60*60*1000
  let mth = parseInt(newDate.getMonth()) + 1
  const datev = newDate.getDate() + '-' + mth.toString() + '-' + newDate.getFullYear() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' +newDate.getSeconds()
  return datev;
}

export const queueBorderParse = (status) => {
  switch(status) {
    case 'Very Busy':
      return "vbusy-border";
      break;
    case 'Busy':
      return "busy-border";
      break;
    case 'Normal':
      return "normal-border";
      break;
    case 'Light':
      return "light-border";
      break;
    default:
      return "normal-border";
      break;
  }
}

export const queueClassParse = (status) => {
    switch(status) {
      case 'Very Busy':
        return "vbusy";
        break;
      case 'Busy':
        return "busy";
        break;
      case 'Normal':
        return "normal";
        break;
      case 'Light':
        return "light";
        break;
      default:
        return "normal";
        break;
    }
  }
