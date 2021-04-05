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

export interface RecurringEvent {
  rule: string
  interval: number
  validations: Validations
  until: Date | Date[]
  startTime: string
}

const RecurringSelect: React.FC = () => {
  const [recurringEvent, setRecurringEvent] = useState<RecurringEvent>({
    rule: 'daily',
    interval: 1,
    validations: null,
    until: DateTime.now().toJSDate(),
    startTime: '10:00 AM'
  })

  const { rule, interval, validations, until, startTime } = recurringEvent
  const onSave = (hash: any) => {
    // debugger
    console.log("Hash: ", JSON.parse(hash));
  }
  const handleRuleChange = (e:any) => {
    let rule: string = e.target.value;
    let validations:Validations = null;
    if (rule === "weekly") validations = [];
    if (rule === "monthly (by day of week)") {
      rule = "monthly";
      validations = { 1: [], 2: [], 3: [], 4: [] };
    }
    if (rule === "monthly (by day of month)") {
      rule = "monthly";
      validations = [];
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
  const handleValidationsChange = (validations:any) => {
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
    console.log("handleTimeChat: ", time);
    
    setRecurringEvent({
      rule,
      interval,
      validations,
      until,
      startTime: time.toString()
    })
  }
  const handleSave = () => {
    console.log(validations);
    
    var iceCubeHash:any = {};
    console.log("startTime: ", startTime);
    
    var start = DateTime.fromFormat(startTime, "hh:mm a A");
    console.log("start: ", start);
    
    var minute = start.minute
    var hour = start.hour
    var rule_type;
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
    iceCubeHash["rule_type"] = rule_type;
    iceCubeHash["interval"] = interval;
    iceCubeHash["validations"] = newValidations;
    iceCubeHash["until"] = until;
    onSave(JSON.stringify(iceCubeHash));
  }

  // const minDate = DateTime.fromFormat(DateTime.now().toString(), "YYYY-MM-DD").toJSDate()
  const minDate = DateTime.now().toJSDate()
  // const newStartTime = DateTime.fromFormat(startTime, "hh:mm a A").toString()
  const newStartTime = startTime as TimePickerValue
  console.log("startTime: ", newStartTime);
  console.log("broke startTime: ", DateTime.fromFormat(newStartTime.toString(), "hh:mm a A").toString());
  
  
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
          <TimePicker value={newStartTime} onChange={handleTimeChange} />
        </Tab>
        <Tab label="Recurring Until">
          <DatePicker minDate={minDate} value={until} onChange={handleEndDateChange} />
        </Tab>
      </Tabs>
      <hr/>
      <RuleSummary fields={recurringEvent} />
      <button className="btn save" onClick={handleSave}>Save</button>
    </div>
  );
}

export default RecurringSelect
