import { Injectable } from '@angular/core';

@Injectable()

export class DateUtil {

  parseDate(date, time) {
    let partsDate = date.split("-");
    let partsTime = time.split(":");
    let result = new Date(partsDate[0], (partsDate[1] - 1), partsDate[2], partsTime[0], partsTime[1]);
    return result.getTime();
  }

  formatDate(milis: number) {
    let date = new Date(milis);
    let start = "00";

    let year = date.getFullYear();
    let month = (start + (date.getMonth() +1)).slice(-start.length);
    let day = (start + date.getDate()).slice(-start.length);

    return year + "-" + month  + "-" + day;
  }

  formatDateString(date: string) {
    let parseDate = new Date(date);
    return parseDate.getTime();
    //let parseDate = date.split("/");
    //return parseDate[2] + "-" + parseDate[0] + "-" + parseDate[1];
  }

  formatTime(milis: number) {
    let date = new Date(milis);
    let start = "00";

    let hour = (start + date.getHours()).slice(-start.length);
    let sec =  (start + date.getSeconds()).slice(-start.length);

    return hour + ":" + sec;
  }

  getMonthName(date : Date) {
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
                  'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
                  'Dezembro']

    return months[date.getMonth()];
  }

  getFirstDay(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth();

    let result = new Date(year, month, 1);
    return result.getTime();
  }

  getLastDay(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth();

    let result = new Date(year, month + 1, 0);
    return result.getTime();
  }



  countTime(time, resolve) {
    let count = 0;
    setInterval(() => {

      if(count >= time) {
          resolve(false);
      } else {
          resolve(true);
      }
      count++;
    },1000)
  }

}
