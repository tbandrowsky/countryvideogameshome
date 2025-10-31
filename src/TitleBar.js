import './App.css';
import './index.css';

function TitleBar(props) {
    const { title } = props;
    return (
        <div className="titlearea" style={{...props.style}}>{ title }</div>
    );
}

export default TitleBar;
