import { toast } from '@/components/Toast';
import Button from '@/components/forms/Button';
import Dropdown from '@/components/forms/Dropdown';
import RadioGroup from '@/components/forms/RadioGroup';
import TextInput from '@/components/forms/TextInput';
import { replaceWithEnglishNumbers, weekdays } from '@/helpers';
import { createKlassSession } from '@/services/weekScheduleApi';
import type { EvenOdd, Weekday } from '@/types';
import { union } from 'lodash';
import { useState } from 'react';

import styles from './newSession.module.scss';

const WEEK_PARITIES: Record<EvenOdd, string> = {
  even: 'هفته های زوج',
  odd: 'هفته های فرد',
  both: 'هر هفته',
};

const TIME_SLOTS = [
  '۰۸:۰۰ - ۰۹:۳۰',
  '۱۰:۰۰ - ۱۱:۳۰',
  '۱۲:۰۰ - ۱۳:۳۰',
  '۱۴:۰۰ - ۱۵:۳۰',
  '۱۶:۰۰ - ۱۷:۳۰',
];

function NewSession() {
  const [selectedDays, setSelectedDays] = useState<Weekday[]>([weekdays[0]]);
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[0]);
  const [selectedParity, setSelectedParity] = useState<EvenOdd>('even');
  const [klassName, setKlassName] = useState<string>('');
  const [klassLocation, setKlassLocation] = useState<string>('');

  const handleCreateSession = () => {
    const payload = {
      klass: klassName.trim(),
      days: selectedDays.map((selectedDay) => weekdays.indexOf(selectedDay)),
      time: replaceWithEnglishNumbers(selectedTime.replace(/ /g, '').trim()),
      location: klassLocation.trim(),
      even_odd: selectedParity,
    };

    createKlassSession(payload)
      .then((response) => {
        const { successfullyAddedDays, conflictingDays } = response!.details;

        console.log(response!.details);

        if (successfullyAddedDays.length > 0) {
          const addedDaysNames = successfullyAddedDays.map(
            (day) => weekdays[day],
          );
          toast.success(
            'جلسات با موفقیت اضافه شدند:',
            addedDaysNames.join(', '),
          );
        }

        // Display error message for conflicting days
        if (conflictingDays.length > 0) {
          const conflictingDaysNames = conflictingDays.map(
            (day) => weekdays[day],
          );
          toast.error(
            'جلسات به دلیل تداخل در روزهای زیر اضافه نشدند:',
            conflictingDaysNames.join(', '),
          );
        }
      })
      .catch(() => {});
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Klass Name */}
        <TextInput
          placeholder="نام درس را وارد کنید"
          value={klassName}
          onChange={(e) => setKlassName(e.target.value)}
        />

        {/* Day(s) */}
        <Dropdown header={selectedDays.join(' - ') || 'روز هفته را مشخص کنید'}>
          <RadioGroup
            multipleChoice
            items={weekdays}
            intialSelectedItemIndex={selectedDays.map((day) =>
              weekdays.indexOf(day),
            )}
            onChange={(selectedItemIndices) => {
              setSelectedDays(
                selectedItemIndices.map((index) => weekdays[index]),
              );
            }}
          />
        </Dropdown>

        {/* Klass Location */}
        <TextInput
          placeholder="محل برگزاری کلاس را وارد کنید"
          value={klassLocation}
          onChange={(e) => setKlassLocation(e.target.value)}
        />

        {/* Weeks */}
        <Dropdown header={WEEK_PARITIES[selectedParity]}>
          <RadioGroup
            items={Object.values(WEEK_PARITIES)}
            intialSelectedItemIndex={Object.keys(WEEK_PARITIES).indexOf(
              selectedParity,
            )}
            onChange={(selectedItemIndex) => {
              setSelectedParity(
                Object.keys(WEEK_PARITIES)[selectedItemIndex] as EvenOdd,
              );
            }}
          />
        </Dropdown>

        {/* Time */}
        <Dropdown header={selectedTime || 'زمان کلاس'}>
          <RadioGroup
            items={TIME_SLOTS}
            intialSelectedItemIndex={TIME_SLOTS.indexOf(selectedTime)}
            onChange={(selectedItemIndex) => {
              setSelectedTime(TIME_SLOTS[selectedItemIndex]);
            }}
          />
        </Dropdown>

        <Button onClick={handleCreateSession}>ایجاد</Button>
      </form>
    </div>
  );
}

export default NewSession;
