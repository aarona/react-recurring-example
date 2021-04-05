import React  from 'react'

interface DailyRulePickerProps {
  interval: number
  onIntervalChange: (e: any) => void
}

const DailyRulePicker: React.FC<DailyRulePickerProps> = ({ interval, onIntervalChange }) => {
    return <div className="rule">
      Every <input className="interval" type="text" value={interval} onChange={onIntervalChange}></input> day(s)
    </div>
}

export default DailyRulePicker