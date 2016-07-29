export class DateUtil {

  getMonthName(date : Date) {
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
                  'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
                  'Dezembro']

    return months[date.getMonth()];
  }

}
