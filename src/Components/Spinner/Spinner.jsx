import style from "./style.module.css"

const Spinner = () => {
	return(
		<div className={style.spinner}>
			<div className={style.ldsSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
		</div>		
	)
}

export default Spinner