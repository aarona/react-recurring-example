import React from 'react'
import DayOfWeekPicker from './DayOfWeekPicker'
import {
  MonthlyDayOfWeek,
  MonthlyDayOfWeekValidations
} from './RecurringSelect';

interface DayOfWeekOfMonthPickerProps {
  weeks: MonthlyDayOfWeek
  onValidationsChange: (validations: MonthlyDayOfWeekValidations) => void
}

export const DayOfWeekOfMonthPicker: React.FC<DayOfWeekOfMonthPickerProps> = ({ weeks, onValidationsChange }) => {
  const handleDayOfWeekChange = (week: number, e:any) => {

    const day = parseInt(e.target.id) as keyof MonthlyDayOfWeek
    const days = weeks[day]

    if(Array.isArray(days)) {
      const index = days.indexOf(week)

      if (index > -1) {
        days.splice(index, 1)
      } else if(days.indexOf(week) < 0){        
        days.push(week)
      }
      
      onValidationsChange({ day_of_week: weeks })
    }
  }

  const getDaysOfWeek = (week: number) => {
    const days:number[] = []

    for (let key = 0 as keyof MonthlyDayOfWeek; key < 7; key++) {
      const dayOfWeek = weeks[key];
      
      if(dayOfWeek.indexOf(week) > -1 && days.indexOf(key) === -1){
        days.push(key)
      }
    }

    return days
  }

  return <div className="monthly-day-of-the-week">
    <div>
      <DayOfWeekPicker label="Week 1: " onDayChange={handleDayOfWeekChange.bind(null, 1)} days={getDaysOfWeek(1)} />
    </div>
    <div>
      <DayOfWeekPicker label="Week 2: " onDayChange={handleDayOfWeekChange.bind(null, 2)} days={getDaysOfWeek(2)} />
    </div>
    <div>
      <DayOfWeekPicker label="Week 3: " onDayChange={handleDayOfWeekChange.bind(null, 3)} days={getDaysOfWeek(3)} />
    </div>
    <div>
      <DayOfWeekPicker label="Week 4: " onDayChange={handleDayOfWeekChange.bind(null, 4)} days={getDaysOfWeek(4)} />
    </div>
  </div>
}

export default DayOfWeekOfMonthPicker