import { IsString } from 'class-validator';

export class TrasnlateDto {
  @IsString()
  readonly prompt: string;

  @IsString()
  readonly lang: string;
}
