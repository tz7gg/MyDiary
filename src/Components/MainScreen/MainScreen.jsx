import React from "react";
import info from "../../Store/info"
import Title from "../Typography/Title/Title";
import style from "./style.module.css"
import { observer } from "mobx-react-lite";



const MainScreen = observer(() => {	
	return (
		<div className={`${style.container} container`}>
			 <Title align='center' type='h1' text={info.getTitle()}></Title>				 		 
		</div>
	)
})

export default MainScreen