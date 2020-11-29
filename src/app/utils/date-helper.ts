import * as moment from 'moment';

export class DateHelper {
  static toDateString(value: string | Date): string {
    const date = new Date(value);
    return moment(date).format('YYYY/MM/DD');
  }
}
