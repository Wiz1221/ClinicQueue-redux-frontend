export const setUserLoginStatus = (user) => { //storing into local storage of the browser
  if(user._id){ // to prevent error being saved into local storage
    localStorage.setItem('userStatus', JSON.stringify('user is logged in')); // 1st arugment sets the name, 2nd arugment = item to store
  }else{
    localStorage.setItem('userStatus', JSON.stringify(''));
  }
}

export const getUserLoginStatus = () => {
  const userStatusJSON = localStorage.getItem('userStatus');    //calling from localStorage using the name
  let userStatus = '';
  try{
    userStatus = JSON.parse(userStatusJSON);
  }catch(error){
    console.log("Error: could not decode restaurants's from localStorage")
  }
  return typeof(userStatus)==="string" ? userStatus: '';
}


export const sortingAlgorithm = (thingToSort) => {
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
