
import '../App.css'
import '../index.css'
import CoronaBarControl from './CoronaBarControl.js';
//import { useNavigate } from "react-router";
import { coronaGetClasses } from './Service.js';
import { useState } from "react";
import ErrorControl from './ErrorControl.js';

export default function HomeForm(props) {
    const [error, setError] = useState({ success: false, message: "", inProgress: false, errors:[] });


    return (
        <div class="contentbackgroundform">
            <CoronaBarControl applicationName={props.applicationName} formName="HOME" formNumber="FORM 005" />
            <ErrorControl {...error} />
            <div className="buttonBar">
                <button id="searchButton" onClick={
                    async () => {
                        setError({ success: true, message: "Searching", inProgress:true });
                        let response = await coronaGetClasses({}, {
                            successForm: '/Corona/ClassSearchForm',
                            redoForm: '/Corona/ClassSearchForm',
                            redoMessage: 'Search failed.'
                        });
                        setError({ success: response.success, message: response.message, inProgress: false });
                    }
                }>CLASSES</button>                
            </div>
        </div>
    );
}
