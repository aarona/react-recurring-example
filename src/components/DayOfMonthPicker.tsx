import React from 'react'
import { DayOfMonthValidations } from './RecurringSelect';

interface DayOfMonthPickerProps {
  days: DayOfMonthValidations
  onValidationsChange: (validations: any) => void
}

export const DayOfMonthPicker: React.FC<DayOfMonthPickerProps> = ({ days, onValidationsChange }) => {
  const handleDayChange = (e: any) => {
    const day = parseInt(e.target.id)
    const index = days.indexOf(day)

    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(day);
    }
    onValidationsChange(days);
  }

  const className = (day: number) => {
    return days.indexOf(day) > -1 ? "btn active" : "btn"
  }

  return <div style={{width: "300px"}}>
    <div className="row">
      {[1, 2, 3, 4, 5, 6, 7].map((day, index) => {
        return <div className="col-xs" key={index}>
          <div id={day.toString()} className={className(day)} onClick={handleDayChange}>{day}</div>
        </div>
      })}
    </div>
    <div className="row">
      {[8, 9, 10, 11, 12, 13, 14].map((day, index) => {
        return <div className="col-xs" key={index}>
          <div id={day.toString()} className={className(day)} onClick={handleDayChange}>{day}</div>
        </div>
      })}
    </div>
    <div className="row">
      {[15, 16, 17, 18, 19, 20, 21].map((day, index) => {
        return <div className="col-xs" key={index}>
          <div id={day.toString()} className={className(day)} onClick={handleDayChange}>{day}</div>
        </div>
      })}
    </div>
    <div className="row">
      {[22, 23, 24, 25, 26, 27, 28].map((day, index) => {
        return <div className="col-xs" key={index}>
          <div id={day.toString()} className={className(day)} onClick={handleDayChange}>{day}</div>
        </div>
      })}
    </div>
    <div className="row">
      {[29, 30, 31].map((day, index) => {
        return <div className="col-xs" key={index}>
          <div id={day.toString()} className={className(day)} onClick={handleDayChange}>{day}</div>
        </div>
      })}
      <div className="col-xs last-day">
        <div id="-1" className={className(-1)} onClick={handleDayChange}>Last Day</div>
      </div>
      <div className="col-xs grid-end">
        <div></div>
      </div>
    </div>
  </div>
}

export default DayOfMonthPicker