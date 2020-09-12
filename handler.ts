import { Chime, Endpoint } from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';

const chime = new Chime();
chime.endpoint = new Endpoint('https://service.chime.aws.amazon.com/console');

export const hello: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello' }),
  };
};

export const createMeeting: APIGatewayProxyHandler = async () => {
  const meeting = await chime
    .createMeeting({
      ClientRequestToken: uuidv4(),
      MediaRegion: 'ap-northeast-1',
    })
    .promise();
  console.log(JSON.stringify({ meeting }, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify({ meeting }, null, 2),
  };
};
