import React, { useState } from 'react'
import RulePicker from './RulePicker'
import TimePicker, { TimePickerValue } from 'react-time-picker'
import DatePicker from 'react-date-picker'
import RuleSummary from "./RuleSummary"
import { DateTime } from 'luxon'
import Tabs, { Tab } from './Tabs'

type BaseValidations = { hour_of_day?: number, minute_of_hour?: number }
export type DailyValidations = number[] & BaseValidations
export type DayOfWeekValidations = { 1: number[], 2: number[], 3: number[], 4: number[] } & BaseValidations
export type DayOfMonthValidations = number[] & BaseValidations
export type Validations = DailyValidations | DayOfWeekValidations | DayOfMonthValidations | null
export type IceCubeRule = "IceCube::DailyRule" | "IceCube::WeeklyRule" | "IceCube::MonthlyRule" | "IceCube::YearlyRule"
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

const RecurringSelect: React.FC = () => {
  const [recurringEvent, setRecurringEvent] = useState<RecurringEvent>({
    rule: 'daily',
    interval: 1,
    validations: null,
    until: DateTime.now().toJSDate(),
    startTime: DateTime.now().toJSDate()
  })

  const { rule, interval, validations, until, startTime } = recurringEvent
  const onSave = (hash: any) => {
    // debugger
    console.log("Hash: ", JSON.parse(hash));
  }
  const handleRuleChange = (e:any) => {
    let rule: string = e.target.value;
    let validations:Validations = null;
    if (rule === "weekly") validations = [] as number[];
    if (rule === "monthly (by day of week)") {
      rule = "monthly";
      validations = { 1: [], 2: [], 3: [], 4: [] } as DayOfWeekValidations;
    }
    if (rule === "monthly (by day of month)") {
      rule = "monthly";
      validations = [] as number[];
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
    
    // DateTime.now().toJSDate()
    // console.log("handleTimeChat: ", time);
    
    setRecurringEvent({
      rule,
      interval,
      validations,
      until,
      startTime
    })
  }
  const handleSave = () => {
    // console.log(validations);
    // console.log("startTime: ", startTime);
    
    let minute = 0
    let hour = 0

    if(startTime) {
      var start = DateTime.fromJSDate(startTime)
      // console.log("start: ", start);
      minute = start.minute
      hour = start.hour
    }

    let rule_type:IceCubeRule = "IceCube::DailyRule"
    switch (rule) {
      case 'daily':
                rule_type = "IceCube::DailyRule";
                break;
      case 'weekly':
                rule_type = "IceCube::WeeklyRule";
                break;
      case 'monthly':
                rule_type = "IceCube::MonthlyRule";
                break;
      case 'yearly':
                rule_type = "IceCube::YearlyRule";
                break;
    }
    // var validations:any = validations == null ? {} : validations;
    let newValidations:any = {};
    if (Array.isArray(validations) && rule_type === "IceCube::WeeklyRule") {
      newValidations["day"] = validations
    } else if (Array.isArray(validations) && rule_type === "IceCube::MonthlyRule") {
      newValidations["day_of_month"] = validations;
    } else if (rule_type === "IceCube::MonthlyRule") {
      newValidations["day_of_week"] = validations;
    }
    newValidations["hour_of_day"] = hour;
    newValidations["minute_of_hour"] = minute;
    
    const iceCubeHash: IceCubeHash = {
      rule_type,
      interval,
      validations: newValidations,
      until: DateTime.fromJSDate(until as Date).toString()
    };

    onSave(JSON.stringify(iceCubeHash));
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
          {/* <TimePicker
            value={DateTime.now().toJSDate()}
            onChange={handleTimeChange}
          /> */}
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
