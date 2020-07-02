import { GetEvent, SaveEvent, EventViewModel, PersonViewModel } from "repo";

export const handler = async (event: any = {}) : Promise <any> => {

  const requestedItemId = event.pathParameters.eventId;
  const personId = event.pathParameters.personId;
  if (!requestedItemId) {
    return { statusCode: 400, body: `Error: You are missing the path parameter id` };
  }

  try {
    const myevent = await GetEvent(requestedItemId) as EventViewModel
    myevent.persons = myevent.persons.filter(p => p.personId !== personId)
    await SaveEvent(requestedItemId, myevent)
    return { statusCode: 200, body: JSON.stringify(myevent) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};