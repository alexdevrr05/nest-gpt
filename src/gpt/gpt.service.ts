import { Injectable } from '@nestjs/common';

@Injectable()
export class GptService {
  // Solo va a llamar casos de usos

  orthographyCheck() {
    return {
      hola: 'Hello world',
    };
  }
}
