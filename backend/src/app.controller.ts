import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { OpenAI } from 'openai';

@Controller()
export class AppController {
  private readonly openAI: OpenAI;

  constructor(private readonly appService: AppService) {
    this.openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/diary')
  async getDiary(@Body() body: any) {
    if (!body['data']) {
      throw new BadRequestException();
    }
    const data = body['data'];
    const data_prompt = data.map((ele) => `"""${ele}"""`).join(' ');
    console.log(data_prompt);
    const completion = await this.openAI.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            '세 개의 쌍따옴표로 감싼 여러 텍스트 각각에 대해 안전 사고가 날 만한 시나리오를 일기 형식으로 한두문장 정도로 짧게 적어줘. 생각지도 못한 사고이지만 많은 사람들이 안전불감증으로 놓치고 있는 안전사고이면 더 좋아. 나만 볼 수 있는 일기를 적는 것처럼 말투는 격 없이 써줘. 한두문장 정도로 반드시 짧게 적어줘야 해 그리고 사무적인 말투 말고 친근한 말투로 나 자신에게 말하듯이 써줘',
        },
        {
          role: 'user',
          content: data_prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion);
    return { ok: true, completion };
  }

  @Get('/daily')
  getDaily(@Query('username') username: string, @Query('day') day: string) {
    return this.appService.getDaily(username, day);
  }

  @Get('/weekly')
  getWeekly(@Query('username') username: string, @Query('week') week: string) {
    return this.appService.getWeekly(username, week);
  }

  @Put('/daily')
  updateDaily(@Body() body: any) {
    const { username, day, data } = body;
    this.appService.updateDaily(username, day, data);
  }
}
