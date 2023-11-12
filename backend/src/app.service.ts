import { Injectable, NotFoundException } from '@nestjs/common';
import { KeywordData, TemperatureKeywordData } from './interface/keyword.model';
import { data } from './data/data.model';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  db = data;

  getHello(): string {
    return 'Hello World!';
  }

  getDaily(username: string, day: string) {
    const dayDate = new Date(day);
    const result = this.db[username]?.find((ele) => {
      const eleDay = new Date(ele.day);
      if (eleDay.getFullYear() !== dayDate.getFullYear()) return false;
      if (eleDay.getMonth() !== dayDate.getMonth()) return false;
      if (eleDay.getDate() !== dayDate.getDate()) return false;
      return true;
    });
    if (!result) throw new NotFoundException('could not found diary');
    return result;
  }

  getWeekly(username: string, day: string) {
    const date = new Date(day);
    date.setDate(date.getDate() - date.getDay());
    const result = [];
    for (let i = 0; i <= 6; i++) {
      const date_string = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      console.log(date_string);
      try {
        result.push(this.getDaily(username, date_string));
        console.log('result become ', result);
      } catch (e) {
        console.log("couldn't find one");
        result.push({ day: date_string, data: [] });
      }
      date.setDate(date.getDate() + 1);
      console.log(date);
    }
    return result;
  }

  updateDaily(username: string, day: string, data: any) {
    if (!this.db[username]) {
      this.db[username] = [];
    }

    const dayElement = this.db[username].find((ele) => ele.day === day);
    if (dayElement) dayElement.data = data;
    else this.db[username].push({ day, data });

    console.log(this.db);
  }

  getDiaryUrl(title: string, content: string) {
    const hash = Math.random().toString().slice(2, 8);
    this.db.shared[hash] = { title, content };
    console.log(this.db.shared[hash]);
    return hash;
  }

  getDiaryByUrl(hash: string) {
    return this.db.shared[hash];
  }

  getSafetyKeyword() {
    const keyword = '# 한파주의보';
    const script = `
    안녕하세요, 여러분의 개인 안전 비서 ‘안비’입니다 !
오늘의 키워드는 #🥶한파주의보 입니다.
오늘 아침 서울 기온이 올가을 첫 영하권인 영하 1.9도를 기록했는데요.
낮 동안에도 찬 바람이 불기때문에 장시간 외출은 피해주세요!
갑작스러운 기온 변화로 인해 심혈관질환 주의해주세요!
    `;
    return { keyword, script };
  }

  getSafetyInfo(date: string, username: string): string {
    const daily = this.db[username]?.find((ele) => ele.day === date);

    let script = date + '의 **안전 정보**를 알려드리겠습니다.\n\n';

    //TODO: weather & temperature keyword
    script += TemperatureKeywordData['~10'];

    // 특정 일정 기준으로 keyword 매칭하기
    script +=
      '다음은 ' +
      date +
      '의 일정 속 키워드를 토대로 정리한 **안전 정보**에요.\n\n';

    for (const schedule of daily.data) {
      for (const data of KeywordData) {
        for (const keyword of data.keyword) {
          if (schedule.task.includes(keyword)) {
            script += '| ' + schedule['task'] + '\n';
            script += data['script'] + '\n\n';
            break;
          }
        }
      }
    }

    return script;
  }

  getTwoTopCategory(username: string) {
    const category = KeywordData.map((ele) => {
      return { category: ele.category, count: 0 };
    });
    const keyword = KeywordData.map((ele) => ele.keyword);
    const nowDate = new Date();
    nowDate.setDate(nowDate.getDate());
    const weekData = this.getWeekly(
      username,
      `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`,
    );
    for (const data in weekData) {
      for (let i = 0; i < weekData[data].data.length; i++) {
        keyword.forEach((ele, keyword_i) => {
          ele.forEach((e) => {
            if (weekData[data].data[i].task.includes(e)) {
              category[keyword_i].count++;
            }
          });
        });
      }
    }

    category.sort((a, b) => b.count - a.count);
    console.log(category);
    return category.slice(0, 2).map((ele) => ele.category);
  }

  async getKeywordNews(username: string) {
    const category = this.getTwoTopCategory(username);
    const api_url_1 =
      'https://openapi.naver.com/v1/search/news.json?query=' +
      encodeURI(category[0] + ' 사고');
    const api_url_2 =
      'https://openapi.naver.com/v1/search/news.json?query=' +
      encodeURI(category[1] + ' 사고');
    const config = {
      headers: {
        'X-Naver-Client-Id': process.env.CLIENT_ID,
        'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
      },
    };
    const data1 = await firstValueFrom(this.httpService.get(api_url_1, config));
    const data2 = await firstValueFrom(this.httpService.get(api_url_2, config));
    return {
      keyword1: {
        category: category[0],
        items: data1['data']['items'],
      },
      keyword2: {
        category: category[1],
        items: data2['data']['items'],
      },
    };
  }
}
