import './App.css';
import backimage from './images/starbackground.png'

const Background = ({children}) => {
    return(
        <div class="background-bottom">
            <div class="background-layer-container">
                <div class="background-layer1">
                    <img src={backimage} alt="spinning background, stars"/>
                </div>
            </div>
            <div class="background-layer3"></div>
            <div class="background-layer2"></div>
            <div class="background-children">{children}</div>
        </div>
    )
}

export default Background;
