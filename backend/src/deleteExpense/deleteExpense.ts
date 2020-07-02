import { GetEvent, SaveEvent, EventViewModel, PersonViewModel } from "repo";

export const handler = async (event: any = {}) : Promise <any> => {

  const requestedItemId = event.pathParameters.eventId;
  const expenseId = event.pathParameters.expenseId;
  if (!requestedItemId) {
    return { statusCode: 400, body: `Error: You are missing the path parameter id` };
  }

  try {
    const myevent = await GetEvent(requestedItemId) as EventViewModel
    myevent.expenses = myevent.expenses.filter(p => p.expenseId !== expenseId)
    await SaveEvent(requestedItemId, myevent)
    return { statusCode: 200, body: JSON.stringify(myevent) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};