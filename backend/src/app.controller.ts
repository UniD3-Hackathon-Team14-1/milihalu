import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Query,
  Param,
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

  get_data_random(data, num) {
    const len_arr = [];
    for (let i = 0; i < data.length; i++) {
      len_arr.push(i);
    }
    len_arr.sort(() => Math.random() - 0.5);
    const result = [];
    for (let i = 0; i < num && i < len_arr.length; i++) {
      result.push(len_arr[i]);
    }
    result.sort();
    return result.map((ele) => data[ele]);
  }

  @Get('/diary')
  async getDiary(
    @Query('username') username: string,
    @Query('day') day: string,
  ) {
    const data = await this.appService.getDaily(username, day);
    if (!data) throw new BadRequestException();
    console.log(data);
    const data_random = this.get_data_random(data.data, 3);
    const data_prompt: string = data_random
      .map(
        (ele) =>
          `<div>${ele.time}</div><div>${ele.position}</div><div>${ele.task}</div>`,
      )
      .join('\n');
    console.log(data_prompt);
    /*const systemMessage1 = `
      세 개의 쌍따옴표로 감싼 여러 텍스트 각각에는 시간, 위치, 할 일이 div 태그로 구분되어 적혀 있어.
      일정들을 3개만 선택해서 출력해줘.`;*/
    const systemMessage2 = `\
엔터로 구분된 각 줄에는 시간, 위치, 할 일이 div태그로 구분되어 적혀 있어. \
각 줄에 적힌 일마다 발생할 수 있는 사건사고를 하나씩만 적어줘. \
사건사고는 구분하지 말아줘. \
발생할 수 있는 사건사고만 적어줘. \
사건사고는 현실에서 일어날 법해야 해. \
사건사고는 본인이 조심해야 하는 것을 적어 줘. \
줄 마다 하나씩만 적어야 한다는 것을 명심해줘.`;
    const systemMessage3 = `\
사건사고가 각 줄마다 하나씩 적혀 있어. \
각 사건사고를 두 문장 이내로 요약해줘. \
말투는 해요체로 친근하게 적되 간단한 일기를 쓰듯이 적어줘. \
앞에 "-" 표시는 쓰지 말아줘. \
각 사건사고는 두 문장 이내로 요약해야 하는 것을 명심해줘`;
    /*const completion = await this.openAI.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemMessage1,
        },
        {
          role: 'user',
          content: data_prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
    });*/
    const completion2 = await this.openAI.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemMessage2,
        },
        {
          role: 'user',
          content: data_prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
    });
    console.log(completion2.choices[0].message);
    const completion3 = await this.openAI.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemMessage3,
        },
        {
          role: 'user',
          content: completion2.choices[0].message.content,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    console.log(completion3.choices[0].message);

    return { diary: completion3.choices[0].message.content };
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
    return { ok: true };
  }

  @Get('/keyword')
  async getSafetyKeyword(@Param('date') date: string): Promise<KeywordOutput> {
    return this.appService.getSafetyKeyword(date);
  }

  @Get('/info')
  async getSafetyInfo(
    @Param('date') date: string,
    @Param('username') username: string,
  ): Promise<string> {
    return this.appService.getSafetyInfo(date, username);
  }
}