import store from '../store'
import * as actions from '../actions/event-actions'
import { LOCAL_STORAGE_KEY, DEFAULT_EVENT_NAME } from '../Helpers/Constants'
import outputs from '../outputs.json'

function getEventById(id) {
    return fetch(baseUrl + '/events/' + id, {
        accept: 'application/json',
        method: 'GET'
    }).then(checkStatus)
        .then(parseJSON)
        .then(updateLocalStorage)
        .then(res => {
            store.dispatch(actions.setEvent(res))
        });
}

const baseUrl = outputs.BackendStack.GATEWAYURL

function createNewEvent(cb) {
    return fetch(baseUrl + 'events', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
    }).then(checkStatus)
        .then(parseJSON)
        .then(updateLocalStorage)
        .then((res) => cb(res));
}

function updateEventName(event, cb) {
    const id = event.eventId;
    const name = event.name;
    return fetch(baseUrl + 'events/' + id + '/name', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(name)
    }).then(checkStatus)
        .then(parseJSON)
        .then(updateLocalStorage)
        .then(cb);
}


function deletePersonById(personId) {
    const id = store.getState().eventState.eventId;
    return fetch(location.origin + '/api/events/' + id + '/people/' + personId, {
        accept: 'application/json',
        method: 'delete'
    }).then(checkStatus)
        .then(parseJSON)
        .then(updateLocalStorage)
}

function updatePersonToEvent(person) {
    const id = store.getState().eventState.eventId;
    return fetch(location.origin + '/api/events/' + id + "/people/" + person.personId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify(person)
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(updateLocalStorage);
}

function addPersonToEvent(person) {
    const id = store.getState().eventState.eventId;
    return fetch(location.origin + '/api/events/' + id + "/people", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(person)
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(updateLocalStorage);
}

function addExpense(expense) {
    const id = store.getState().eventState.eventId;
    return fetch(location.origin + '/api/events/' + id + "/expense", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(expense)
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(updateLocalStorage);
}

function updateExpense(expense) {
    const id = store.getState().eventState.eventId;
    return fetch(location.origin + '/api/events/' + id + "/expense/" + expense.expenseId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify(expense)
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(updateLocalStorage);
}

function deleteExpense(expense) {
    const id = store.getState().eventState.eventId;
    return fetch(location.origin + '/api/events/' + id + "/expense/" + expense.expenseId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'delete',
        body: JSON.stringify(expense)
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(updateLocalStorage);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    throw error;
}

function parseJSON(response) {
    return response.json();
}


function updateLocalStorage(event) {
    if(event.persons.length === 0 && event.name === DEFAULT_EVENT_NAME)
        return event

    const saveItem = {
        eventId: event.eventId,
        persons: event.persons.length,
        name: event.name
    }
    let savedEvents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (typeof savedEvents === "undefined" || savedEvents === null ) {
        //This is the first event
        savedEvents = []
    } else {
        const idx = savedEvents.findIndex(item => item.eventId === saveItem.eventId)
        if (idx !== -1) {
            //The event is already in the array, remove the old one
            savedEvents.splice(idx, 1);
        } else if (savedEvents.length > 10) {
            //The event is new and the array is full, pop it!
            savedEvents.pop()
        }
    }
    savedEvents.unshift(saveItem)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedEvents));
    return event;
}

const Api = {updateEventName, addExpense, deleteExpense, updateExpense, getEventById, createNewEvent, deletePersonById, addPersonToEvent, updatePersonToEvent };
export default Api;