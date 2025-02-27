import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoTable from './components/TodoTable';
import AppSnackbar from './components/AppSnackbar';
import TodoContextProvider, { TodoContext } from './contexts/TodoContext';
import DefaultThemeProvider from './components/themes/DefaultThemeProvider';

class App extends React.Component {
    render() {
        return (
            <TodoContextProvider>
                <TodoTable/>
                <AppSnackbar></AppSnackbar>
            </TodoContextProvider>
        );
    }
}

// Hozz létre egy root elemet az új API-val
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DefaultThemeProvider><App /></DefaultThemeProvider>);
