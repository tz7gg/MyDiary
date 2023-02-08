import State from "../../Store/State"
import style from "./btn.module.css"

const AddTodoBtn = () => {

	const addHandler = () => {
		console.log('MODAL')
	}

	return (
		<div className={style.btn} onClick= {() => addHandler()}>
			{State.getAddToodBtnText()}
		</div>
	)
}

export default AddTodoBtn