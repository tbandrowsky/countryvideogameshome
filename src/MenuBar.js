import './App.css';

import Caption from './Caption';
import { Link } from "react-router-dom";

function MenuBar() {
    return (
        <div className="countryvideogamesnavigation" >
            <Caption />
            <div className="countrylinks2">
                <Link to="/DeveloperAbout">DEVELOPERS</Link>
                <Link to="/ColorParty">COLOR PARTY</Link>
                <Link to="/News">NEWS</Link>
                <Link to="/Privacy">PRIVACY</Link>
            </div>
            <div className="countrycontainer">
                <div className="countrytitlebox">
                    <div className="countrytitle2b">SELECT GRADE</div>
                    <div className="countrytitle2a">Proudly made</div>
                </div>
            </div>
        </div>
        );
}

export default MenuBar;
