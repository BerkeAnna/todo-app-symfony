import React from 'react';
import ReactDOM from 'react-dom/client';

class App extends React.Component {
    render() {
        return (
            <div>
                hello
            </div>
        );
    }
}

// Hozz létre egy root elemet az új API-val
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
