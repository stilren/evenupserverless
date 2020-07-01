import eventReducer from '../src/reducers/event-reducer'
import * as actions from '../src/actions/event-actions'

it('adds persons to state state', () => {
    const person1 ={
        name: "Sebastian",
        expense: 100,
        count: 1,
    };
    const person2 = {
        name: "Simon",
        expense: 50,
        count: 1,
    };

    const initState = {
        persons: [],
        transactions: []
    }
    
    let state = eventReducer(
        initState, 
        actions.addPerson(person1));

    state = eventReducer(
        state, 
        actions.addPerson(person2));

    
    const expectedState = {
        persons: [
            {
                name: "Sebastian",
                expense: 100,
                count: 1,
                balance: 25,
            },
            {
                name: "Simon",
                expense: 50,
                count: 1,
                balance: -25
            }

        ],
        transactions: [{
            from: "Simon",
            to: "Sebastian",
            amount: 25
        }],
        total: 150,
        perPerson: 75,
    }
    expect(state).toEqual(expectedState)
    for (let i = 0; i < state.persons.length; i++) {
        expect(state.persons[i]).toEqual(expectedState.persons[i])
    }
    
});

it('deletes person in state', () => {
    const person1 ={
        name: "Sebastian",
        expense: 100,
        count: 1,
        id: 1
    };
    const person2 ={
        name: "Simon",
        expense: 100,
        count: 1,
        id: 2
    };

    const initState = {
        persons: [person1, person2],
        transactions: []
    }
    
    let state = eventReducer(
        initState, 
        actions.deletePerson(person1));
    
    const expectedState = {
        persons: [{name: "Simon", expense: 100, count: 1, balance: 0, id: 2}],
        total: 100,
        perPerson: 100,
        transactions: []
    }
    expect(state).toEqual(expectedState)
    for (let i = 0; i < state.persons.length; i++) {
        expect(state.persons[i]).toEqual(expectedState.persons[i])
    }
});

it('updates person in state', () => {
    const person1 ={
        name: "Sebastian",
        expense: 100,
        count: 1,
        id: 1
    };
    const person2 ={
        name: "Simon",
        expense: 100,
        count: 1,
        id: 2
    };
    const initState = {
        persons: [person1, person2],
        transactions: []
    }

    const updatePerson = {
        name: "Sebastian",
        expense: 200,
        count: 2,
        id: 1
    }

    let state = eventReducer(
        initState, 
        actions.updatePerson(updatePerson));

    const expectedState = {
        persons: [
            {
                name: "Sebastian",
                expense: 200,
                count: 2,
                balance: 0,
                id: 1
            },
            {
                name: "Simon",
                expense: 100,
                count: 1,
                balance: 0,
                id: 2
            },
        ], 
        total: 300,
        perPerson: 100, 
        transactions: []
    }
    expect(state).toEqual(expectedState)
    for (let i = 0; i < state.persons.length; i++) {
        expect(state.persons[i]).toEqual(expectedState.persons[i])
    }
});

it('sets the state', () => {
    const newState = {
        id: 1,
        persons: [
            {
                name: "Sebastian",
                expense: 100,
                count: 1,
            },
            {
                name: "Simon",
                expense: 50,
                count: 1,
            }

        ]
    }
    const expectedState = {
        id: 1,
        persons: [
            {
                name: "Sebastian",
                expense: 100,
                count: 1,
                balance: 25,
            },
            {
                name: "Simon",
                expense: 50,
                count: 1,
                balance: -25
            }

        ],
        transactions: [{
            from: "Simon",
            to: "Sebastian",
            amount: 25
        }],
        total: 150,
        perPerson: 75,
    }

    const state = eventReducer({},actions.setEvent(newState));

    expect(state).toEqual(expectedState);
});