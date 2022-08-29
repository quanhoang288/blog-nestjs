import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { extension } from 'mime-types';

import type { IFile } from '../../interfaces';
import { ApiConfigService } from './api-config.service';
import { GeneratorService } from './generator.service';

@Injectable()
export class AwsS3Service {
  private readonly s3: S3;

  constructor(
    private configService: ApiConfigService,
    private generatorService: GeneratorService,
  ) {
    const awsS3Config = configService.awsS3Config;

    const options: S3.Types.ClientConfiguration = {
      accessKeyId: awsS3Config.accessKeyId,
      secretAccessKey: awsS3Config.secretAccessKey,
    };

    this.s3 = new S3(options);
  }

  async uploadImage(file: IFile): Promise<string> {
    const fileName = this.generatorService.fileName(
      <string>extension(file.mimetype),
    );
    const key = 'images/' + fileName;
    await this.s3
      .putObject({
        Bucket: this.configService.awsS3Config.bucketName,
        Body: file.buffer,
        ACL: 'public-read',
        Key: key,
      })
      .promise();

    return key;
  }
}
