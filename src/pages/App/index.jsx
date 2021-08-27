import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '../../assets/css/reset.css';
import Home from '../Home';

const App = () => {
    return (
        <Router >
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
};

export default App;