import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  region: process.env.AWS_REGION,
  s3: {
    bucket: process.env.AWS_S3_BUCKET,
  },
  sqs: {
    queueUrl: process.env.SQS_URL,
    queues: {
      orderCreated: process.env.SQS_ORDER_CREATED_URL,
      paymentProcessed: process.env.SQS_PAYMENT_PROCESSED_URL, // FIFO
      stockUpdate: process.env.SQS_STOCK_UPDATE_URL,
      notification: process.env.SQS_NOTIFICATION_URL,
    },
  },
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}));
