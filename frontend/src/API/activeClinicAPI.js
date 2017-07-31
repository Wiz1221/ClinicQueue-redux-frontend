export const setActiveClinic = (clinic) => {

  if(Object.getOwnPropertyNames(clinic).length > 0) {
    localStorage.setItem('activeClinic', JSON.stringify(clinic));
    console.log("stored activeClinic in localStorage");
    console.log(clinic);
  }
  else {
    console.log("There is no activeClinic!");
  }
}

export const getActiveClinic = () => {
  const clinicJSON = localStorage.getItem('activeClinic');

  let activeClinic;

  try {
    activeClinic = JSON.parse(clinicJSON);
  }
  catch(e){
    console.log("Error: Cound not decode activeClinic from localStorage");
  }
  return activeClinic ? activeClinic : {};
}
