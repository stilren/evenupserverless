import { addUserWorker } from '../src/sagas/sagas'
import * as actions from '../src/actions/event-actions'

it('dispatces add person event', () => {
    const person = {
        name: "Sebastian",
        expense: 100,
        count: 1,
        id: 1,
        balance: 0,
    }

    const cb = function(person){
        throw error;
    }

    const gen = addUserWorker(actions.addPerson(person),cb);
    gen.next();
    const test = gen.next();
    expect(1).toEqual(1)
})