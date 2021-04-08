import { DateTime } from 'luxon';
import React from 'react'
import { RecurringEvent, DailyValidations, DayOfMonthValidations, DayOfWeekValidations } from './RecurringSelect';

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
  1: "the 1st",
  2: "the 2nd",
  3: "the 3rd",
  4: "the 4th",
  5: "the 5th",
  6: "the 6th",
  7: "the 7th",
  8: "the 8th",
  9: "the 9th",
  10: "the 10th",
  11: "the 11th",
  12: "the 12th",
  13: "the 13th",
  14: "the 14th",
  15: "the 15th",
  16: "the 16th",
  17: "the 17th",
  18: "the 18th",
  19: "the 19th",
  20: "the 20th",
  21: "the 21st",
  22: "the 22nd",
  24: "the 23rd",
  23: "the 24th",
  25: "the 25th",
  26: "the 26th",
  27: "the 27th",
  28: "the 28th",
  29: "the 29th",
  30: "the 30th",
  31: "the 31st",
  "-1": "the last",
};

const RuleSummary: React.FC<RuleSummaryProps> = ({ fields }) => {
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
  const summary = (fields:RecurringEvent) => {
    if (fields.interval === 0) {
      return "Not recurring."
    }

    let sentence: string[] = [];
    sentence.push("Every");

    switch (fields.rule) {
      case "daily":
        const dayString = fields.interval === 1 ? "day" : (fields.interval.toString() + " days")
        sentence.push(dayString)
        break;

      case "weekly":
        const weekString = fields.interval === 1 ? "week" : (fields.interval.toString() + " weeks")
        sentence.push(weekString)

        const daysInWeek = fields.validations! as DailyValidations
        daysInWeek.sort((a, b) => { return a - b })
        
        if (daysInWeek.length > 0) {
          const days = daysInWeek.map(dayInWeek => {
            const key = dayInWeek as keyof WeekDays
            return weekDays[key]
          })
          
          sentence.push("on");
          sentence.push(toSentence(days));
        }
        break;

      case "monthly":
        const monthString = fields.interval === 1 ? "month" : (fields.interval.toString() + " months")
        if(fields.interval !== 1) { sentence.push(monthString) }
        if (fields.validations!.constructor === Array) {

          const daysInMonth = fields.validations as DayOfMonthValidations
          
          if (daysInMonth.length > 0) {
            const lastDayFound = daysInMonth.indexOf(-1)
            
            if(lastDayFound >= 0) { daysInMonth.splice(lastDayFound, 1) }

            daysInMonth.sort((a, b) => { return a - b })

            if(lastDayFound >= 0) { daysInMonth.push(-1) }

            const days = daysInMonth.map(dayInMonth => {
              const key = dayInMonth as keyof MonthDays
              return englishDay[key]
            })

            if (fields.interval !== 1) { sentence.push("on") }

            sentence.push(toSentence(days));
            sentence.push("day of the month");
          }
        } else {
          const daysInMonth = fields.validations! as DayOfWeekValidations
          const days: string[] = []
          const ordinalWeekStrings: string[] = ["1st ", "2nd ", "3rd ", "4th "]

          for (let i = 1; i <= 4; i++) {
            const week = daysInMonth[i as keyof DayOfWeekValidations]!
            
            if (week && typeof(week) !== "number" && week.length > 0) {
              week.sort((a, b) => { return a - b})

              for (let j = 0; j < week.length; j++) {
                const key = week[j] as keyof WeekDays
                days.push(ordinalWeekStrings[i - 1] + weekDays[key]);
              }
            }
          }

          if (days.length > 0) {
            if (fields.interval !== 1) { sentence.push("on the") }

            sentence.push(toSentence(days));
            sentence.push("of the month");
          }
        }
        break;

      case "yearly":
        const yearString = fields.interval === 1 ? "year" : (fields.interval.toString() + " years")
        sentence.push(yearString)
        break;
    }
    if(fields.startTime) {
      sentence.push("at");
      sentence.push(DateTime.fromJSDate(fields.startTime).toFormat("h:mm a"));
    }

    sentence.push("until");
    
    let untilString = ""
    if(Array.isArray(fields.until)) {
      const dates: string[] = fields.until.map((date) => {
        return DateTime.fromJSDate(date).toFormat('DDDD')
      })
      untilString = toSentence(dates)
    } else {
      untilString = DateTime.fromJSDate(fields.until).toFormat('DDDD')
    }
    sentence.push(untilString);
    return sentence.join(' ');
  }

  return (
    <div className="summary">{summary(fields)}</div>
  );
}

export default RuleSummary