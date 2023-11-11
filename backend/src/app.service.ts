import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  db = {
    asdf: [
      {
        day: '2023-11-11',
        data: [
          { time: '10:00', position: '서울역', task: '지하철역 가기' },
          { time: '13:00', position: '하이킹', task: '하이킹 가기' },
          { time: '18:00', position: '서울역', task: '집으로 돌아가기' },
          { time: '20:00', position: '집', task: '과제하기' },
        ],
      },
    ],
  };

  getHello(): string {
    return 'Hello World!';
  }

  getDaily(username: string, day: string) {
    return this.db[username]?.find((ele) => ele.day === day);
  }

  getWeekly(username: string, week: string) {
    const date = new Date(week);
    date.setDate(date.getDate() - date.getDay());
    const result = [];
    for (let i = 0; i <= 6; i++) {
      const date_string = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      result.push(this.getDaily(username, date_string));
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
}
