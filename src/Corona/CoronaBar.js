
import './CoronaBar.css';
import './Caption.css';

export default function CoronaBar(props) {
    return (
        <div class="CoronaBar">
            <div class="countrytitle1">{props.applicationName}</div>
            <div class="countrytitle1">{props.formName}</div>
        </div>
    );
}
