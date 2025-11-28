import 'dayjs';

declare module 'dayjs' {
  interface Dayjs {
    calendar(calendar: 'jalali'): Dayjs;
  }
}

declare module 'jalaliday';
