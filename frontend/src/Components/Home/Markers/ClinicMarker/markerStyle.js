let radius=0;
let height = 45;
let width = 30;

export const markerStylePoly = (clinic) => {
  radius = Math.sqrt(clinic.properties.queueQty)*10/2;
  return {
    position: 'absolute',
    width: radius,
    height: radius,
    left: -radius / 2,
    top: -radius /2,
    cursor: 'pointer',
    //border: 'none',
    borderRadius: radius,
    //background: 'rgba(255, 83, 83, 0.6)',
    //background: 'rgba(71, 118, 230, 0.6)',
    textAlign: 'center',
    boxShadow: '0 0 0 0 rgba(245, 146, 141, 0.5)',
    WebkitAnimation: 'pulse 2.5s infinite',
  }
};

export const markerStylePrivate = (clinic) => {
  const radius = 40
  return {
    position: 'absolute',
    width: width,
    height: height,
    left: -width / 2,
    top: -height,
    cursor: 'pointer',
    //border: 'none',
    //borderRadius: radius,
    //background: 'rgba(232, 66, 244, 0.6)',
    textAlign: 'center',
    // boxShadow: '0 0 0 0 rgba(232, 66, 244, 0.5)',
    // WebkitAnimation: 'pulse 2.5s infinite',
  }
};
