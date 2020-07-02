import { GetEvent, SaveEvent, EventViewModel, PersonViewModel, ExpenseViewModel } from "repo";

export const handler = async (event: any = {}): Promise<any> => {

    const requestedItemId = event.pathParameters.eventId;
    const expenseId = event.pathParameters.expenseId;
    if (!requestedItemId) {
        return { statusCode: 400, body: `Error: You are missing the path parameter id` };
    }
    const inputExpense = JSON.parse(event.body) as ExpenseViewModel

    try {
        const myevent = await GetEvent(requestedItemId) as EventViewModel
        const expense = myevent.expenses.find(p => p.expenseId == expenseId)
        if (expense == null) return { statusCode: 404, body: `Error: No expense with that Id` };
        expense.personId = inputExpense.personId;
        expense.amount = inputExpense.amount;
        expense.description = inputExpense.description;
        expense.personShare = inputExpense.personShare;
        await SaveEvent(requestedItemId, myevent)
        return { statusCode: 200, body: JSON.stringify(myevent) };
    } catch (dbError) {
        return { statusCode: 500, body: JSON.stringify(dbError) };
    }
};