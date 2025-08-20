
import '../App.css'
import '../index.css'
import CoronaBarControl from './CoronaBarControl.js';

export default function HomeForm(props) {

    return (
        <div class="contentbackgroundform">
            <CoronaBarControl applicationName={props.applicationName} formName="HOME" formNumber="FORM 005" />
            <div className="buttonBar">
                buttons go here
            </div>
        </div>
    );
}
