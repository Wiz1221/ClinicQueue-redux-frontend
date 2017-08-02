export const calculateNearest = (clinics, userCood) => {
  clinics.forEach((clinic,index,arr) => {
    let latDiff = parseFloat(clinic.geometry.coordinates[1]) - parseFloat(userCood.lat);
    let lngDiff = parseFloat(clinic.geometry.coordinates[0]) - parseFloat(userCood.lng);
    let distance = Math.sqrt( Math.pow(latDiff,2) + Math.pow(lngDiff,2))
    clinic.distance = distance
    arr[index] = clinic
  })
  clinics.sort((a,b) => {
    return a.distance - b.distance;
  })
  return clinics.slice(0,15)
}
