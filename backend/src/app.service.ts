import { Injectable, NotFoundException } from '@nestjs/common';
import { KeywordOutput } from './interface/app.model';
import { KeywordData, TemperatureKeywordData } from './interface/keyword.model';

@Injectable()
export class AppService {
  db = {
    asdf: [
      {
        day: '2023-11-11',
        data: [
          {
            checked: false,
            time: '10:00',
            position: '서울역',
            task: '지하철역 가기',
          },
          {
            checked: true,
            time: '13:00',
            position: '하이킹',
            task: '하이킹 가기',
          },
          {
            checked: false,
            time: '18:00',
            position: '서울역',
            task: '집으로 돌아가기',
          },
          { checked: true, time: '20:00', position: '집', task: '과제하기' },
        ],
      },
    ],
    shared: {
      '123456': {
        title: 'empty',
        content: 'empty content',
      },
    },
  };

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

  getWeekly(username: string, week: string) {
    const date = new Date(week);
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
    return hash;
  }

  getDiaryByUrl(hash: string) {
    return this.db.shared[hash];
  }

  getSafetyKeyword(date: string): KeywordOutput {
    const keyword = '한파';
    const choices = [
      '눈 맞고 뛰어간다',
      '맨몸으로 추위를 느낀다.',
      '야외활동은 자제한다.',
    ];
    const script = '엇!!!!! 너무 추워!!!!';
    return { keyword, choices, script };
  }

  getSafetyInfo(date: string, username: string): string {
    const daily = this.db[username]?.find((ele) => ele.day === date);

    let script = date + '의 **안전 정보**를 알려드리겠습니다.\n\n';

    //TODO: weather & temperature keyword
    script += TemperatureKeywordData[0];

    // 특정 일정 기준으로 keyword 매칭하기
    script +=
      '다음은 ' +
      date +
      '의 일정 속 키워드를 토대로 정리한 **안전 정보**에요.\n\n';

    for (const schedule in daily.data) {
      for (const data in KeywordData) {
        for (const keyword in data['keywords']) {
          if (schedule['task'].includes(keyword)) {
            script += '|' + schedule['time'] + schedule['task'] + '\n';
            script += data['script'] + '\n\n';
            break;
          }
        }
      }
    }

    return script;
  }
}
