import State from "../../Store/State"
import style from "./btn.module.css"

const AddTodoBtn = () => {
	return (
		<div className={style.btn} onClick= {() => State.setAddTodoModal(true)}>
			{State.getAddToodBtnText()}
		</div>
	)
}

export default AddTodoBtn