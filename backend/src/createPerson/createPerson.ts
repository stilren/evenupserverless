import { GetEvent, SaveEvent, EventViewModel, PersonViewModel } from "repo";
const { v4: uuidv4 } = require('uuid');

export const handler = async (event: any = {}) : Promise <any> => {

  const requestedItemId = event.pathParameters.eventId;
  if (!requestedItemId) {
    return { statusCode: 400, body: `Error: You are missing the path parameter id` };
  }

  const person = JSON.parse(event.body) as PersonViewModel
  person.personId = uuidv4();
  try {
    const myevent = await GetEvent(requestedItemId) as EventViewModel
    myevent.persons.push(person)
    await SaveEvent(requestedItemId, myevent)
    return { statusCode: 200, body: JSON.stringify(myevent) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};