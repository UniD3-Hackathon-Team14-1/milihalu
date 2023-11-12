import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Query,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { OpenAI } from 'openai';

function sleep(sec) {
  let start = Date.now(),
    now = start;
  let t = 0;
  while (now - start < sec * 1000) {
    now = Date.now();
    if (now - start > t * 1000) {
      console.log(t);
      t++;
    }
  }
}

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
    @Query('date') day: string,
  ) {
    const data = await this.appService.getDaily(username, day);
    if (!data) throw new BadRequestException();
    console.log(data);
    const data_random = this.get_data_random(data.data, 3);
    const data_prompt: string = data_random
      .map((ele) => `${ele.task}`)
      .join('\n');
    console.log(data_prompt);
    /*const systemMessage1 = `
      세 개의 쌍따옴표로 감싼 여러 텍스트 각각에는 시간, 위치, 할 일이 div 태그로 구분되어 적혀 있어.
      일정들을 3개만 선택해서 출력해줘.`;*/
    const systemMessage2 = `\
엔터로 구분된 각 줄에는 할 일이 적혀 있어. \
각 줄에 적힌 일마다 발생할 수 있는 안전문제를 하나씩만 적어줘. \
안전문제는 건강과 직결되어야 해. \
안전문제는 구분하면 안 돼. \
발생할 수 있는 안전문제만 적어줘. \
안전문제는 현실에서 일어날 법해야 해. \
안전문제는 본인이 조심해야 하는 것을 적어 줘. \
안전문제는 각 줄마다 하나씩 짧게 적어야 해. \
각 줄에는 안전문제만 적어야 하고 할 일은 적으면 안 돼. \
안전문제는 반복하면 안 돼.

각 줄의 예시: "과제를 하다가 파일을 실수로 삭제하다.", "집에 돌아갈 때 길을 잘못해서 길을 헤매다."`;

    const systemMessage3 = `\
입력에서 이어 작성하면 안 돼. \
사건사고가 각 줄마다 하나씩 적혀 있어. \
간단한 일기로 써 줘. \
각 사건사고는 두 문장 이내로 요약해야 하는 것을 명심해. \
앞에 - 표시는 절대 쓰면 안 돼. \

각 줄의 예시: "지하철역 가는데 미끄러져 넘어져 다치는 일이 있었어. 앞으로는 조심해서 다니도록 해야겠어.", "집에 돌아갈 때 길을 헤매서 고생했어. 다음에는 길을 잘 확인하고 가야겠어.", "하이킹 중에 넘어져 다치는 일이 있었어. 주의해야겠다."`;
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
    /*const completion2 = await this.openAI.chat.completions.create({
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
      max_tokens: 200,
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
      */
    sleep(5);
    return {
      diary:
        '지하철을 탔는데 사람이 너무 많아서 넘어져 다치는 일이 있었어. 앞으로는 조심해서 다니도록 해야겠어. \n\n오늘은 카페에서 미끄러져 다치지 않도록 조심해야 했어. 발이 미끄러질 수 있는 상황에 대해 더욱 주의할 필요가 있어. \n\n하루 내내 과제를 하다보니 눈이 너무 피로해졌어. 앞으로는 적절한 휴식을 취하고 눈 건강에 더 신경써야지. 외식 중에 식중독을 걸리지 않도록 음식의 안전을 확인하는 습관을 들여야겠어. 생활 속에서 사소한 위험에도 주의하며 건강하고 안전하게 보내도록 노력해야겠어.',
    };
  }

  @Post('/diary/url')
  getDiaryUrl(@Body() body: any) {
    const { title, content } = body;
    return this.appService.getDiaryUrl(title, content);
  }

  @Get('/diary/:hash')
  getDiaryByUrl(@Param('hash') hash: string) {
    console.log(hash);
    return this.appService.getDiaryByUrl(hash);
  }

  @Get('/daily')
  getDaily(@Query('username') username: string, @Query('date') day: string) {
    return this.appService.getDaily(username, day);
  }

  @Get('/weekly')
  getWeekly(@Query('username') username: string, @Query('date') day: string) {
    return this.appService.getWeekly(username, day);
  }

  @Put('/daily')
  updateDaily(@Body() body: any) {
    const { username, day, data } = body;
    console.log(data);
    this.appService.updateDaily(username, day, data);
    return { ok: true };
  }

  @Get('/keyword')
  async getSafetyKeyword() {
    return this.appService.getSafetyKeyword();
  }

  @Get('/keyword/news')
  async getKeywordNews(@Query('username') username: string) {
    return this.appService.getKeywordNews(username);
  }

  @Get('/info')
  async getSafetyInfo(
    @Query('date') date: string,
    @Query('username') username: string,
  ): Promise<string> {
    return this.appService.getSafetyInfo(date, username);
  }
}
