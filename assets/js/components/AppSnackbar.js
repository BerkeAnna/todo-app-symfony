import { Snackbar, Button } from '@mui/material';
import { SnackbarContent } from '@mui/material';
import React, { Fragment, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

function checkLevel(level) {
    switch (level) {
        case 'success': return 'green';
        case 'error': return 'red';
        default: return 'white';
    }
}

function AppSnackbar() {
    const context = useContext(TodoContext);
    
    return (
        <Snackbar autoHideDuration={6000} open={Boolean(context.message.text && context.message.text.length)}>
            {context.message.text && (
                <SnackbarContent 
                style={{ backgroundColor: checkLevel(context.message.level), whiteSpace: 'pre-line' }} 
                message={
                    <span>
                        {Array.isArray(context.message.text)
                            ? context.message.text.map((msg, index) => <div key={index}>{msg}</div>)
                            : context.message.text}
                    </span>
                } 
                action={[
                    <Button 
                        onClick={() => { context.setMessage({}) }} 
                        key="dismiss"
                        color="inherit"
                    >
                        DISMISS
                    </Button>
                ]}
            />
            
            )}
        </Snackbar>
    );
}





export default AppSnackbar;