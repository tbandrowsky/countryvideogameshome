import './App.css';

import Caption from './Caption';
import { Link } from "react-router-dom";

function MenuBar() {
    return (
        <div class="countryvideogamesnavigation" >
            <Caption />
            <div class="countrytitlespacer">Company</div>
            <div class="countrylinks3">
                <Link to="/News">NEWS</Link>
                <Link to="/About">ABOUT</Link>
                <Link to="/Privacy">PRIVACY</Link>
            </div>
            <div class="countrytitlespacer">Products</div>
            <div class="countrylinks2">
                <Link to="/Corona">CORONA</Link>
                <Link to="/ColorParty">COLOR PARTY</Link>
            </div>
            <div class="countrycontainer">
                <div class="countrytitlebox">
                    <div class="countrytitle2b">SELECT GRADE</div>
                    <div class="countrytitle2a">Proudly made</div>
                </div>
            </div>
        </div>
        );
}

export default MenuBar;
