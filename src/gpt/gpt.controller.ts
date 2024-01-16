import { Response } from 'express';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { GptService } from './gpt.service';
import { OrthographyDto, TrasnlateDto } from './dtos';
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
  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream =
      await this.gptService.prosConsDiscusserStream(prosConsDiscusserDto);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      // console.log(piece);
      res.write(piece);
    }

    res.end();
  }
  @Post('translate')
  translate(@Body() trasnlateDto: TrasnlateDto) {
    return this.gptService.translate(trasnlateDto);
  }
  @Post('translate-stream')
  async translateStream(
    @Body() trasnlateDto: TrasnlateDto,
    @Res() res: Response,
  ) {
    const stream = await this.gptService.translateStream(trasnlateDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      // console.log(piece); // mensaje construyendose
      res.write(piece);
    }

    res.end();
  }
}
