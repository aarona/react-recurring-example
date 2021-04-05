import React from 'react'
import cn from 'classnames'
// import DailyRulePicker from './DailyRulePicker';

interface DayOfMonthPickerProps {
  validations: any
  onValidationsChange: (validations: any) => void
}

export const DayOfMonthPicker: React.FC<DayOfMonthPickerProps> = ({ validations, onValidationsChange }) => {
  const handleDayChange = (e:any) => {
    var days = validations;
    var day = parseInt(e.target.id);
    var index = days.indexOf(day);
    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(day);
    }
    onValidationsChange(days);
  }

  var activeDays = validations;
  return (
    <div style={{width: "300px"}}>
      <div className="row">
        <div className="col-xs">
        <div id="1" className={cn("btn", {active: activeDays.indexOf(1) > -1})} onClick={handleDayChange}>1</div>
        </div>
        <div className="col-xs">
        <div id="2" className={cn("btn", {active: activeDays.indexOf(2) > -1})} onClick={handleDayChange}>2</div>
        </div>
        <div className="col-xs">
        <div id="3" className={cn("btn", {active: activeDays.indexOf(3) > -1})} onClick={handleDayChange}>3</div>
        </div>
        <div className="col-xs">
        <div id="4" className={cn("btn", {active: activeDays.indexOf(4) > -1})} onClick={handleDayChange}>4</div>
        </div>
        <div className="col-xs">
        <div id="5" className={cn("btn", {active: activeDays.indexOf(5) > -1})} onClick={handleDayChange}>5</div>
        </div>
        <div className="col-xs">
        <div id="6" className={cn("btn", {active: activeDays.indexOf(6) > -1})} onClick={handleDayChange}>6</div>
        </div>
        <div className="col-xs">
        <div id="7" className={cn("btn", {active: activeDays.indexOf(7) > -1})} onClick={handleDayChange}>7</div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs">
        <div id="8" className={cn("btn", {active: activeDays.indexOf(8) > -1})} onClick={handleDayChange}>8</div>
        </div>
        <div className="col-xs">
        <div id="9" className={cn("btn", {active: activeDays.indexOf(9) > -1})} onClick={handleDayChange}>9</div>
        </div>
        <div className="col-xs">
        <div id="10" className={cn("btn", {active: activeDays.indexOf(10) > -1})} onClick={handleDayChange}>10</div>
        </div>
        <div className="col-xs">
        <div id="11" className={cn("btn", {active: activeDays.indexOf(11) > -1})} onClick={handleDayChange}>11</div>
        </div>
        <div className="col-xs">
        <div id="12" className={cn("btn", {active: activeDays.indexOf(12) > -1})} onClick={handleDayChange}>12</div>
        </div>
        <div className="col-xs">
        <div id="13" className={cn("btn", {active: activeDays.indexOf(13) > -1})} onClick={handleDayChange}>13</div>
        </div>
        <div className="col-xs">
        <div id="14" className={cn("btn", {active: activeDays.indexOf(14) > -1})} onClick={handleDayChange}>14</div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs">
        <div id="15" className={cn("btn", {active: activeDays.indexOf(15) > -1})} onClick={handleDayChange}>15</div>
        </div>
        <div className="col-xs">
        <div id="16" className={cn("btn", {active: activeDays.indexOf(16) > -1})} onClick={handleDayChange}>16</div>
        </div>
        <div className="col-xs">
        <div id="17" className={cn("btn", {active: activeDays.indexOf(17) > -1})} onClick={handleDayChange}>17</div>
        </div>
        <div className="col-xs">
        <div id="18" className={cn("btn", {active: activeDays.indexOf(18) > -1})} onClick={handleDayChange}>18</div>
        </div>
        <div className="col-xs">
        <div id="19" className={cn("btn", {active: activeDays.indexOf(19) > -1})} onClick={handleDayChange}>19</div>
        </div>
        <div className="col-xs">
        <div id="20" className={cn("btn", {active: activeDays.indexOf(20) > -1})} onClick={handleDayChange}>20</div>
        </div>
        <div className="col-xs">
        <div id="21" className={cn("btn", {active: activeDays.indexOf(21) > -1})} onClick={handleDayChange}>21</div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs">
        <div id="22" className={cn("btn", {active: activeDays.indexOf(22) > -1})} onClick={handleDayChange}>22</div>
        </div>
        <div className="col-xs">
        <div id="23" className={cn("btn", {active: activeDays.indexOf(23) > -1})} onClick={handleDayChange}>23</div>
        </div>
        <div className="col-xs">
        <div id="24" className={cn("btn", {active: activeDays.indexOf(24) > -1})} onClick={handleDayChange}>24</div>
        </div>
        <div className="col-xs">
        <div id="25" className={cn("btn", {active: activeDays.indexOf(25) > -1})} onClick={handleDayChange}>25</div>
        </div>
        <div className="col-xs">
        <div id="26" className={cn("btn", {active: activeDays.indexOf(26) > -1})} onClick={handleDayChange}>26</div>
        </div>
        <div className="col-xs">
        <div id="27" className={cn("btn", {active: activeDays.indexOf(27) > -1})} onClick={handleDayChange}>27</div>
        </div>
        <div className="col-xs">
        <div id="28" className={cn("btn", {active: activeDays.indexOf(28) > -1})} onClick={handleDayChange}>28</div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs">
        <div id="29" className={cn("btn", {active: activeDays.indexOf(29) > -1})} onClick={handleDayChange}>29</div>
        </div>
        <div className="col-xs">
        <div id="30" className={cn("btn", {active: activeDays.indexOf(30) > -1})} onClick={handleDayChange}>30</div>
        </div>
        <div className="col-xs">
        <div id="31" className={cn("btn", {active: activeDays.indexOf(31) > -1})} onClick={handleDayChange}>31</div>
        </div>
        <div className="col-xs">
        <div id="-1" className={cn("btn", {active: activeDays.indexOf(-1) > -1})} onClick={handleDayChange}>Last Day</div>
        </div>
        <div className="col-xs">
        <div></div>
        </div>
        <div className="col-xs">
        <div></div>
        </div>
        <div className="col-xs">
        <div></div>
        </div>
      </div>
    </div>
  )
}

export default DayOfMonthPicker