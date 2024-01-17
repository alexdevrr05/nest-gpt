import * as path from 'path';
import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';

import OpenAI from 'openai';

import {
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TrasnlateDto,
} from './dtos';
import {
  orthographyCheckUseCase,
  prosConsDicusserUseCase,
  prosConsStreamUseCase,
  translateUseCase,
  translateStreamUseCase,
} from './use-cases';
import { textToAudioUseCase } from './use-cases/text-to-audio.use-case';

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
  async translateStream({ prompt, lang }: TrasnlateDto) {
    return await translateStreamUseCase(this.openai, {
      prompt,
      lang,
    });
  }
  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, {
      prompt,
      voice,
    });
  }
  async textToAudioGetter(audioId: string) {
    const filepath = path.resolve(
      __dirname,
      `../../generated/audios/${audioId}.mp3`,
    );

    const wasFound = fs.existsSync(filepath);

    if (!wasFound) throw new NotFoundException(`File ${audioId} not found`);

    return filepath;
  }
}
