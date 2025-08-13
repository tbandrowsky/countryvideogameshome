import '../App.css'
import '../index.css'
import './CoronaBarControl.css';

export default function CoronaBarControl(props) {
    return (
        <div className="coronabar" style={{ display: "grid", gridColumnTemplate: "90% 10%" }}>
            <div className="countrytitle2right">
                {props.formName} <span style={{ float: "right" }} ></span>{props.formNumber}
            </div>
            <div className="countrytitle1right">REVOLUTION</div>
        </div>
    );
}
