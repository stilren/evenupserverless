import * as types from '../actions/action-types';

const initialState = {
  title: 'evenup',
  backArrow: false,
  shareButton: false,
  formName: ""
}

const navbarReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.SET_TITLE:
      return {...state, title: action.title}

    case types.SET_BACK_ARROW:
      return {...state, backArrow: action.bool}
      
    case types.RESET_NAVBAR:
      return initialState
    
    case types.SAVE_FORM:
      return {...state, formName: action.formName}

    default:
      return state;
  }
}

export default navbarReducer;