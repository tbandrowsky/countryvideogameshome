import './App.css';
import './index.css';

function TitleBar(props) {
    const { title } = props;
    console.log({ "Title" : title, "Props":props });
    return (
        <div className="titlearea">{ title }</div>
    );
}

export default TitleBar;
