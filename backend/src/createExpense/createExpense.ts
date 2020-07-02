import { GetEvent, SaveEvent, EventViewModel, PersonViewModel, ExpenseViewModel } from "repo";
const { v4: uuidv4 } = require('uuid');

export const handler = async (event: any = {}) : Promise <any> => {

  const requestedItemId = event.pathParameters.eventId;
  if (!requestedItemId) {
    return { statusCode: 400, body: `Error: You are missing the path parameter id` };
  }

  const expense = JSON.parse(event.body) as ExpenseViewModel
  expense.expenseId = uuidv4();
  try {
    const myevent = await GetEvent(requestedItemId) as EventViewModel
    myevent.expenses.push(expense)
    await SaveEvent(requestedItemId, myevent)
    return { statusCode: 200, body: JSON.stringify(myevent) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};