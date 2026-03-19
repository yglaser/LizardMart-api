import serverlessExpress from '@vendia/serverless-express';
import { createApp } from '../app';

let server;

const serverPromise = createApp().then((app) => {
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
});

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  server = server ?? (await serverPromise);
  return server(event, context);
};
