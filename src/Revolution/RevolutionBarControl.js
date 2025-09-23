import '../App.css'
import '../index.css'
import './RevolutionBarControl.css';
import GoogleAd from '../GoogleAd.js';

export default function RevolutionBarControl(props) {
    return (
        <div className="coronabar" >
            <div className="countrytitle1right">REVOLUTION</div>
            <div className="countrytitle2right">
                <span>{props.formName} </span>
                <span style={{ float: "right" }}>{props.formNumber}</span>
            </div>
            <GoogleAd
                style={{ width:"100%" }}
                adClient="ca-pub-3940256099942544"
                adSlot="6300978111"
                adFormat="auto"
                fullWidthResponsive="true"/>
        </div>
    );
}
