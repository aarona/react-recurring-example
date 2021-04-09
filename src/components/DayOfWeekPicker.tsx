import React from 'react'
import { DailyValidations } from './RecurringSelect'

interface DayOfWeekPickerProps {
  label?: string
  days: DailyValidations
  onDayChange: (e: any) => void
}

const DayOfWeekPicker: React.FC<DayOfWeekPickerProps> = ({ label, days, onDayChange }) => {
  const Label = () => {
    if (label) {
      return <div className="col-xs">
        <div className="label">{label}</div>
      </div>
    }

    return <></>
  }

  const className = (day: number) => {
    return days.indexOf(day) > -1 ? "btn active" : "btn"
  }

  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="row">
      <Label />
      {weekdayLabels.map((weekDay, index) => {
        return <div key={index} className="col-xs">
          <div id={index.toString()} className={className(index)} onClick={onDayChange}>{weekDay}</div>
        </div>
      })}
     
    </div>
  );
}

export default DayOfWeekPicker