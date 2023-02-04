import style from "./style.module.css"

const Title = (props) => {
	if(props.type === 'h1') {
		return  <h1 className={props.align && style[props.align]}>{props.text}</h1>
	}
}

export default Title