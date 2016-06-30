import {
  LOAD_PEOPLE_REQUEST,
  LOAD_PEOPLE_SUCCESS,
  LOAD_PEOPLE_FAILURE,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  UPDATE_PERSON_REQUEST,
  UPDATE_PERSON_SUCCESS,
  UPDATE_PERSON_FAILURE,
} from '../constants';
import update from 'react/lib/update';

const counter = (
  state = 0,
  action
) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
};

const person = (
  state = {
    data: {},
    lastUpdated: null,
    isUpdating: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: {
          ...state.data,
          counter: counter(state.data.counter, action),
        },
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: {
          ...state.data,
          counter: counter(state.data.counter, action),
        },
      };
    case UPDATE_PERSON_REQUEST:
      return update(state, {
        isUpdating: { $set: true },
        error: { $set: false },
      });
    case UPDATE_PERSON_SUCCESS:
      return update(state, {
        data: { $set: action.payload },
        lastUpdated: { $set: action.meta.lastFetched },
        isUpdating: { $set: false },
        error: { $set: false },
      });
    case UPDATE_PERSON_FAILURE:
      return update(state, {
        isUpdating: { $set: false },
        error: { $set: true },
      });
    default:
      return state;
  }
};

const people = (
  state = {
    data: [],
    lastFetched: null,
    isLoading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case LOAD_PEOPLE_REQUEST:
      return update(state, {
        isLoading: { $set: true },
        error: { $set: false },
      });
    case LOAD_PEOPLE_SUCCESS: {
      const instantiatedPeople = action.payload.map((p) => (
        {
          data: {
            ...p,
          },
          lastUpdated: null,
          isUpdating: false,
          error: false,
        }
      ));
      return update(state, {
        data: { $set: instantiatedPeople },
        lastFetched: { $set: action.meta.lastFetched },
        isLoading: { $set: false },
        error: { $set: false },
      });
    }
    case LOAD_PEOPLE_FAILURE:
      return update(state, {
        isLoading: { $set: false },
        error: { $set: true },
      });
    case INCREMENT_COUNTER: {
      const updatedPeople = state.data.map((p) => {
        if (p.data.id === action.personId) return person(p, action);
        return p;
      });
      return {
        ...state,
        data: updatedPeople,
      };
    }
    case DECREMENT_COUNTER: {
      const updatedPeople = state.data.map((p) => {
        if (p.data.id === action.personId) return person(p, action);
        return p;
      });
      return {
        ...state,
        data: updatedPeople,
      };
    }
    case UPDATE_PERSON_REQUEST: {
      const updatedPeople = state.data.map((p) => {
        if (p.data.id === action.personId) return person(p, action);
        return p;
      });
      return {
        ...state,
        data: updatedPeople,
      };
    }
    case UPDATE_PERSON_SUCCESS: {
      const updatedPeople = state.data.map((p) => {
        if (p.data.id === action.personId) return person(p, action);
        return p;
      });
      return {
        ...state,
        data: updatedPeople,
      };
    }
    case UPDATE_PERSON_FAILURE: {
      const updatedPeople = state.data.map((p) => {
        if (p.data.id === action.personId) return person(p, action);
        return p;
      });
      return {
        ...state,
        data: updatedPeople,
      };
    }
    default:
      return state;
  }
};

export default people;
