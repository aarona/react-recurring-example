import React  from 'react'

interface YearlyRulePickerProps {
  interval: number
  onIntervalChange: (e: any) => void
}

const YearlyRulePicker: React.FC<YearlyRulePickerProps> = ({ interval, onIntervalChange }) => {
  return <div className="rule">
    Every <input className="interval" type="text" value={interval} onChange={onIntervalChange}></input> year(s)
  </div>
}

export default YearlyRulePicker