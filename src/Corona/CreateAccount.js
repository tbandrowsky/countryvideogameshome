import '../App.css'
import '../index.css'

export default function CreateAccount(props) {
    return (
        <div className="CoronaBar">
            <div className="countrytitle1">{props.applicationName}</div>
            <div className="countrytitle1">{props.formName}</div>
        </div>
    );
}