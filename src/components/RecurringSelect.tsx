import React, { useState } from 'react'
import RulePicker from './RulePicker'
import TimePicker, { TimePickerValue } from 'react-time-picker'
import DatePicker from 'react-date-picker'
import RuleSummary from "./RuleSummary"
import { DateTime } from 'luxon'
import Tabs, { Tab } from './Tabs'

export type DayOfWeek = number[]
export type MonthlyDayOfWeek = { 1: number[], 2: number[], 3: number[], 4: number[] }
export type MonthlyDayOfMonth = number[]

interface BaseValidations {
  hour_of_day?: number
  minute_of_hour?: number
}

export interface DayOfWeekValidations extends BaseValidations {
  day: DayOfWeek
}

export interface MonthlyDayOfWeekValidations extends BaseValidations {
  day_of_week: MonthlyDayOfWeek
}

export interface MonthlyDayOfMonthValidations extends BaseValidations {
  day_of_month: MonthlyDayOfMonth
}

export type Validations = BaseValidations | DayOfWeekValidations | MonthlyDayOfWeekValidations | MonthlyDayOfMonthValidations | null
type IceCubeRule = "IceCube::DailyRule" | "IceCube::WeeklyRule" | "IceCube::MonthlyRule" | "IceCube::YearlyRule"
export type IceCubeHash = {
  rule_type: IceCubeRule
  interval: number,
  until: string,
  validations: Validations
}

export interface RecurringEvent {
  rule: string
  interval: number
  validations: Validations
  until: Date | Date[]
  startTime?: Date
}

interface RecurringSelectProps {
  onSave: (json: IceCubeHash) => void
}
const RecurringSelect: React.FC<RecurringSelectProps> = ({ onSave }) => {
  const [recurringEvent, setRecurringEvent] = useState<RecurringEvent>({
    rule: 'daily',
    interval: 1,
    validations: null,
    until: DateTime.now().toJSDate(),
    startTime: DateTime.now().toJSDate()
  })

  const { rule, interval, validations, until, startTime } = recurringEvent

  const handleRuleChange = (e:any) => {
    let rule: string = e.target.value
    let validations:Validations = null

    if (rule === "weekly") {
      validations = { day: [] } as DayOfWeekValidations
    } 
    if (rule === "monthly (by day of week)") {
      rule = "monthly";
      validations = { day_of_week: { 1: [], 2: [], 3: [], 4: [] }} as MonthlyDayOfWeekValidations
    }
    if (rule === "monthly (by day of month)") {
      rule = "monthly";
      validations = { day_of_month: [] } as MonthlyDayOfMonthValidations
    }

    setRecurringEvent({
      rule: rule,
      interval,
      validations: validations,
      until,
      startTime
    })
  }
  const handleIntervalChange = (e:any) => {
    let interval = 0
    if (e.target.value !== "") {
      interval = parseInt(e.target.value)
    }

    setRecurringEvent({
      rule,
      interval: interval,
      validations,
      until,
      startTime
    })
  }
  const handleValidationsChange = (validations: Validations) => {
    setRecurringEvent({
      rule,
      interval,
      validations: validations,
      until,
      startTime
    })
  }
  const handleEndDateChange = (date: Date | Date[]) => {
    setRecurringEvent({
      rule,
      interval,
      validations,
      until: date,
      startTime
    })
  }
  const handleTimeChange = (time:TimePickerValue) => {
    var startTime: Date | undefined = undefined

    if(time) {
      startTime = DateTime.fromISO(time.toString()).toJSDate()
    }
    
    setRecurringEvent({
      rule,
      interval,
      validations,
      until,
      startTime
    })
  }
  const handleSave = () => {
    const rule_type = iceCubeRule()
    const validations: Validations = iceCubeValidtions()
    const newUntil = DateTime.fromJSDate(until as Date).toString()
    const iceCubeHash: IceCubeHash = {
      rule_type,
      interval,
      validations,
      until: newUntil
    };

    onSave(iceCubeHash);
  }

  const iceCubeRule = (): IceCubeRule => {
    switch (rule) {
      case 'daily':
        return "IceCube::DailyRule"
      case 'weekly':
        return "IceCube::WeeklyRule"
      case 'monthly':
        return "IceCube::MonthlyRule"
      case 'yearly':
        return "IceCube::YearlyRule"
      default:
        return "IceCube::DailyRule"
    }
  }

  const iceCubeValidtions = (): Validations => {
    let newValidations = validations
    let hour_of_day = 0
    let minute_of_hour = 0

    if (startTime) {
      const start = DateTime.fromJSDate(startTime)
      hour_of_day = start.hour
      minute_of_hour = start.minute
    }

    if (newValidations) {
      newValidations.hour_of_day = hour_of_day
      newValidations.minute_of_hour = minute_of_hour
    } else {
      newValidations = { hour_of_day, minute_of_hour }
    }

    return newValidations
  }

  return (
    <div className="recurring-select">
      <Tabs activeTab="Recurrence Rule">
        <Tab label="Recurrence Rule">
          <RulePicker
            rule={rule}
            interval={interval}
            validations={validations}
            onRuleChange={handleRuleChange}
            onIntervalChange={handleIntervalChange}
            onValidationsChange={handleValidationsChange} />
        </Tab>
        <Tab label="Occurence Time">
          <TimePicker
            value={startTime ? startTime : ""}
            onChange={handleTimeChange}
          />
        </Tab>
        <Tab label="Recurring Until">
          <DatePicker
            value={until}
            minDate={DateTime.now().toJSDate()}
            onChange={handleEndDateChange}
          />
        </Tab>
      </Tabs>
      <hr/>
      <RuleSummary fields={recurringEvent} />
      <button className="btn save" onClick={handleSave}>Save</button>
    </div>
  );
}

export default RecurringSelect
