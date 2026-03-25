import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('aws.region'),
    });
    this.bucket = this.configService.getOrThrow<string>('aws.s3.bucket');
  }

  async uploadFile(key: string, body: Buffer) {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
      }),
    );

    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }
}
