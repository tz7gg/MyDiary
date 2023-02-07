import React from "react";
import State from "../../Store/State"
import Title from "../Typography/Title/Title";
import style from "./style.module.css"
import { observer } from "mobx-react-lite";
import Calendar from "../Calendar";

const MainScreen = observer(() => {		
	return (
		<div className="container">
			<div className={`${style.container}`}>
				<Title align='center' type='h1' text={State.getTitle()}></Title>				 		 
			</div>
			<div className={style.calendar}>
				<Calendar/>
			</div>
			
		</div>
	)
})

export default MainScreen