import api from 'api'

export function load () {
  return dispatch => {
    dispatch({ type: 'LOAD_CLIENTS_STARTED' })
    return api.integrator.load()
      .then(payload => dispatch({ type: 'LOAD_CLIENTS_SUCCESS', payload }))
      .catch(payload => {
        return dispatch({ type: 'SAVE_CLIENT_FAILURE', payload })
      })
  }
}

function on (name, data, action) {
  return dispatch => {
    dispatch({ type: 'SAVE_CLIENT_STARTED' })
    return action()
      .then(response => response.ok ? response.json() : Promise.reject(response.error()))
      .then(payload => {
        console.info(name, payload)
        return dispatch({ type: 'SAVE_CLIENT_SUCCESS', name, id: data.vita.userId, payload })
      })
      .catch(payload => dispatch({ type: 'SAVE_CLIENT_FAILURE', payload }))
  }
}

export function saveAddressBook (payload) {
  console.log(payload)
  return dispatch => {
    dispatch({ type: 'SAVE_ADDRESSBOOK', payload })
  }
}

export function removeContact (payload) {
  console.log(payload)
  return dispatch => {
    dispatch({ type: 'REMOVE_CONTACT', payload })
  }
}

export function save (data) {
  return on('clients', data, () => api.integrator.save(data))
}

export function promote (data) {
  return on('messages', data, () => api.integrator.promote(data))
}

export function comment (data, comment) {
  return on('clients', data, () => api.integrator.comment(data, comment))
}

export function send (data) {
  return on('clients', data, () => api.integrator.send(data))
}

export function upsertAppointment (data, appointment) {
  return on('appointments', data, () => api.integrator.upsertAppointment(data, appointment))
}

export function removeAppointment (data, appointment) {
  return on('appointments', data, () => api.integrator.removeAppointment(data, appointment.id))
}

export function upsertTask (data, task) {
  return on('tasks', data, () => api.integrator.upsertTask(data, task))
}

export function removeTask (data, task) {
  return on('tasks', data, () => api.integrator.removeTask(data, task.id))
}
