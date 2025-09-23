import '../App.css'
import '../index.css'
import './RevolutionBarControl.css';

export default function RevolutionBarControl(props) {
    return (
        <div className="coronabar" >
            <div className="countrytitle1right">REVOLUTION</div>
            <div className="countrytitle2right">
                <span>{props.formName} </span>
                <span style={{ float: "right" }}>{props.formNumber}</span>
            </div>
        </div>
    );
}
