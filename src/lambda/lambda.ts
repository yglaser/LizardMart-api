import serverlessExpress from '@vendia/serverless-express';
import { createApp } from '../app';

let server;

export const handler = async (event, context) => {
  if (!server) {
    const app = await createApp();

    const expressApp = app.getHttpAdapter().getInstance();

    server = serverlessExpress({
      app: expressApp,
    });
  }

  return server(event, context);
};
