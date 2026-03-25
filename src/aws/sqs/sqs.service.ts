import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SQSClient,
  SendMessageCommand,
  SendMessageCommandInput,
} from '@aws-sdk/client-sqs';

export type SqsQueueName =
  | 'orderCreated'
  | 'paymentProcessed'
  | 'stockUpdate'
  | 'notification';

export interface SqsMessageOptions {
  /** Required for FIFO queues — groups related messages (e.g. orderId) */
  messageGroupId?: string;
  /** Seconds before the message becomes visible (0–900) */
  delaySeconds?: number;
}

@Injectable()
export class SqsService {
  private readonly logger = new Logger(SqsService.name);
  private readonly sqs: SQSClient;

  constructor(private readonly configService: ConfigService) {
    this.sqs = new SQSClient({
      region: this.configService.getOrThrow<string>('aws.region'),
    });
  }

  async sendMessage<T extends object>(
    queue: SqsQueueName,
    payload: T,
    options: SqsMessageOptions = {},
  ): Promise<void> {
    const queueUrl = this.configService.getOrThrow<string>(
      `aws.sqs.queues.${queue}`,
    );

    const input: SendMessageCommandInput = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(payload),
      DelaySeconds: options.delaySeconds,
    };

    // FIFO queues require MessageGroupId
    if (queueUrl.endsWith('.fifo')) {
      input.MessageGroupId = options.messageGroupId ?? queue;
    }

    await this.sqs.send(new SendMessageCommand(input));
    this.logger.log(`Message sent to [${queue}]`);
  }
}
