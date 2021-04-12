import React from 'react'
import DayOfWeekOfMonthPicker from './DayOfWeekOfMonthPicker'
import DayOfMonthPicker from './DayOfMonthPicker'
import {
  MonthlyDayOfMonthValidations,
  MonthlyDayOfWeekValidations,
  Validations
} from './RecurringSelect';

interface MonthlyRulePickerProps {
  interval: number
  validations: MonthlyDayOfMonthValidations | MonthlyDayOfWeekValidations
  onIntervalChange: (e: any) => void
  onValidationsChange: (validations: Validations) => void
}

export const MonthlyRulePicker: React.FC<MonthlyRulePickerProps> = ({
  interval,
  validations,
  onIntervalChange,
  onValidationsChange
}) => {
  const isDayOfMonth = () => {
    return (validations as MonthlyDayOfMonthValidations).day_of_month ? true : false
  }

  const PickerComponent = () => {
    let pickerComponent;

    if (isDayOfMonth()) {
      const days = (validations as MonthlyDayOfMonthValidations).day_of_month
      pickerComponent = <DayOfMonthPicker days={days} onValidationsChange={onValidationsChange} />;
    } else {
      const weeks = (validations as MonthlyDayOfWeekValidations).day_of_week
      pickerComponent = <DayOfWeekOfMonthPicker weeks={weeks} onValidationsChange={onValidationsChange} />;
    }

    return pickerComponent
  }
  
  return <div className="rule">
    Every <input className="interval" type="text" value={interval} onChange={onIntervalChange}></input> month(s) on:
    <PickerComponent />
  </div>
}

export default MonthlyRulePicker