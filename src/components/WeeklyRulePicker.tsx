import React from 'react'
import DayOfWeekPicker from './DayOfWeekPicker'
import { DayOfWeek, DayOfWeekValidations } from './RecurringSelect';

interface WeeklyRulePickerProps {
  interval: number
  days: DayOfWeek
  onIntervalChange: (e: any) => void
  onValidationsChange: (validations: DayOfWeekValidations) => void
}

const WeeklyRulePicker: React.FC<WeeklyRulePickerProps> = ({ interval, days, onIntervalChange, onValidationsChange }) => {
  const handleDayChange = (e: any) => {
    const day = parseInt(e.target.id);
    const index = days.indexOf(day);

    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(day);
    }

    onValidationsChange({ day: days});
  }

  return (
    <div className="rule">
      Every <input className="interval" type="text" value={interval} onChange={onIntervalChange}></input> week(s) on:
      <DayOfWeekPicker onDayChange={handleDayChange} days={days} />
    </div>
  );
}


export default WeeklyRulePicker