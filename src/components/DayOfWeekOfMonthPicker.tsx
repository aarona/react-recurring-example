import React from 'react'
import DayOfWeekPicker from './DayOfWeekPicker'
import { DayOfWeekValidations } from './RecurringSelect';

interface DayOfWeekOfMonthPickerProps {
  weeks: DayOfWeekValidations
  onValidationsChange: (validations: DayOfWeekValidations) => void
}

export const DayOfWeekOfMonthPicker: React.FC<DayOfWeekOfMonthPickerProps> = ({ weeks, onValidationsChange }) => {
  const handleDayOfWeekChange = (week:number, e:any) => {
    const key = week as keyof DayOfWeekValidations
    const days = weeks[key]
    const day = parseInt(e.target.id)

    if(Array.isArray(days)) {
      const index = days.indexOf(day)
      if (index > -1) {
        days.splice(index, 1)
      } else {
        days.push(day)
      }
      
      onValidationsChange(weeks)
    }
  }

  return <div className="monthly-day-of-the-week">
    <div>
      <DayOfWeekPicker label="Week 1: " onDayChange={handleDayOfWeekChange.bind(null, 1)} days={weeks[1]} />
    </div>
    <div>
      <DayOfWeekPicker label="Week 2: " onDayChange={handleDayOfWeekChange.bind(null, 2)} days={weeks[2]} />
    </div>
    <div>
      <DayOfWeekPicker label="Week 3: " onDayChange={handleDayOfWeekChange.bind(null, 3)} days={weeks[3]} />
    </div>
    <div>
      <DayOfWeekPicker label="Week 4: " onDayChange={handleDayOfWeekChange.bind(null, 4)} days={weeks[4]} />
    </div>
  </div>
}

export default DayOfWeekOfMonthPicker