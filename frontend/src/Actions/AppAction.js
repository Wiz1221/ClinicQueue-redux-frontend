export const clearNotif = () => {
  return {
    type: 'CLEAR_NOTIF'
  }
}

export const nearestClinic = () => {
  return {
    type: 'NEAREST_CLINIC_ON'
  }
}

export const nearestClinicOff = () => {
  return {
    type: 'NEAREST_CLINIC_OFF'
  }
}

export const minNavBarOn = () => {
  return {
    type: 'MINIMAL_NAVBAR_ON'
  }
}

export const minNavBarOff = () => {
  return {
    type: 'MINIMAL_NAVBAR_OFF'
  }
}

export const triggerNotification = () => {
  return {
    type: 'TRIGGER_NOTIFICATION'
  }
}

export const switchOffNotification = () => {
  return {
    type: 'TURN_NOTIFICATION_OFF'
  }
}
