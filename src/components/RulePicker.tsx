import React from 'react'
import DailyRulePicker from './DailyRulePicker'
import WeeklyRulePicker from './WeeklyRulePicker'
import MonthlyRulePicker from './MonthlyRulePicker'
import YearlyRulePicker from './YearlyRulePicker'
import {
  DayOfWeekValidations,
  MonthlyDayOfMonthValidations,
  MonthlyDayOfWeekValidations,
  Validations
} from './RecurringSelect'

interface RulePickerProps {
  rule: string
  interval: number
  validations: Validations
  onRuleChange: (e: any) => void
  onIntervalChange: (e: any) => void
  onValidationsChange: (validations: Validations) => void
}

const RulePicker: React.FC<RulePickerProps> = ({
  rule,
  interval,
  validations,
  onRuleChange,
  onIntervalChange,
  onValidationsChange
}) => {
  const Picker = () => {
    switch (rule) {
      case "daily":
        return <DailyRulePicker
          interval={interval}
          onIntervalChange={onIntervalChange}
        />
      case "weekly":
        const weeklyDays = validations as DayOfWeekValidations

        return <WeeklyRulePicker
          interval={interval}
          days={weeklyDays.day}
          onIntervalChange={onIntervalChange}
          onValidationsChange={onValidationsChange}
        />
      case "monthly":
        const monthlyDays = validations as MonthlyDayOfWeekValidations | MonthlyDayOfMonthValidations

        return <MonthlyRulePicker
          interval={interval}
          validations={monthlyDays}
          onIntervalChange={onIntervalChange}
          onValidationsChange={onValidationsChange}
        />
      case "yearly":
        return <YearlyRulePicker
          interval={interval}
          onIntervalChange={onIntervalChange}
        />
    }
    return <></>
  }

  return (
    <div>
      Recurrence Rule:
      <select onChange={onRuleChange} >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly (by day of week)">Monthly (by day of week)</option>
        <option value="monthly (by day of month)">Monthly (by day of month)</option>
        <option value="yearly">Yearly</option>
      </select>
      <Picker />
    </div>
  );
}

export default RulePicker
