import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoTable from './components/TodoTable';
import AppSnackbar from './components/AppSnackbar';
import TodoContextProvider, { TodoContext } from './contexts/TodoContext';
import { CssBaseline } from '@mui/material';

class App extends React.Component {
    render() {
        return (
            <TodoContextProvider>
                <CssBaseline>
                    <TodoTable/>
                    <AppSnackbar></AppSnackbar>
                </CssBaseline>
            </TodoContextProvider>
        );
    }
}

// Hozz létre egy root elemet az új API-val
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
