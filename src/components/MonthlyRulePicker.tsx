import React from 'react'
import DayOfWeekOfMonthPicker from './DayOfWeekOfMonthPicker'
import DayOfMonthPicker from './DayOfMonthPicker'

interface MonthlyRulePickerProps {
  interval: number
  validations: any
  onIntervalChange: (e: any) => void
  onValidationsChange: (validations: any) => void
}

export const MonthlyRulePicker: React.FC<MonthlyRulePickerProps> = ({
  interval,
  validations,
  onIntervalChange,
  onValidationsChange
}) => {
  var pickerComponent;
  if (validations.constructor === Array) {
    pickerComponent = <DayOfMonthPicker validations={validations} onValidationsChange={onValidationsChange} />;
  } else if (validations.constructor === Object) {
    pickerComponent = <DayOfWeekOfMonthPicker validations={validations} onValidationsChange={onValidationsChange} />;
  }
  return (
    <div className="rule">
      Every <input className="interval" type="text" value={interval} onChange={onIntervalChange}></input> month(s) on:
      {pickerComponent}
    </div>
  );
}

export default MonthlyRulePicker