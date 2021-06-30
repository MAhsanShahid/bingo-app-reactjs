import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Grid from "./components/Grid/Grid";

function App() {
    return (
        <header className="App-header">
            <div className="App">
                <h3>Vocabulary Raising, Bingo 🤠</h3>
                <Grid shape={5}/>
            </div>
        </header>
    );
}

export default App;
