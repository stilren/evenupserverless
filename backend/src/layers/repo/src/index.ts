const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
export async function GetEvent(eventId: string): Promise<EventViewModel> {
    const params = {
        TableName: TABLE_NAME,
        Key: {
          eventId: eventId
        }
      };
    const response = await db.get(params).promise();
    return response.Item as EventViewModel
}

export async function SaveEvent(eventId: string, myevent: EventViewModel ) {
    const putparams = {
        TableName: TABLE_NAME,
        Item: myevent
      };
    await db.put(putparams).promise();
}

export class EventViewModel {
    eventId: string
    name: string
    persons: PersonViewModel[]
    expenses: ExpenseViewModel[]
}

export class PersonViewModel {
    personId: string
    name: string
    expense: number
    count: number
    expenses: ExpenseViewModel[]
}

export class ExpenseViewModel {
    expenseId: string
    personId: string
    description: string
    amount: number
    personShare: string[]
}