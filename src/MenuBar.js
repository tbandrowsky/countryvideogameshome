import './App.css';

import Caption from './Caption';
import { Link } from "react-router-dom";

function MenuBar() {
    return (
        <div class="countryvideogamesnavigation" >
            <Caption />
            <h2 className="countrylabel">Products</h2>
            <div className="countrylinks2">
                <Link to="/Corona">CORONA</Link>
                <Link to="/ColorParty">COLOR PARTY</Link>
                <Link to="/Corona/Login">REVOLUTION</Link>
            </div>
            <h2 className="countrylabel">Company</h2>
            <div className="countrylinks3">
                <Link to="/News">NEWS</Link>
                <Link to="/About">ABOUT</Link>
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
