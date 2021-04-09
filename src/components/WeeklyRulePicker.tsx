import React from 'react'
import DayOfWeekPicker from './DayOfWeekPicker'
import { DailyValidations } from './RecurringSelect';

interface WeeklyRulePickerProps {
  interval: number
  days: DailyValidations
  onIntervalChange: (e: any) => void
  onValidationsChange: (validations: DailyValidations) => void
}

const WeeklyRulePicker: React.FC<WeeklyRulePickerProps> = ({ interval, days, onIntervalChange, onValidationsChange }) => {
  const handleDayChange = (e: any) => {
    // const days = validations;
    const day = parseInt(e.target.id);
    const index = days.indexOf(day);

    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(day);
    }

    onValidationsChange(days);
  }

  // var days = validations;
  return (
    <div className="rule">
      Every <input className="interval" type="text" value={interval} onChange={onIntervalChange}></input> week(s) on:
      <DayOfWeekPicker onDayChange={handleDayChange} activeDays={days} />
    </div>
  );
}


export default WeeklyRulePicker