import '../App.css'
import '../index.css'
import './CoronaBar.css';

export default function CoronaBar(props) {
    return (
        <div className="coronabar">
            <div className="countrytitle1right">REVOLUTION</div>
            <div className="countrytitle2right">{props.formName}</div>
        </div>
    );
}
