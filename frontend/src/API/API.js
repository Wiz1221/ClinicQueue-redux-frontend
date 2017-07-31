export const setActiveClinic = (activeClinic) => { //storing into local storage of the browser
  if(typeof(activeClinic)==="object" && activeClinic!==null){ // to prevent error being saved into local storage
    localStorage.setItem('activeClinic', JSON.stringify(activeClinic)); // 1st arugment sets the name, 2nd arugment = item to store
  }
}

export const getActiveClinic = () => {
  const activeClinicJSON = localStorage.getItem('activeClinic');    //calling from localStorage using the name
  let activeClinic = {};
  try{
    activeClinic = JSON.parse(activeClinicJSON);
  }catch(error){
    console.log("Error: could not decode restaurants's from localStorage")
  }
  return typeof(activeClinic)==="object" ? activeClinic: {};
}
