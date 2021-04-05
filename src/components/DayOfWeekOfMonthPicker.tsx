import React from 'react'
import DayOfWeekPicker from './DayOfWeekPicker'

interface DayOfWeekOfMonthPickerProps {
  validations: any
  onValidationsChange: (validations: any) => void
}

export const DayOfWeekOfMonthPicker: React.FC<DayOfWeekOfMonthPickerProps> = ({ validations, onValidationsChange }) => {
  const handleDayOfWeekChange = (week:any, e:any) => {
    var weeks = validations;
    var days = weeks[week];
    var day = parseInt(e.target.id);
    var index = days.indexOf(day);
    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(day);
    }
    weeks[week] = days;
    onValidationsChange(weeks);
  }

  var weeks = validations;
  return (
    <div>
      <div>
        <DayOfWeekPicker label="Week 1: " onDayChange={handleDayOfWeekChange.bind(null, 1)} active={weeks[1]} />
      </div>
      <div>
        <DayOfWeekPicker label="Week 2: " onDayChange={handleDayOfWeekChange.bind(null, 2)} active={weeks[2]} />
      </div>
      <div>
        <DayOfWeekPicker label="Week 3: " onDayChange={handleDayOfWeekChange.bind(null, 3)} active={weeks[3]} />
      </div>
      <div>
        <DayOfWeekPicker label="Week 4: " onDayChange={handleDayOfWeekChange.bind(null, 4)} active={weeks[4]} />
      </div>
    </div>
  );
}

export default DayOfWeekOfMonthPicker