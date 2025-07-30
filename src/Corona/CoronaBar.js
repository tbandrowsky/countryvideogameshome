import '../App.css'
import '../index.css'
import './CoronaBar.css';

export default function CoronaBar(props) {
    return (
        <div className="coronabar">
            <div className="countrytitle1">{props.applicationName}</div>
            <div className="countrytitle1">{props.formName}</div>
        </div>
    );
}
