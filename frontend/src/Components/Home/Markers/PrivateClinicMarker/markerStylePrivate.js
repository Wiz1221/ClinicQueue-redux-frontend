
export const markerStyle = (clinic) => {
  const radius = 40
  return {
    position: 'absolute',
    width: radius,
    height: radius,
    left: -radius / 2,
    top: -radius / 2,
    cursor: 'pointer',
    border: 'none',
    borderRadius: radius,
    background: 'rgba(232, 66, 244, 0.6)',
    textAlign: 'center',
    // boxShadow: '0 0 0 0 rgba(232, 66, 244, 0.5)',
    // WebkitAnimation: 'pulse 2.5s infinite',
  }

};
