import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { OrthographyDto, ProsConsDiscusserDto, TrasnlateDto } from './dtos';
import {
  orthographyCheckUseCase,
  prosConsDicusserUseCase,
  prosConsStreamUseCase,
  translateUseCase,
} from './use-cases';

@Injectable()
// Solo va a llamar casos de usos
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }
  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, {
      prompt,
    });
  }
  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsStreamUseCase(this.openai, {
      prompt,
    });
  }
  async translate({ prompt, lang }: TrasnlateDto) {
    return await translateUseCase(this.openai, {
      prompt,
      lang,
    });
  }
}
