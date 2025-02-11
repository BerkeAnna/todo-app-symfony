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


function AppSnackbar(){
    const context = useContext(TodoContext);
    return (
        <Snackbar autoHideDuration={6000} open={Boolean(context.message.text && context.message.text.length)}>

            {context.message.text && (
            <SnackbarContent style={{backgroundColor: checkLevel(context.message.level)}} 
                             message={context.message.text}
                             action={[
                                        <Button 
                                            onClick={()=> {context.setMessage({})}} 
                                            key='dismiss'
                                            color='inherit'
                                        >
                                            dismiss
                                        </Button>
                                    ]}/>
            )}
        </Snackbar>
    );
}

export default AppSnackbar;