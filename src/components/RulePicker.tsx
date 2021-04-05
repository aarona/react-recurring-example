import React from 'react'
import DailyRulePicker from './DailyRulePicker'
import WeeklyRulePicker from './WeeklyRulePicker'
import MonthlyRulePicker from './MonthlyRulePicker'
import YearlyRulePicker from './YearlyRulePicker'

interface RulePickerProps {
  rule: string
  interval: number
  validations: any
  onRuleChange: (e: any) => void
  onIntervalChange: (e: any) => void
  onValidationsChange: (validations: any) => void
}

const RulePicker: React.FC<RulePickerProps> = ({
  rule,
  interval,
  validations,
  onRuleChange,
  onIntervalChange,
  onValidationsChange
}) => {
  const getRule = () => {
    switch (rule) {
      case "daily":
        return <DailyRulePicker
          interval={interval}
          onIntervalChange={onIntervalChange}
        />
      case "weekly":
        return <WeeklyRulePicker
          interval={interval}
          validations={validations}
          onIntervalChange={onIntervalChange}
          onValidationsChange={onValidationsChange}
        />
      case "monthly":
        return <MonthlyRulePicker
          interval={interval}
          validations={validations}
          onIntervalChange={onIntervalChange}
          onValidationsChange={onValidationsChange}
        />
      case "yearly":
        return <YearlyRulePicker
          interval={interval}
          onIntervalChange={onIntervalChange}
        />
    }
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
      {getRule()}
    </div>
  );
}

export default RulePicker
