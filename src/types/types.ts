/* -------------------------------------------------------------------------- */
/*                            Domain Defined Types                            */
/* -------------------------------------------------------------------------- */
export type EvenOdd = 'even' | 'odd' | 'both';

export type Weekday =
  | 'شنبه'
  | 'یکشنبه'
  | 'دوشنبه'
  | 'سه‌شنبه'
  | 'چهارشنبه'
  | 'پنجشنبه'
  | 'جمعه';

export type KlassSession = {
  klass: string;
  time: string;
  location: string;
};

export type KlassSessionTime = {
  start: string;
  end: string;
};

export type DaySchedule = Array<KlassSession>;
export type Schedule = Array<DaySchedule>;

export type WeekSchedule = {
  even_weeks_schedule: Schedule;
  odd_weeks_schedule: Schedule;
};

/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */
export type CreateKlassSessionRequest = {
  klass: string;
  day: number;
  time: string;
  location: string;
  even_odd: string;
};

export type CreateKlassSessionResponse = {
  message: string;
};

export type UpdateKlassSessionRequest = {
  day: number;
  time: string;
  even_odd: string;
  updatedSession: Partial<KlassSession>;
};

export type deleteKlassSessionRequest = {
  day: number;
  even_odd: string;
  time: string;
};
