import * as types from './action-types'

export function setEvent(event){
    return {
        type: types.SET_EVENT,
        event
    }
}

export function cleanEvent(){
  return{
    type: types.CLEAN_EVENT
  }
}

export function addExpenseFail(expense){
  return {
    type: types.ADD_EXPENSE_FAIL,
    expense
  }
}

export function addExpense(expense){
  return {
    type: types.ADD_EXPENSE_START,
    expense
  }
}


export function deleteExpense(expense){
  return {
    type: types.DELETE_EXPENSE_START,
    expense
  }
}

export function deleteExpenseFail(expense){
  return {
    type: types.DELETE_EXPENSE_FAIL,
    expense
  }
}

export function editExpense(expense) {
  return {
    type: types.EDIT_EXPENSE_START,
    expense
  }
}

export function editExpenseFail(expense){
  return {
    type: types.EDIT_EXPENSE_FAIL,
    expense
  }
}

export function addPerson(person) {
  return {
    type: types.ADD_PERSON_START,
    person
  };
}

export function addPersonSuccess(person) {
  return {
    type: types.ADD_PERSON_SUCCESS,
    person
  };
}

export function addPersonFail(person) {
  return {
    type: types.ADD_PERSON_FAIL,
    person
  };
}

export function deletePerson(person) {
  return {
    type: types.DELETE_PERSON_START,
    person
  };
}

export function deletePersonFail(person) {
  return {
    type: types.DELETE_PERSON_FAIL,
    person
  };
}


export function updatePersonLocal(person){
  return {
    type: types.UPDATE_PERSON_LOCAL,
    person
  };
}

export function updatePerson(person) {
  return {
    type: types.UPDATE_PERSON_START,
    person,
  };
}

export function updatePersonSuccess(person) {
  return {
    type: types.UPDATE_PERSON_SUCCESS,
    person
  };
}

export function updatePersonFail(person) {
  return {
    type: types.UPDATE_PERSON_FAIL,
    person
  };
}

export function focusAddPerson(val){
  return {
    type: types.FOCUS_ADD_PERSON,
    val
  };
}

export function focusEditPerson(person, val){
  return {
    type: types.FOCUS_EDIT_PERSON,
    person,
    val
  }
}

export function focusEditEventName(val){
  return {
    type: types.FOCUS_EDIT_EVENT_NAME,
    val
  }
}

export function updateEventName(name){
  return {
    type: types.UPDATE_EVENT_NAME,
    name
  }
}

export function updateEventNameFail(name){
  return {
    type: types.UPDATE_EVENT_NAME_FAIL,
    name
  }
}

export function setExampleEvent(){
  return {
    type: types.SET_EXAMPLE_EVENT,
  }
}

export function closePersonModal(){
  return {
    type: types.CLOSE_PERSON_MODAL,
  }
}

export function openPersonModal(person){
  return {
    type: types.OPEN_PERSON_MODAL,
    person
  }
}