import State from "../../Store/State"
import style from "./btn.module.css"

const AddTodoBtn = () => {

	const addHandler = () => {
		State.setAddTodoModal(true)
	}

	return (
		<div className={style.btn} onClick= {() => addHandler()}>
			{State.getAddToodBtnText()}
		</div>
	)
}

export default AddTodoBtn