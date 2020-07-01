import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../src/Helpers/Api'
import * as actions from '../../src/actions/event-actions'
import * as types from '../../src/actions/action-types'
import store from '../store'


export function* updateEventNameWorker(action) {
  const shouldNotAsync = store.getState().eventState.isExample;
  if (shouldNotAsync) {
    return;
  }

  const event = store.getState().eventState.lastState;
  const eventNamePreUpdate = event.name;
  const eventToBeUpdated = { ...event, name: action.name };
  try {
    const data = yield call(Api.updateEventName, eventToBeUpdated);
    yield put(actions.setEvent(data));
  } catch (error) {
    yield put(actions.updateEventNameFail(eventNamePreUpdate));
  }
}


export function* addUserWorker(action) {
  const shouldNotAsync = store.getState().eventState.isExample;
  if (shouldNotAsync) {
    return;
  }
  try {
    const data = yield call(Api.addPersonToEvent, action.person);
    yield put(actions.setEvent(data));
  } catch (error) {
    yield put(actions.addPersonFail(action.person));
  }
}


export function* updateUserWorker(action) {
  const shouldNotAsync = store.getState().eventState.isExample;
  if (shouldNotAsync) {
    return;
  }
  const lastState = store.getState().eventState.lastState;
  const personPreUpdate = lastState.persons.find((person) => {
    return person.personId === action.person.personId;
  })
  try {
    const data = yield call(Api.updatePersonToEvent, action.person);
    action.person.isPendingSave = false;
    yield put(actions.updatePersonSuccess(action.person));
    yield put(actions.setEvent(data));
  } catch (error) {
    yield put(actions.updatePersonFail(personPreUpdate));
  }
}

export function* deletePersonWorker(action) {
  const shouldNotAsync = store.getState().eventState.isExample;

  if (shouldNotAsync) {
    return;
  }
  try {
    const data = yield call(Api.deletePersonById, action.person.personId);
    yield put(actions.setEvent(data));
  } catch (error) {
    yield put(actions.deletePersonFail(action.person))
  }
}

export function* addExpenseWorker(action) {
  const shouldNotAsync = store.getState().eventState.isExample;
  if (shouldNotAsync) {
    return;
  }
  try {
    const data = yield call(Api.addExpense, action.expense);
    yield put(actions.setEvent(data));
  } catch (error) {
    yield put(actions.addExpenseFail(action.expense));
  }
}

export function* deleteExpenseWorker(action) {
  const shouldNotAsync = store.getState().eventState.isExample;
  if (shouldNotAsync) {
    return;
  }
  try {
    const data = yield call(Api.deleteExpense, action.expense);
    yield put(actions.setEvent(data));
  } catch (error) {
    yield put(actions.deleteExpenseFail(action.expense))
  }
}

export function* editExpenseWorker(action) {

  const shouldNotAsync = store.getState().eventState.isExample;
  if (shouldNotAsync) {
    return;
  }
  const lastState = store.getState().eventState.lastState;
  const lastExpense = lastState.expenses.find(e => e.expenseId === action.expense.expenseId);
  try {
    const data = yield call(Api.updateExpense, action.expense);
    yield put(actions.setEvent(data));
  } catch (error) {
    yield put(actions.editExpenseFail(lastExpense))
  }
}

export function* updateEventNameWatcher() {
  yield takeEvery(types.UPDATE_EVENT_NAME, updateEventNameWorker);
}

export function* deleteUserWatcher() {
  yield takeEvery(types.DELETE_PERSON_START, deletePersonWorker)
}

export function* addUserWatcher() {
  yield takeEvery(types.ADD_PERSON_START, addUserWorker);
}

export function* updateUserWatcher() {
  yield takeEvery(types.UPDATE_PERSON_START, updateUserWorker);
}

export function* addExpenseWatcher() {
  yield takeEvery(types.ADD_EXPENSE_START, addExpenseWorker)
}

export function* editExpenseWatcher() {
  yield takeEvery(types.EDIT_EXPENSE_START, editExpenseWorker)
}

export function* deleteExpenseWatcher() {
  yield takeEvery(types.DELETE_EXPENSE_START, deleteExpenseWorker)
}


export default function* rootSaga() {
  yield [
    updateEventNameWatcher(),
    addUserWatcher(),
    updateUserWatcher(),
    deleteUserWatcher(),
    addExpenseWatcher(),
    editExpenseWatcher(),
    deleteExpenseWatcher(),
  ]
}