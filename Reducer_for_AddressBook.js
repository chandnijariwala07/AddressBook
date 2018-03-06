import State from 'redux/state'
import { guid } from 'api/mock'

const newPerson = x => {
  x.id = guid()
  return x
}

const ACTION_HANDLERS = {
  LOGOUT: () => ({ ...initialState }),

  LOAD_CLIENTS_STARTED: (state, action) => ({
    ...state,
    clients: {
      ...initialState.clients,
      state: State.loading,
      error: null
    }
  }),
  LOAD_CLIENTS_SUCCESS: (state, action) => ({
    ...state,
    clients: {
      ...action.payload,
      state: State.present,
      error: null
    }
  }),
  LOAD_CLIENTS_FAILURE: (state, action) => ({
    ...state,
    clients: {
      ...initialState.clients,
      state: State.failure,
      error: action.payload
    }
  }),

  SAVE_CLIENT_STARTED: (state, action) => ({
    ...state,
    clients: {
      ...state.clients,
      state: State.storing,
      error: null
    }
  }),
  SAVE_CLIENT_SUCCESS: (state, action) => ({
    ...state,
    clients: {
      ...state.clients,
      [action.name]: {
        ...state.clients[action.name],
        [action.id]: action.payload
      },
      state: State.present,
      error: null
    }
  }),
  SAVE_CLIENT_FAILURE: (state, action) => ({
    ...state,
    clients: {
      ...initialState.clients,
      state: State.failure,
      error: action.payload
    }
  }),
  SAVE_ADDRESSBOOK: (state, action) => ({
    ...state,
    addressBook: action.payload.id
      ? state.addressBook.map(p => p.id === action.payload.id ? action.payload : p)
      : [...state.addressBook, newPerson(action.payload)]
  }),
  REMOVE_CONTACT: (state, action) => ({
    ...state,
    addressBook:
      state.addressBook.filter(p => p.id !== action.payload)
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  clients: {
    vitae: [],
    clients: {},
    tasks: {},
    appointments: {},
    messages: {},
    addressbook: [],
    state: State.initial,
    error: null
  },
  addressBook: [
    { firstName: 'Chandni', id: 'cja', category: 1, lastName: 'Jariwala' },
    { firstName: 'Benedikt', id: 'bfr', category: 2, lastName: 'Frings' }
  ]
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
