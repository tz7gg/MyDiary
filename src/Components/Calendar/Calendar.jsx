import React, { useState} from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)

import "react-datepicker/dist/react-datepicker.css";
import State from "../../Store/State";

const Calendar = () => {
	const [startDate, setStartDate] = useState(State.getCurrentDate());

	const changeHandler = (date) => {
		(date) => setStartDate(date)
		State.setSelectedDate(date)
	}

	return (
	  <DatePicker inline dateFormat="dd.MM.yyyy" locale='ru' selected={startDate} onChange={ (date) => changeHandler(date) } />
	);
  };

  export default Calendar