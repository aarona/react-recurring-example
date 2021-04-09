import React from 'react'
import DayOfWeekOfMonthPicker from './DayOfWeekOfMonthPicker'
import DayOfMonthPicker from './DayOfMonthPicker'
import { DayOfMonthValidations, DayOfWeekValidations } from './RecurringSelect';

interface MonthlyRulePickerProps {
  interval: number
  validations: DayOfMonthValidations | DayOfWeekValidations
  onIntervalChange: (e: any) => void
  onValidationsChange: (validations: any) => void
}

export const MonthlyRulePicker: React.FC<MonthlyRulePickerProps> = ({
  interval,
  validations,
  onIntervalChange,
  onValidationsChange
}) => {
  let pickerComponent;
  if (validations.constructor === Array) {
    pickerComponent = <DayOfMonthPicker days={validations} onValidationsChange={onValidationsChange} />;
  } else if (validations.constructor === Object) {
    const valid = validations as DayOfWeekValidations
    pickerComponent = <DayOfWeekOfMonthPicker weeks={valid} onValidationsChange={onValidationsChange} />;
  }
  return <div className="rule">
    Every <input className="interval" type="text" value={interval} onChange={onIntervalChange}></input> month(s) on:
    {pickerComponent}
  </div>
}

export default MonthlyRulePicker