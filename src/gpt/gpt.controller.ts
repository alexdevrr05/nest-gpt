import { Body, Controller, Post } from '@nestjs/common';

import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos';
import { ProsConsDiscusserDto } from './dtos/pros-cons-discusser.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.orthographyCheck(orthographyDto);
  }
  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDiscusser(prosConsDiscusserDto);
  }
}
