import { GetEvent } from "repo";
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler = async (event: any = {}) : Promise <any> => {

  const requestedItemId = event.pathParameters.eventId;
  if (!requestedItemId) {
    return { statusCode: 400, body: `Error: You are missing the path parameter id` };
  }

  try {
    return { statusCode: 200, body: JSON.stringify(await GetEvent(requestedItemId)) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};