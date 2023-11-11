import { Body, Controller, Get } from '@nestjs/common';
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

  @Get('/test')
  async getOpenAITest(@Body() body: any) {
    const data = body['data'];
    const data_prompt = data.map((ele) => `'''${ele}'''`).join(' ');
    console.log(data_prompt);
    const completion = ''; /*await this.openAI.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistent' }],
      model: 'gpt-3.5-turbo',
    });*/

    console.log(completion);
    return { ok: true };
  }
}
