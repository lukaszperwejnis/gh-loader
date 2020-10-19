import React from 'react';
import ReactDOM from 'react-dom';
import {Dashboard} from './pages/dashboard/Dashboard';

//TODO React.Fragment in future will be replaced by Router or other provider
const App = (): JSX.Element => (
    <React.Fragment>
        <Dashboard />
    </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'));
