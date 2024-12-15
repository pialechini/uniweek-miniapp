import { toast } from '@/components/Toast';
import Button from '@/components/forms/Button';
import Dropdown from '@/components/forms/Dropdown';
import RadioGroup from '@/components/forms/RadioGroup';
import TextInput from '@/components/forms/TextInput';
import { replaceWithEnglishNumbers, weekdays } from '@/helpers';
import { createKlassSession } from '@/services/klassSessionApi';
import type { EvenOdd, Weekday } from '@/types';
import { useState } from 'react';

import styles from './newSession.module.scss';

const weekParities: Record<EvenOdd, string> = {
  even: 'هفته های زوج',
  odd: 'هفته های فرد',
  both: 'هر هفته',
};

const timeSlots = [
  '۰۸:۰۰ تا ۰۹:۳۰',
  '۱۰:۰۰ تا ۱۱:۳۰',
  '۱۲:۰۰ تا ۱۳:۳۰',
  '۱۴:۰۰ تا ۱۵:۳۰',
  '۱۶:۰۰ تا ۱۷:۳۰',
];

function NewSession() {
  const [selectedDays, setSelectedDays] = useState<Weekday[]>([weekdays[0]]);
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0]);
  const [selectedParity, setSelectedParity] = useState<EvenOdd>('even');
  const [klassName, setKlassName] = useState<string>('');
  const [klassLocation, setKlassLocation] = useState<string>('');

  const handleCreateSession = async () => {
    const requests = selectedDays.map((day) => {
      const payload = {
        klass: klassName,
        day: weekdays.indexOf(day),
        time: replaceWithEnglishNumbers(selectedTime.replace('تا', '-').trim()),
        location: klassLocation,
        even_odd: selectedParity,
      };

      return createKlassSession(payload);
    });

    await Promise.all(requests)
      .then(() => toast.success('ایجاد جلسه جدید', 'درخواست موفقیت آمیز بود'))
      .catch((error) => {
        console.error(error);
        toast.error('ایجاد جلسه جدید', 'خطا در ایجاد جلسه جدید');
      });
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

        {/* Day */}
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
        <Dropdown header={weekParities[selectedParity]}>
          <RadioGroup
            items={Object.values(weekParities)}
            intialSelectedItemIndex={Object.keys(weekParities).indexOf(
              selectedParity,
            )}
            onChange={(selectedItemIndex) => {
              setSelectedParity(
                Object.keys(weekParities)[selectedItemIndex] as EvenOdd,
              );
            }}
          />
        </Dropdown>

        {/* Time */}
        <Dropdown header={selectedTime || 'زمان کلاس'}>
          <RadioGroup
            items={timeSlots}
            intialSelectedItemIndex={timeSlots.indexOf(selectedTime)}
            onChange={(selectedItemIndex) => {
              setSelectedTime(timeSlots[selectedItemIndex]);
            }}
          />
        </Dropdown>

        <Button onClick={handleCreateSession}>ایجاد</Button>
      </form>
    </div>
  );
}

export default NewSession;
