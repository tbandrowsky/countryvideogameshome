import './App.css';

const Background = ({children}) => {
    return(
        <div class="background-bottom">
            <div class="background-layer1"> </div>
            <div class="background-children">{children}</div>
        </div>
    )
}

export default Background;
