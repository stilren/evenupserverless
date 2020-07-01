import { SaveEvent, EventViewModel  } from "repo";

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');
const TABLE_NAME = process.env.TABLE_NAME || '';

const RESERVED_RESPONSE = `Error: You're using AWS reserved keywords as attributes`,
  DYNAMODB_EXECUTION_ERROR = `Error: Execution update, caused a Dynamodb error, please take a look at your CloudWatch Logs.`;

export const handler = async (event: any = {}): Promise<any> => {
  const myevent = new EventViewModel()
  myevent.eventId = uuidv4();
  myevent.expenses = []
  myevent.name = "Click here to name event";
  myevent.persons = []
  try {
    await SaveEvent(myevent.eventId, myevent);
    return { statusCode: 201, body: JSON.stringify(myevent) };
  } catch (dbError) {
    const errorResponse = dbError.code === 'ValidationException' && dbError.message.includes('reserved keyword') ?
      DYNAMODB_EXECUTION_ERROR : RESERVED_RESPONSE;
    return { statusCode: 500, body: errorResponse };
  }
};