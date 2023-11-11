import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Query,
  Param
} from '@nestjs/common';
import { AppService } from './app.service';
import { OpenAI } from 'openai';
import { KeywordOutput } from './interface/app.model';

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
  async getDiary(
    @Query('username') username: string,
    @Query('day') day: string,
  ) {
    const data = await this.appService.getDaily(username, day);
    if (!data) throw new BadRequestException();
    console.log(data);
    const data_prompt = data.data
      .map((ele) => `"""${ele.time}$${ele.position}$${ele.task}"""`)
      .join(' ');
    console.log(data_prompt);
    const completion = await this.openAI.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `너는 주어진 일정을 수행하는 가상의 사람이야.
            세 개의 쌍따옴표로 감싼 여러 텍스트 각각에는 시간, 위치, 할 일이 '$'로 구분되어 적혀 있어.
            각각의 일정을 진행하는 동안 안전사고가 날 만한 일을 일기 형식으로 짧게 적어줘.
            생각지도 못한 사고이지만 많은 사람들이 안전불감증으로 놓치고 있는 안전사고이면 더 좋아.
            친근한 말투로 해 주고 한두문장 정도로 반드시 짧게 적어줘`,
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
    console.log(data);
    this.appService.updateDaily(username, day, data);
  }

  @Get('/keyword')
  async getSafetyKeyword(@Param('date') date: string): Promise<KeywordOutput> {
    return this.appService.getSafetyKeyword(date);
  }

  @Get('/info')
  async getSafetyInfo(@Param('date') date: string, @Param('username') username: string): Promise<String> {
    return this.appService.getSafetyInfo(date, username);
  }
}
