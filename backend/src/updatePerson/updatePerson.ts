import { GetEvent, SaveEvent, EventViewModel, PersonViewModel } from "repo";

export const handler = async (event: any = {}): Promise<any> => {

    const requestedItemId = event.pathParameters.eventId;
    const personId = event.pathParameters.personId;
    if (!requestedItemId) {
        return { statusCode: 400, body: `Error: You are missing the path parameter id` };
    }
    const inputPerson = JSON.parse(event.body) as PersonViewModel

    try {
        const myevent = await GetEvent(requestedItemId) as EventViewModel
        const person = myevent.persons.find(p => p.personId == personId)
        if (person == null) return { statusCode: 404, body: `Error: No person with that Id` };
        person.name = inputPerson.name
        person.count = inputPerson.count
        await SaveEvent(requestedItemId, myevent)
        return { statusCode: 200, body: JSON.stringify(myevent) };
    } catch (dbError) {
        return { statusCode: 500, body: JSON.stringify(dbError) };
    }
};