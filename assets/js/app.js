import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoTable from './components/TodoTable';
import TodoContextProvider, { TodoContext } from './contexts/TodoContext';

class App extends React.Component {
    render() {
        return (
            <TodoContextProvider>
                <TodoTable/>
            </TodoContextProvider>
        );
    }
}

// Hozz létre egy root elemet az új API-val
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
