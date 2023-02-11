import React, { useState} from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)

import "react-datepicker/dist/react-datepicker.css";
import State from "../../Store/State";
import formatedDate from "../../common/formatedDate";

const Calendar = () => {
	const [startDate, setStartDate] = useState(State.getCurrentDate());

	const changeHandler = async (date) => {		
		(date) => setStartDate(date)
		State.setSpinner(true)
		State.setSelectedDate(formatedDate(date))
		await State.fetchTodos(formatedDate(State.getSelectedDate() ))
		State.setSpinner(false)
	}

	return (
	  <DatePicker inline dateFormat="dd.MM.yyyy" locale='ru' selected={startDate} onChange={ (date) => changeHandler(date) } />
	);
  };

  export default Calendar