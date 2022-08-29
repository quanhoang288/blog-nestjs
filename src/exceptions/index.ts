import { BadRequestException, NotFoundException } from '@nestjs/common';

export class FileNotImageException extends BadRequestException {
  constructor(error?: string) {
    super('error.fileNotImage', error);
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.userNotFound', error);
  }
}
