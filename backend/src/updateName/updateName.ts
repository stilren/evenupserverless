import { GetEvent, SaveEvent, EventViewModel } from "repo";

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler = async (event: any = {}) : Promise <any> => {

  const requestedItemId = event.pathParameters.id;
  if (!requestedItemId) {
    return { statusCode: 400, body: `Error: You are missing the path parameter id` };
  }

  const name = event.body as string
  try {
    const myevent = await GetEvent(requestedItemId) as EventViewModel
    myevent.name = name
    await SaveEvent(requestedItemId, myevent)
    return { statusCode: 200, body: JSON.stringify(myevent) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};