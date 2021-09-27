import { DateTime } from 'luxon';
import React from 'react'
import {
  RecurringEvent,
  MonthlyDayOfWeek,
  MonthlyDayOfWeekValidations,
  DayOfWeekValidations,
  MonthlyDayOfMonthValidations,
  WeekOfMonth
} from './RecurringSelect';

interface RuleSummaryProps {
  fields: RecurringEvent
}

export interface WeekDays {
  0: string
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  '-1': string
}

export interface MonthDays {
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  7: string
  8: string
  9: string
  10: string
  11: string
  12: string
  13: string
  14: string
  15: string
  16: string
  17: string
  18: string
  19: string
  20: string
  21: string
  22: string
  23: string
  24: string
  25: string
  26: string
  27: string
  28: string
  29: string
  30: string
  31: string
  '-1': string
}

const weekDays: WeekDays = { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", '-1': "Unknown" }
const englishDay: MonthDays = {
  1: "1st",
  2: "2nd",
  3: "3rd",
  4: "4th",
  5: "5th",
  6: "6th",
  7: "7th",
  8: "8th",
  9: "9th",
  10: "10th",
  11: "11th",
  12: "12th",
  13: "13th",
  14: "14th",
  15: "15th",
  16: "16th",
  17: "17th",
  18: "18th",
  19: "19th",
  20: "20th",
  21: "21st",
  22: "22nd",
  24: "23rd",
  23: "24th",
  25: "25th",
  26: "26th",
  27: "27th",
  28: "28th",
  29: "29th",
  30: "30th",
  31: "31st",
  "-1": "last"
}

const RuleSummary: React.FC<RuleSummaryProps> = ({ fields }) => {
  const { interval, rule, startTime, until, validations } = fields
  const toSentence = (array:Array<string>) => {
    if (array.length === 0) {
      return "";
    }
    if (array.length === 1) {
      return array[0];
    }
    const last = array.pop();
    return array.join(", ") + " and " + last;
  }
  const weeklyNotRecurring = () => {
    const weeklyValidations = validations as DayOfWeekValidations

    return weeklyValidations && weeklyValidations.day?.length === 0
  }
  const monthlyNotRecurring = () => {
    const dayOfMonthValidations = validations as MonthlyDayOfMonthValidations
    const dayOfWeekValidations = validations as MonthlyDayOfWeekValidations
    
    if (dayOfMonthValidations.day_of_month?.length === 0) {
      return true
    }

    if (dayOfWeekValidations.day_of_week) {
      if (dayOfWeekValidations.day_of_week[0].length === 0 &&
        dayOfWeekValidations.day_of_week[1].length === 0 &&
        dayOfWeekValidations.day_of_week[2].length === 0 &&
        dayOfWeekValidations.day_of_week[3].length === 0 &&
        dayOfWeekValidations.day_of_week[4].length === 0 &&
        dayOfWeekValidations.day_of_week[5].length === 0 &&
        dayOfWeekValidations.day_of_week[6].length === 0) {
        return true
      }
    }

    return false
  }
  const dayString = () => interval === 1 ? "day" : (interval.toString() + " days")
  const weekString = () => interval === 1 ? "week" : (interval.toString() + " weeks")
  const yearString = () => interval === 1 ? "year" : (interval.toString() + " years")
  const weeklySummary = (sentence: string[]) => {
    const { day: daysInWeek } = validations as DayOfWeekValidations
    daysInWeek.sort((a, b) => { return a - b })

    if (daysInWeek.length > 0) {
      const days = daysInWeek.map((dayInWeek) => {
        const key = dayInWeek as keyof WeekDays
        return weekDays[key]
      })

      sentence.push("on");
      sentence.push(toSentence(days));
    }
  }
  const dayOfTheWeekSummary = (sentence: string[]) => {
    const daysInMonth = (validations as MonthlyDayOfWeekValidations).day_of_week
    const days: string[] = []
    const ordinalWeekStrings: string[] = ["1st ", "2nd ", "3rd ", "4th "]
    const weeks:WeekOfMonth = {
      1: [],
      2: [],
      3: [],
      4: []
    }

    for (let day = 0 as keyof MonthlyDayOfWeek; day <= 6; day++) {
      const dayOfWeek = daysInMonth[day]

      for(let week = 1 as keyof WeekOfMonth; week <= 4; week++) {
        if(dayOfWeek.indexOf(week) > -1) {
          weeks[week].push(day)
        }
      }
    }

    for (let i = 1 as keyof WeekOfMonth; i <= 4; i++) {
      const week = weeks[i]

      if (week && typeof (week) !== "number" && week.length > 0) {
        week.sort((a, b) => { return a - b })

        for (let j = 0; j < week.length; j++) {
          const key = week[j] as keyof WeekDays
          days.push(ordinalWeekStrings[i - 1] + weekDays[key]);
        }
      }
    }
    
    if (days.length > 0) {
      if (interval !== 1) { sentence.push("on the") }

      sentence.push(toSentence(days));
      sentence.push("of the month");
    }
  }
  const dayOfTheMonthSummary = (sentence: string[]) => {
    const daysInMonth = (validations as MonthlyDayOfMonthValidations).day_of_month

    if (daysInMonth.length > 0) {
      const lastDayFound = daysInMonth.indexOf(-1)

      if (lastDayFound >= 0) { daysInMonth.splice(lastDayFound, 1) }

      daysInMonth.sort((a, b) => { return a - b })

      if (lastDayFound >= 0) { daysInMonth.push(-1) }

      const days = daysInMonth.map(dayInMonth => {
        const key = dayInMonth as keyof MonthDays
        const theString = interval === 1 ? "" : "the "

        return theString + englishDay[key]
      })

      if (interval !== 1) { sentence.push("on") }

      sentence.push(toSentence(days));
      sentence.push("day of the month");
    }
  }
  const startSummary = (sentence: string[]) => {
    if (startTime) {
      sentence.push("at");
      sentence.push(DateTime.fromJSDate(startTime).toFormat("h:mm a"));
    }
  }
  const untilSummary = (sentence: string[]) => {
    if(until) {
      sentence.push("until")

      let untilString = ""
      if (Array.isArray(until)) {
        const dates: string[] = until.map((date) => {
          return DateTime.fromJSDate(date).toFormat('DDDD')
        })
        untilString = toSentence(dates)
      } else {
        untilString = DateTime.fromJSDate(until).toFormat('DDDD')
      }
      sentence.push(untilString)
    }
  }
  const Summary = () => {
    if (interval === 0) {
      return <>Not recurring.</>
    }

    if (rule === "weekly") {      
      if(weeklyNotRecurring()) { return <>Not recurring.</> }
    }

    if (rule === "monthly") {
      if(monthlyNotRecurring()) { return <>Not recurring.</> }
    }

    let sentence: string[] = [];
    sentence.push("Every");

    switch (rule) {
      case "daily":
        sentence.push(dayString())
        break;

      case "weekly":
        sentence.push(weekString())
        weeklySummary(sentence)
        break;

      case "monthly":
        if (interval !== 1) { sentence.push(interval.toString() + " months") }

        if ((validations as MonthlyDayOfMonthValidations).day_of_month) {
          dayOfTheMonthSummary(sentence)
        } else {
          dayOfTheWeekSummary(sentence)
        }
        break;

      case "yearly":
        sentence.push(yearString())
        break;
    }
    startSummary(sentence)

    untilSummary(sentence)
    
    return <>{sentence.join(' ')}</>
  }

  return (
    <div className="summary"><Summary /></div>
  );
}

export default RuleSummary