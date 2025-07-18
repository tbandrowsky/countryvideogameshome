import './App.css';
import './index.css';

function TitleBar(props) {
    const { title } = props;
    return (
        <div className="titlearea">{ title }</div>
    );
}

export default TitleBar;
