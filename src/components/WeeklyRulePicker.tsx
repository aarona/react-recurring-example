import React from 'react'
import DayOfWeekPicker from './DayOfWeekPicker'

interface WeeklyRulePickerProps {
  interval: number
  validations: any
  onIntervalChange: (e: any) => void
  onValidationsChange: (validations: any) => void
}

const WeeklyRulePicker: React.FC<WeeklyRulePickerProps> = ({ interval, validations, onIntervalChange, onValidationsChange }) => {
  const handleDayChange = (e: any) => {
    var days = validations;
    var day = parseInt(e.target.id);
    var index = days.indexOf(day);
    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(day);
    }
    onValidationsChange(days);
  }

  var days = validations;
  return (
    <div className="rule">
      Every <input className="interval" type="text" value={interval} onChange={onIntervalChange}></input> week(s) on:
      <DayOfWeekPicker onDayChange={handleDayChange} active={days} />
    </div>
  );
}


export default WeeklyRulePicker