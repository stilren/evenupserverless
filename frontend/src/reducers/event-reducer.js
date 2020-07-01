import * as types from '../actions/action-types';
import update from 'immutability-helper';
import StateHelper from '../Helpers/StateHelper';

const initialState = {
  persons: [],
  transactions: [],
  expenses: []
}

const eventReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.SET_EVENT:
      return StateHelper.applyBusinessLogic(action.event, action.event.persons);

    case types.CLEAN_EVENT:
      return {};

    case types.ADD_PERSON_START:
      action.person.isPendingSave = true;
      return StateHelper.applyBusinessLogic(
        update(state, { openModal: { $set: false } }),
        update(state.persons, { $push: [action.person] })
      );

    case types.ADD_PERSON_SUCCESS:
      action.person.isPendingSave = false;
      return StateHelper.applyBusinessLogic(state, updatePerson(action.person, state.persons));

    case types.ADD_PERSON_FAIL:
      return StateHelper.applyBusinessLogic(state, deletePerson(action.person, state.persons));

    case types.ADD_EXPENSE_START:
      return StateHelper.applyBusinessLogic(state, state.persons, addExpense(action.expense, state.expenses));

    case types.ADD_EXPENSE_FAIL:
      return StateHelper.applyBusinessLogic(state, state.persons, deleteExpense(action.expense, state.expenses));

    case types.DELETE_EXPENSE_START:
      return StateHelper.applyBusinessLogic(state, state.persons, deleteExpense(action.expense, state.expenses));

    case types.DELETE_EXPENSE_FAIL:
      return StateHelper.applyBusinessLogic(state, state.persons, addExpense(action.expense, state.expenses));

    case types.EDIT_EXPENSE_START:
      return StateHelper.applyBusinessLogic(state, state.persons, updateExpense(action.expense, state.expenses));

    case types.EDIT_EXPENSE_FAIL:
      return StateHelper.applyBusinessLogic(state, state.persons, updateExpense(action.expense, state.expenses));

    case types.DELETE_PERSON_START:
      return StateHelper.applyBusinessLogic(state, deletePerson(action.person, state.persons));

    case types.DELETE_PERSON_FAIL:
      const deletePersonsFail = update(state.persons, { $push: [action.person] });
      return StateHelper.applyBusinessLogic(state, deletePersonsFail);

    case types.UPDATE_PERSON_START:
      action.person.isPendingSave = true;
      return StateHelper.applyBusinessLogic(
        update(state, { openModal: { $set: false } }),
        updatePerson(action.person, state.persons)
      );

    case types.UPDATE_PERSON_SUCCESS:
      action.person.isPendingSave = false;
      return StateHelper.applyBusinessLogic(state, updatePerson(action.person, state.persons));

    case types.UPDATE_PERSON_FAIL:
      action.person.isPendingSave = false;
      return StateHelper.applyBusinessLogic(state, updatePerson(action.person, state.persons));

    case types.UPDATE_PERSON_LOCAL:
      return StateHelper.applyBusinessLogic(state, updatePerson(action.person, state.persons))

    case types.FOCUS_EDIT_EVENT_NAME:
      state.isEditingEventName = action.val;
      return StateHelper.applyBusinessLogic(state, state.persons);

    case types.UPDATE_EVENT_NAME:
      let newState = update(state, {
        name: { $set: action.name },
        lastState: { $set: state },
        isEditingEventName: { $set: action.val }
      });
      return newState;

    case types.UPDATE_EVENT_NAME_FAIL:
      return update(state, { name: { $set: action.name } })

    case types.SET_EXAMPLE_EVENT:
      const examplePersons = [
        {
          name: 'Sebastian',
          count: 1,
          personId: "0-0",
          
        },
        {
          name: 'Simon',
          count: 2,
          personId: "1-1",
        },
        {
          name: 'Emilie',
          count: 1,
          personId: "2-2",
        },
      ];
      state.isExample = true;
      state.name = "Dinner at Sebastians";
      state.expenses= [
            {
              personId: "0-0",
              description: "Wine",
              amount: 500,
              personShare: ["1-1", "2-2"],
              expenseId: "1"
            },
            {
              personId: "0-0",
              description: "Food",
              amount: 475,
              personShare: ["1-1", "0-0", "2-2"],
              expenseId: "2"
            },
            {
              personId: "1-1",
              description: "Dessert",
              amount: 100,
              personShare: ["1-1", "0-0", "2-2"],
              expenseId: "3"
            }
          ]
      return StateHelper.applyBusinessLogic(state, examplePersons)

    case types.OPEN_PERSON_MODAL:
      newState = {
        ...state,
        ...{
          openModal: true,
          personToEdit: action.person,
        }
      }
      return newState;

    case types.CLOSE_PERSON_MODAL:
      newState = {
        ...state,
        ...{
          openModal: false,
          personToEdit: null,
        }
      }
      return newState;

    default:
      return state;
  }
}

function addExpense(expense, expenses) {
  return expenses.concat([expense])
}

function deleteExpense(expense, expenses) {
  return expenses.filter(e => expense.expenseId !== e.expenseId)
}

function deletePerson(person, persons) {
  return persons.filter((mapPerson) => {
    return (mapPerson.personId !== person.personId)
  });
}

function updateExpense(expense, expenses) {
  return expenses.map(e => {
    if(e.expenseId === expense.expenseId){
      return expense
    }
    return e
  })
}

function updatePerson(person, persons) {
  return persons.map((mapPerson, i) => {
    if (mapPerson.personId === person.personId) {
      return person;
    }
    return mapPerson;
  })
}

export default eventReducer;