import '../App.css'
import '../index.css'
import './CoronaBarControl.css';

export default function CoronaBarControl(props) {
    return (
        <div className="coronabar">
            <div className="countrytitle1right">REVOLUTION</div>
            <div className="countrytitle2right">{props.formName} <span style={{ float: "right" }} ></span>{props.formNumber}</div>
        </div>
    );
}
