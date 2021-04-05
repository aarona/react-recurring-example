import React from 'react'
import cn from 'classnames'

interface DayOfWeekPickerProps {
  label?: string
  active: any
  onDayChange: (e: any) => void
}

const DayOfWeekPicker: React.FC<DayOfWeekPickerProps> = ({ label, active, onDayChange }) => {
  const Label = () => {
    if (label) {
      return React.createElement('div', { className: "col-xs" }, React.createElement('div', { className: "label" }, label));
    }

    return <></>
  }

  var activeDays = active;
  return (
    <div className="row">
      <Label />
      <div className="col-xs">
        <div id="0" className={cn("btn", {active: activeDays.indexOf(0) > -1})} onClick={onDayChange}>Sun</div>
      </div>
      <div className="col-xs">
        <div id="1" className={cn("btn", {active: activeDays.indexOf(1) > -1})} onClick={onDayChange}>Mon</div>
      </div>
      <div className="col-xs">
        <div id="2" className={cn("btn", {active: activeDays.indexOf(2) > -1})} onClick={onDayChange}>Tue</div>
      </div>
      <div className="col-xs">
        <div id="3" className={cn("btn", {active: activeDays.indexOf(3) > -1})} onClick={onDayChange}>Wed</div>
      </div>
      <div className="col-xs">
        <div id="4" className={cn("btn", {active: activeDays.indexOf(4) > -1})} onClick={onDayChange}>Thu</div>
      </div>
      <div className="col-xs">
        <div id="5" className={cn("btn", {active: activeDays.indexOf(5) > -1})} onClick={onDayChange}>Fri</div>
      </div>
      <div className="col-xs">
        <div id="6" className={cn("btn", {active: activeDays.indexOf(6) > -1})} onClick={onDayChange}>Sat</div>
      </div>
    </div>
  );
}

export default DayOfWeekPicker