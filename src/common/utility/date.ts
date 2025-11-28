import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import 'dayjs/locale/fa';

dayjs.extend(jalaliday);

export function toJalali(date: Date | string | number) {
  return dayjs(date).calendar('jalali').locale('fa').format('YYYY/MM/DD');
}
